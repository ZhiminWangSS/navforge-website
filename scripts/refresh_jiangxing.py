#!/usr/bin/env python3
"""Refresh the checked-in asset snapshot via read-only SSH, then validate."""
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
code = (ROOT / 'scripts/collect_state.py').read_text()
config = json.loads((ROOT / 'config/jiangxing-assets.json').read_text())
# The script and input go through stdin, not shell-interpolated paths or secrets.
payload = code.replace("if __name__ == '__main__':", "if False:")
payload += '\nprint(json.dumps(collect(' + repr(config) + '), ensure_ascii=False, indent=2))\n'
result = subprocess.run(['ssh', '-S', 'none', '-o', 'ClearAllForwardings=yes', '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=15', 'JiangXing-tunnel', 'python3 -'], input=payload, text=True, capture_output=True, check=True, timeout=90)
state = json.loads(result.stdout)
assert len(state['checks']) == len(config['checks'])
target = ROOT / 'data/server-state.json'
temporary = target.with_suffix('.tmp')
temporary.write_text(json.dumps(state, ensure_ascii=False, indent=2) + '\n')
temporary.replace(target)
subprocess.run([sys.executable, str(ROOT / 'scripts/build.py')], check=True)
print('Snapshot refreshed. Review git diff, commit and push to publish it.')
