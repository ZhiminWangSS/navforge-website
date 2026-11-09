"""Render the versioned 3+1 scene register without reassigning historical scores."""
from collections import Counter
from html import escape as e
import hashlib
import json
from pathlib import Path


DIMENSIONS = {'SG': '语义 Grounding', 'SP': '空间认知', 'GE': '泛化',
              'LH': '长时程', 'MP': '运动精度', 'SE': '速度与效率'}


def validate(root: Path, data):
    scenes = data['scenes']
    assert len(scenes) == 24
    assert len({s['key'] for s in scenes}) == 24
    assert Counter(s['dimension'] for s in scenes) == Counter({d: 4 for d in DIMENSIONS})
    for dim in DIMENSIONS:
        assert Counter(s['split'] for s in scenes if s['dimension'] == dim) == {'train': 3, 'test': 1}
    for scene in scenes:
        assert scene['entryVerified'] and scene['serverUsd'] and len(scene['entrySha256']) == 64
        assert scene['documentUrl'].startswith(data['sourceUrl'] + '#')
        media = scene['media']
        assert media['fullDecode'] and abs(media['seconds'] - media['sourceSeconds']) < .15
        for field in ['video', 'poster']:
            path = (root / 'public' / media[field]).resolve()
            assert path.is_relative_to((root / 'public/assets/current').resolve()) and path.is_file(), path
        assert hashlib.sha256((root / 'public' / media['video']).read_bytes()).hexdigest() == media['sha256']
    for run in data['modelRuns']:
        if run['status'] == 'completed':
            assert run['model_evidence']['replies'] > 0 and run['SR'] in [0, 1]
        else:
            assert run['SR'] is None
        for path in run.get('media', {}).values():
            assert (root / 'public' / path).is_file(), path


def render(root: Path):
    data = json.loads((root / 'data/scenes.json').read_text())
    validate(root, data)
    groups, overview = [], []
    for dim, name in DIMENSIONS.items():
        scenes = [s for s in data['scenes'] if s['dimension'] == dim]
        train = ' · '.join(s['name'] for s in scenes if s['split'] == 'train')
        test = next(s['name'] for s in scenes if s['split'] == 'test')
        overview.append(f'<tr><th scope="row"><a href="#group-{dim}">{dim} · {e(name)}</a></th><td>{e(train)}</td><td><span class="split test">测试</span> {e(test)}</td></tr>')
        cards = []
        for s in scenes:
            m = s['media']
            minutes, seconds = divmod(round(m['seconds']), 60)
            evidence = ''.join(f'<li><code>{e(ev["path"])}</code><small>SHA256 {e(ev["sha256"])}</small></li>' for ev in s['evidence'])
            cards.append(f'''<article class="scene-card" id="{e(s['key'])}" data-split="{s['split']}">
<div class="scene-video"><video controls playsinline preload="none" poster="{e(m['poster'])}" aria-label="{dim} {e(s['name'])}专家相机漫游"><source src="{e(m['video'])}" type="video/mp4"></video><span class="scene-runtime">{minutes:02}:{seconds:02} · 相机回放</span></div>
<div class="scene-copy"><div class="scene-meta"><span class="mono">{dim} / {e(s['source'])}</span><span class="split {s['split']}">{'训练' if s['split']=='train' else '测试'}</span></div>
<h3>{e(s['name'])}</h3><p class="scene-asset">{e(s['assetId'])}</p><p>{e(s['summary'])}</p>
<div class="evidence-status"><span>漫游</span><strong>完整文件已核验</strong></div><div class="evidence-status"><span>物理执行</span><strong>{e(s['physicalStatus'])}</strong></div>
<p class="scene-limit">{e(s['boundary'])}</p>
<a class="text-link" href="{e(s['documentUrl'])}" target="_blank" rel="noopener">飞书场景与原片 ↗</a>
<details class="scene-evidence"><summary>版本与服务器依据</summary><p>飞书场景 ID：{e(s['assetId'])}</p><p>当前 USD：<code>{e(s['serverUsd'])}</code></p><small>入口 SHA256 {e(s['entrySha256'])}</small><p>漫游原片：<code>{e(m['source'])}</code></p><small>原片 SHA256 {e(m['sourceSha256'])}</small><ul>{evidence}</ul></details></div></article>''')
        groups.append(f'''<section class="scene-group" id="group-{dim}" data-dimension="{dim}"><div class="group-heading"><div><span class="eyebrow">{dim} / 03 TRAIN + 01 TEST</span><h2>{e(name)}</h2></div><p>{e(data['dimensionNotes'][dim])}</p></div><div class="scene-grid">{''.join(cards)}</div></section>''')
    filters = '<button class="active" data-dimension-filter="ALL" aria-pressed="true">全部 <small>24</small></button>' + ''.join(f'<button data-dimension-filter="{d}" aria-pressed="false">{d} <small>4</small></button>' for d in DIMENSIONS)
    rows = []
    for r in data['modelRuns']:
        done = r['status'] == 'completed'
        state = ('未成功' if r['SR'] == 0 else '成功') if done else {'waiting_for_gpu': '等待空闲 GPU', 'not_started': '未开始'}.get(r['status'], r['status'])
        progress = f'{r["checkpoints_completed"]}/{r["checkpoints_total"]}' if done else '—'
        timing = f'{r["elapsed_s"]:.2f} s / {r["sim_time_s"]:.2f} s' if done else '—'
        reasons = {'time_budget_exhausted': '时间预算耗尽', 'crowd_disk_overlap': '与行人区域重叠'}
        rows.append(f'<tr><th scope="row">{e(r["task_id"])} · {e(r["sceneLabel"])}</th><td>{state}</td><td>{progress}</td><td>{timing}</td><td>{e(reasons.get(r["reason"], "尚无模型成绩"))}</td></tr>')
    films = []
    for r in data['modelRuns']:
        if not r.get('media'):
            continue
        views = ''.join(f'<div><p>{label}</p><video controls playsinline preload="none" aria-label="{r["task_id"]} {label}"><source src="{e(r["media"][key])}" type="video/mp4"></video></div>' for key, label in [('first', '第一人称'), ('third', '第三人称')])
        films.append(f'<details class="model-film"><summary>{r["task_id"]} · {e(r["sceneLabel"])} · 查看双视角录像</summary><p>录像按仿真采样保存，不重复模型等待帧；墙钟时长与录像时长分别报告。</p><div class="model-views">{views}</div></details>')
    return {
        'overview': f'<table class="split-table"><thead><tr><th scope="col">能力</th><th scope="col">训练 · 3 场景</th><th scope="col">测试 · 1 场景</th></tr></thead><tbody>{"".join(overview)}</tbody></table>',
        'scenes': f'<div class="scene-filters" role="group" aria-label="按能力筛选场景">{filters}</div><p id="scene-filter-count" aria-live="polite">显示 24 个场景 · 18 训练 / 6 测试</p>{"".join(groups)}',
        'models': f'<div class="table-scroll"><table class="split-table"><thead><tr><th scope="col">运行时任务 / 场景</th><th scope="col">状态</th><th scope="col">检查点</th><th scope="col">计时 / 仿真时长</th><th scope="col">原因</th></tr></thead><tbody>{"".join(rows)}</tbody></table></div>{"".join(films)}',
        'revision': str(data['sourceRevision']),
        'checked': e(data['checkedAt']),
    }
