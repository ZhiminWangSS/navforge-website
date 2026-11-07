#!/usr/bin/env python3
"""Read only the explicitly listed JiangXing entry files. Emit public metadata."""
import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import sys


def collect(config):
    root = Path(config['root'])
    if not root.is_dir():
        raise SystemExit('Asset root unavailable; run this on JiangXing.')
    checks = []
    for group in config['checks']:
        entries = []
        for relative in group['paths']:
            path = root / relative
            try:
                stat = path.stat()
                entries.append({'entry': path.name, 'exists': path.is_file(),
                                'bytes': stat.st_size,
                                'modified': datetime.fromtimestamp(stat.st_mtime, timezone.utc).isoformat()})
            except FileNotFoundError:
                entries.append({'entry': path.name, 'exists': False})
        checks.append({'task': group['task'], 'entries': entries})
    return {'checkedAt': datetime.now(timezone.utc).isoformat(), 'server': 'JiangXing',
            'meaning': '仅确认场景入口文件存在；不代表依赖完整、任务运行成功或视频已更新。',
            'checks': checks}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', type=Path)
    args = parser.parse_args()
    config = json.loads(args.config.read_text()) if args.config else json.load(sys.stdin)
    print(json.dumps(collect(config), ensure_ascii=False, indent=2))
