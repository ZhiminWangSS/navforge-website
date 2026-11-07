#!/usr/bin/env bash
set -euo pipefail
repo_dir="$(cd "$(dirname "$0")/.." && pwd)"
# Install into the documented location so systemd paths stay predictable.
test "$repo_dir" = "$HOME/navforge-website" || { echo 'Clone to ~/navforge-website first'; exit 1; }
mkdir -p "$HOME/.config/systemd/user"
python3 "$repo_dir/scripts/sync_server.py"
cat > "$HOME/.config/systemd/user/navforge-website.service" <<'UNIT'
[Unit]
Description=NavForge static showcase
After=network.target
[Service]
ExecStart=/usr/bin/python3 %h/navforge-website/scripts/serve.py --directory %h/.local/share/navforge-website/current --bind 0.0.0.0 --port 8099
Restart=on-failure
RestartSec=5
NoNewPrivileges=true
UMask=0022
[Install]
WantedBy=default.target
UNIT
cat > "$HOME/.config/systemd/user/navforge-website-sync.service" <<'UNIT'
[Unit]
Description=Pull and publish the NavForge GitHub mirror
[Service]
Type=oneshot
EnvironmentFile=-%h/.config/navforge-website.env
ExecStart=/usr/bin/python3 %h/navforge-website/scripts/sync_server.py
NoNewPrivileges=true
UNIT
cat > "$HOME/.config/systemd/user/navforge-website-sync.timer" <<'UNIT'
[Unit]
Description=Refresh the NavForge mirror every five minutes
[Timer]
OnBootSec=2min
OnUnitActiveSec=5min
Persistent=true
[Install]
WantedBy=timers.target
UNIT
systemctl --user daemon-reload
systemctl --user enable --now navforge-website.service navforge-website-sync.timer
systemctl --user --no-pager status navforge-website.service navforge-website-sync.timer
