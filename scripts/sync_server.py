#!/usr/bin/env python3
"""Fast-forward the mirror and atomically publish a validated static build."""
import fcntl
import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
STATE = Path.home() / '.local/share/navforge-website'
STATE.mkdir(parents=True, exist_ok=True)


def run(args, **kwargs):
    return subprocess.run(args, cwd=ROOT, check=True, timeout=180, **kwargs)


with (STATE / 'sync.lock').open('w') as lock:
    fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    git = ['git']
    proxy = os.environ.get('NAVFORGE_GIT_PROXY')
    if proxy:
        git += ['-c', f'http.proxy={proxy}']
    run(git + ['pull', '--ff-only', 'origin', 'main'])
    revision = run(['git', 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    release = STATE / 'releases' / revision
    current = STATE / 'current'
    if current.exists() and current.resolve() == release:
        print(f'Already serving {revision}')
        sys.exit(0)
    staging = STATE / 'releases' / f'{revision}.building'
    if staging.exists():
        shutil.rmtree(staging)
    run([sys.executable, 'scripts/build.py', '--output', str(staging)])
    if release.exists():
        shutil.rmtree(release)
    staging.rename(release)
    temporary = STATE / 'current.next'
    temporary.unlink(missing_ok=True)
    temporary.symlink_to(release, target_is_directory=True)
    temporary.replace(current)
    # Keep the active release and two previous builds for recovery.
    old = sorted((p for p in release.parent.iterdir() if p != release), key=lambda p: p.stat().st_mtime, reverse=True)
    for path in old[2:]:
        shutil.rmtree(path)
    print(f'Published {revision}')
