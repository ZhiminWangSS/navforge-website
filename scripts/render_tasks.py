"""Present the task-design chapter; scene media live on a secondary page."""
from html import escape as e
import json
from collections import Counter
from render_scenes import DIMENSIONS


def render(root):
    data = json.loads((root / 'data/task-design.json').read_text())
    scenes = json.loads((root / 'data/scenes.json').read_text())['scenes']
    tasks = data['tasks']
    assert len(tasks) == len({t['id'] for t in tasks}) == 61
    assert Counter(t['dimension'] for t in tasks) == {'SG':12, 'SP':13, 'GE':12, 'LH':12, 'MP':4, 'SE':8}
    scene_by_key = {s['key']:s for s in scenes}
    for task in tasks:
        assert task['instruction'] and task['sourceUrl'].startswith(data['sourceUrl']+'#')
        assert task['role'] in {'current','historical','supplementary'}
        if task['role'] == 'current':
            scene = scene_by_key[task['sceneKey']]
            assert task['dimension'] == scene['dimension'] and task['split'] == scene['split']

    def task_row(task, first=False):
        badge = ('测试' if task['split']=='test' else '训练') if task['role']=='current' else {'historical':'历史补充','supplementary':'扩展 / 备选'}[task['role']]
        english = f'<details class="task-english"><summary>英文正式指令</summary><p lang="en">{e(task["formalEnglish"])}</p></details>' if task['formalEnglish'] and task['formalEnglish'] != task['instruction'] else ''
        note = f'<p class="task-version">{e(task["versionNote"])}</p>' if task['versionNote'] else ''
        embodiment = f'<span>本体：{e(task["embodiment"])}</span>' if task['embodiment'] else ''
        return f'''<details class="task-item" id="design-{task['id']}"{' open' if first else ''}><summary><span class="task-id">{task['id']}</span><strong>{e(task['title'])}</strong><span class="task-location">{e(task['sceneName'])}</span><span class="split {task['split'] or 'extra'}">{badge}</span></summary><div class="task-body"><span class="eyebrow">INSTRUCTION / 任务指令</span><p class="task-instruction">{e(task['instruction'])}</p>{english}{note}<div class="task-source">{embodiment}<a href="{e(task['sourceUrl'])}" target="_blank" rel="noopener">飞书任务与录像 ↗</a></div></div></details>'''

    buttons, panels = [], []
    for dim, name in DIMENSIONS.items():
        current = [t for t in tasks if t['dimension']==dim and t['role']=='current']
        extra = [t for t in tasks if t['dimension']==dim and t['role']!='current']
        active = dim == 'SG'
        buttons.append(f'<button id="task-tab-{dim}" role="tab" aria-controls="task-panel-{dim}" aria-selected="{str(active).lower()}" tabindex="{0 if active else -1}" data-task-dimension="{dim}"><span>{dim}</span><strong>{e(name)}</strong></button>')
        train = ' · '.join(s['name'] for s in scenes if s['dimension']==dim and s['split']=='train')
        test = next(s['name'] for s in scenes if s['dimension']==dim and s['split']=='test')
        missing = '<p class="task-version">当前餐厅与林缘障碍场尚无对应的任务正文；Bistro 与轮胎通道设计保留在下方历史补充中。</p>' if dim == 'MP' else ''
        extras = f'<details class="task-extras"><summary>历史补充与扩展 / 备选 · {len(extra)} 项</summary>{"".join(task_row(t) for t in extra)}</details>' if extra else ''
        panels.append(f'''<div class="task-panel" id="task-panel-{dim}" role="tabpanel" aria-labelledby="task-tab-{dim}"{' hidden' if not active else ''}><div class="task-panel-intro"><div><span class="eyebrow">{dim} / TASK DESIGN</span><h3>{e(name)}</h3><p>{e(data['definitions'][dim])}</p></div><div class="task-metrics"><span>评价指标</span><strong>{e(data['metrics'][dim])}</strong></div></div><p class="task-scenes"><span>训练</span> {e(train)} <span class="test-label">测试</span> {e(test)}</p>{missing}<div class="task-list">{"".join(task_row(t, i==0) for i,t in enumerate(current))}</div>{extras}</div>''')
    return f'<div class="task-tabs" role="tablist" aria-label="选择任务能力">{"".join(buttons)}</div>{"".join(panels)}'
