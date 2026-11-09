#!/usr/bin/env python3
"""Dependency-free static build shared by Pages and JiangXing."""
import argparse
from datetime import datetime, timedelta, timezone
from html import escape
import json
from pathlib import Path
import re
import shutil
import subprocess
from render_research import render as render_research

ROOT = Path(__file__).resolve().parents[1]


def read(name):
    return json.loads((ROOT / name).read_text())


def build(destination):
    catalog = read('public/catalog.json')
    assets = read('data/assets.json')
    state = read('data/server-state.json')
    seen = set()
    for case in catalog['cases']:
        assert re.fullmatch(r'(SG|SP|LH|GE|MP|SE)\d{2}', case['id']) and case['id'] not in seen
        seen.add(case['id'])
        for value in [case['video'], case['poster']] + [im['src'] for im in case['images']]:
            path = ROOT / 'public' / value
            assert path.resolve().is_relative_to((ROOT / 'public').resolve()) and path.is_file(), value
    assert len(assets['rows']) == len(state['checks'])
    assert {r['task'] for r in assets['rows']} == {r['task'] for r in state['checks']}
    assert all(set(r) == {'task', 'source', 'in_bravvo_scope'} for r in assets['rows'])
    task_ids = set()
    for row in assets['rows']:
        label = row['task'].split('｜')[0]
        ids = set(re.findall(r'(?:SG|SP|LH|GE|MP|SE)\d{2}', label))
        for prefix, first, last in re.findall(r'(SG|SP|LH|GE|MP|SE)(\d{2})–(?:SG|SP|LH|GE|MP|SE)(\d{2})', label):
            ids.update(f'{prefix}{n:02}' for n in range(int(first), int(last) + 1))
        assert ids and not (task_ids & ids), label
        task_ids.update(ids)
    assert len(task_ids) == assets['taskCount'], 'Task count does not match table coverage'
    entries = [e for group in state['checks'] for e in group['entries']]
    present = sum(e['exists'] for e in entries)
    checked = datetime.fromisoformat(state['checkedAt']).astimezone(timezone(timedelta(hours=8))).strftime('%Y-%m-%d %H:%M (UTC+8)')
    rows = ''.join('<tr>' + ''.join(f'<td>{escape(r[k])}</td>' for k in ['task', 'source', 'in_bravvo_scope']) + '</tr>' for r in assets['rows'])
    status = f'''<section class="project-status section-shell" id="asset-history" aria-labelledby="updates-title">
<div class="section-index"><span>ASSET PROVENANCE ARCHIVE</span><span>VERSIONED SOURCE MAPPING</span></div>
<div class="section-heading"><h2 id="updates-title">资产来源，<br><span>留档可追溯。</span></h2><p>{escape(assets['reviewed'])} 任务快照：{assets['taskCount']} 项 · {len(assets['rows'])} 组<br>飞书修订 {assets['sourceRevision']}；后续变更见上方最新进展。</p></div>
<div class="server-note"><span class="eyebrow">JIANGXING SNAPSHOT</span><p>{present} / {len(entries)} 个场景入口文件存在 · 检查时间 <time>{checked}</time><br>{escape(state['meaning'])}</p></div>
<details class="asset-details"><summary>展开 {escape(assets['reviewed'])} 任务来源表 <span>{assets['taskCount']} TASKS ↗</span></summary><p class="scope-note">此表保留当日对应关系，后续新增和重号任务不自动套用。{escape(assets['scope'])}</p><div class="asset-scroll" tabindex="0" role="region" aria-label="任务资产来源表"><table><thead><tr><th scope="col">任务</th><th scope="col">资产来源</th><th scope="col">是否在 bravvo 调研范围内</th></tr></thead><tbody>{rows}</tbody></table></div></details>
<a class="text-link" href="https://github.com/ZhiminWangSS/navforge-website" target="_blank" rel="noopener">GitHub 仓库与更新记录 ↗</a>
</section>'''
    html = (ROOT / 'public/index.html').read_text()
    assert html.count('<!-- PROJECT_STATUS -->') == 1
    assert html.count('<!-- RESEARCH_DIGEST -->') == 1
    research_html = render_research(ROOT)
    assert '/__auth/' not in html + (ROOT / 'public/app.js').read_text()
    # Validate locally referenced entry resources before copying the output.
    for ref in re.findall(r'(?:src|href)="([^"#]+)"', html):
        if not ref.startswith(('https:', 'http:')):
            assert (ROOT / 'public' / ref).is_file(), ref
    # Evaluation is self-contained on both Pages and the server.
    evaluation = (ROOT / 'public/evaluation/index.html').read_text()
    dataset = json.loads(re.search(r'<script type="application/json" id="dataset">(.*?)</script>', evaluation, re.S)[1])
    for run in dataset['runs']:
        for task in run['tasks']:
            for ref in task['videos'].values():
                media = ROOT / 'public/evaluation' / ref
                assert media.resolve().is_relative_to((ROOT / 'public/evaluation/media').resolve()), ref
                assert media.is_file() and 0 < media.stat().st_size < 100_000_000, ref
    destination.mkdir(parents=True, exist_ok=True)
    shutil.copytree(ROOT / 'public', destination, dirs_exist_ok=True)
    (destination / 'index.html').write_text(html.replace('<!-- PROJECT_STATUS -->', status).replace('<!-- RESEARCH_DIGEST -->', research_html))
    (destination / 'data.js').write_text('window.NAVFORGE = ' + json.dumps(catalog, ensure_ascii=False) + ';\n')
    shutil.copytree(ROOT / 'data', destination / 'data', dirs_exist_ok=True)
    (destination / '.nojekyll').touch()
    revision = subprocess.run(['git', '-C', str(ROOT), 'rev-parse', 'HEAD'], capture_output=True, text=True)
    (destination / 'version.json').write_text(json.dumps({'commit': revision.stdout.strip() or 'local-preview', 'catalogUpdated': catalog['updated'], 'assetsReviewed': assets['reviewed'], 'researchReviewed': read('data/research.json')['asOf']}) + '\n')
    print(f'Built {len(catalog["cases"])} videos, {assets["taskCount"]} tasks; {present}/{len(entries)} server entries. Output: {destination}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, default=ROOT / '_site')
    args = parser.parse_args()
    build(args.output.resolve())
