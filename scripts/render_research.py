"""Render the curated research digest; raw experiment logs stay on JiangXing."""
from html import escape as e
from pathlib import Path
import json
import hashlib


def render(root: Path):
    data = json.loads((root / 'data/research.json').read_text())
    assert len(data['dimensions']) == 6
    assert {d['id'] for d in data['dimensions']} == {'SG', 'SP', 'LH', 'GE', 'MP', 'SE'}
    cards = []
    for item in data['dimensions']:
        assert item['state'] in {'verified', 'partial', 'assets'}
        cards.append(f'''<article class="research-card {e(item['state'])}">
<div class="research-card-top"><span class="mono">{e(item['id'])} / {e(item['name'])}</span><span class="research-badge">{e(item['metric'])}</span></div>
<h3>{e(item['title'])}</h3><p>{e(item['conclusion'])}</p><p class="research-limit">{e(item['limit'])}</p></article>''')
    films = []
    media = {m['file']: m for m in json.loads((root / 'data/research-media.json').read_text())}
    for item in data['showcase']:
        for key in ['video', 'poster']:
            path = (root / 'public' / item[key]).resolve()
            assert path.is_relative_to((root / 'public/assets').resolve()) and path.is_file(), item[key]
        record = media[item['video']]
        assert record['fullDecode'] and record['frames'] > 0
        assert hashlib.sha256((root / 'public' / item['video']).read_bytes()).hexdigest() == record['sha256']
        films.append(f'''<article class="research-film"><video controls playsinline preload="none" poster="{e(item['poster'])}" aria-label="{e(item['title'])}"><source src="{e(item['video'])}" type="video/mp4"></video><div class="research-film-copy"><span class="eyebrow">{e(item['label'])} · {e(item['duration'])}</span><h3>{e(item['title'])}</h3><p>{e(item['caption'])}</p><p class="research-limit">{e(item['scope'])}</p></div></article>''')
    images = []
    for item in data['assetPreviews']:
        assert (root / 'public' / item['image']).is_file()
        images.append(f'''<figure><a href="{e(item['image'])}" target="_blank" rel="noopener"><img src="{e(item['image'])}" alt="{e(item['title'])}" loading="lazy"></a><figcaption><strong>{e(item['title'])}</strong><span>{e(item['caption'])}</span></figcaption></figure>''')
    return f'''<section class="research section-shell" id="updates" aria-labelledby="research-title">
<div class="section-index"><span>LATEST RESEARCH / {e(data['date'])}</span><span>JIANGXING · VERIFIED SNAPSHOT</span></div>
<div class="section-heading"><h2 id="research-title">最近进展。<br><span>关键结论。</span></h2><p>{e(data['intro'])}<br><span class="research-asof">核对截至 {e(data['asOf'])}</span></p></div>
<div class="research-grid">{''.join(cards)}</div>
<p class="research-scope">{e(data['scope'])}</p>
<div class="research-showcase-heading"><h3>三段代表性实跑</h3><p>完整时长 · 原速展示 · 原始三视角与验收记录保留在服务器</p></div>
<div class="research-films">{''.join(films)}</div>
<details class="research-detail"><summary>资产更新预览与核对依据 <span>↗</span></summary><div class="research-previews">{''.join(images)}</div><p>结论按最新运行文件核对。历史交接文档与新结果冲突时，以注明版本的验收记录为准。</p><a class="text-link" href="https://github.com/ZhiminWangSS/navforge-website/blob/main/docs/research-2026-11-07.md" target="_blank" rel="noopener">查看精简核对记录 ↗</a></details>
</section>'''
