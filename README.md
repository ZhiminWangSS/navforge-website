# NavForge website

公开站点：https://zhiminwangss.github.io/navforge-website/

GitHub 发布仓库：https://github.com/ZhiminWangSS/navforge-website

统一开发源码：`/home/ubuntu/navforge-workspace/web/site`。`/home/ubuntu/navforge-website` 继续是部署镜像，原资产、模拟器和实验数据保持外置。

## 当前页面（2026-11-09）

首页按飞书修订 5063 的六维 **3 个训练 + 1 个测试** 配置展示 24 个场景，包含 24 段完整原速相机漫游、服务器入口与媒体哈希、物理验证范围及飞书来源。每维可筛选。

- `data/scenes.json`：当前24场景与模型记录快照；后续更新以此为主。
- `public/index.html`、`public/scenes.js`、`public/scenes.css`：新版首页。
- `scripts/render_scenes.py`：构建时检查划分、媒体哈希、路径和结果身份。
- `public/archive.html`：旧任务、26个案例和历史参考实跑的完整归档入口。
- `public/evaluation/index.html`：9项旧版探索复测，成绩及数据集保持不变。
- `public/evaluation/native-20261109/`：MP/SE 原生协议的独立发布快照、双视角和逐步像素动作。

详细版本对应和证据见 [场景核对记录](docs/scene-register-2026-11-09.md)。旧 `research.json`、`assets.json`、`server-state.json` 现在供历史归档使用；原数据另存 `data/archive/`。

构建、推送至 `main` 后按既有 GitHub Actions 发布 Pages；JiangXing 定时拉取同一仓库并原子切换版本。

```sh
python3 scripts/test_serve.py
python3 scripts/build.py
python3 scripts/serve.py --directory "$PWD/_site" --port 8099
```

保留原有前端访问密码入口。展示媒体跟随网站发布仓库；整个 workspace 的 Git 仍排除大资产、录像与存储链接，不向其自动添加发布远端。

## 既有部署与归档说明

以下说明保留既有部署操作；其中11月6日至7日的任务表、样例统计和研究结论属于历史归档。

## 数据与版本

| 内容 | 编辑位置 | 当前版本 |
| --- | --- | --- |
| 六维最新结论与精选实跑 | `data/research.json`、`public/assets/recent/` | 2026-11-07 服务器核对摘要 |
| 结论依据与媒体校验 | `data/research-evidence.json`、`data/research-media.json` | 精简记录，完整实验仍在服务器 |
| 案例视频与详情 | `public/catalog.json`、`public/assets/` | 2026-10-30 快照，26 项 |
| 当前任务资产来源 | `data/assets.json` | 2026-11-06 核对，飞书修订 4017，36 项任务/18 组 |
| 历史发布记录 | `data/updates.json` | 建站时的记录，首页结论改由 `data/research.json` 维护 |
| 服务器资产入口快照 | `data/server-state.json` | 以 `checkedAt` 为准 |
| 服务器检查白名单 | `config/jiangxing-assets.json` | 只检查列出的入口文件 |

最新结论见页面顶部及 [研究摘要](docs/research-2026-11-07.md)。原 36 项任务资产表作为 11 月 6 日快照折叠保留，只有「任务 / 资产来源 / 是否在 bravvo 调研范围内」三列。范围按飞书场景资产的来源系列判断，不表示特定场景已经入选某轮训练/测试。

新版任务与旧视频存在编号复用，尤其 SG、LH 和 GE。更新视频时须同时核对任务标题、指令、资产和版本；不要仅凭编号自动覆盖。服务器入口存在也不等于模型任务成功或全部贴图依赖完整。

## 修改并发布

直接在 GitHub 编辑上述 JSON 并提交至 `main`，或在本地修改后：

```sh
python3 scripts/build.py
git add data public
git commit -m "Update project progress and asset information"
git push origin main
```

推送后 GitHub Actions 自动校验、构建、发布 Pages。JiangXing 每 5 分钟拉取同一 `main` 并原子切换静态目录；拉取或构建失败保留上一版。其同步只从 GitHub 拉取，不自动提交服务器实验文件。

本地预览：

```sh
python3 scripts/build.py
python3 scripts/serve.py --directory "$PWD/_site" --port 8099
# http://127.0.0.1:8099/
python3 scripts/test_serve.py
```

构建会校验案例唯一 ID、媒体文件及资产表覆盖；Python 版本须 >= 3.10。

## 更新 JiangXing 资产信息

在可通过 `JiangXing-tunnel` SSH 连接服务器的电脑执行：

```sh
python3 scripts/refresh_jiangxing.py
git diff -- data/server-state.json
git add data/server-state.json
git commit -m "Refresh JiangXing asset snapshot"
git push origin main
```

脚本只读服务器上的白名单文件，记录入口存在性、大小和修改时间；不会上传 USD、原始模型、实验目录或凭据。最新结论需核查运行结果后编辑 `data/research.json` 并同步证据摘要，不会从文件时间猜测实验结论。

## JiangXing 部署

仓库：`/home/ubuntu/navforge-website`；服务端口：`8099`。内网可访问 `http://10.16.19.13:8099/`。外部通过已有 SSH 入口转发：

```sh
ssh -S none -o ClearAllForwardings=yes -o ExitOnForwardFailure=yes -N -L 8099:127.0.0.1:8099 JiangXing-tunnel
# 浏览器打开 http://127.0.0.1:8099/
```

首次部署：

```sh
git clone https://github.com/ZhiminWangSS/navforge-website.git ~/navforge-website
cd ~/navforge-website
bash scripts/install_server.sh
```

若服务器访问 GitHub 需要代理，在 `~/.config/navforge-website.env` 写 `NAVFORGE_GIT_PROXY=http://127.0.0.1:17894`，首次安装时也需导出该变量。代理配置不提交仓库。

```sh
systemctl --user start navforge-website-sync.service  # 立即同步
systemctl --user status navforge-website.service navforge-website-sync.timer
journalctl --user -u navforge-website-sync.service -n 30
systemctl --user disable --now navforge-website-sync.timer  # 停止自动拉取
```

构建目录在 `~/.local/share/navforge-website/releases/`，`current` 指向已验证版本，保留最多三版。`version.json` 可对照两端的 Git commit。服务器当前已启用 user lingering，因此用户服务可在退出 SSH 后继续运行并随开机启动。

## 素材

本站为研究展示；原场景、视频、字体和其他素材沿用各自许可与署名，来源见页面「素材与说明」及各案例。没有把第三方资产重新授予开源许可。仓库仅包含展示媒体，不包含完整场景资产。网站使用形式上的前端密码入口；不含服务端会话密钥或部署凭据。

## 交互式测评看板

主导航「测评」打开 `evaluation/index.html`，与主体网页一起发布到 GitHub Pages。公开访问无需 SSH；本地预览仍可使用。页面支持任务切换、三视角/第三人称切换和动作时间轴。

2026-11-09 从服务器原看板导入 9 项正式复测，原成绩、动作与视频时间映射不变。页面明确标注旧版简单档/完全档评分；未将待运行的 SE/MP 或新部分可见协议混入旧成绩。来源记录在 `data/evaluation-provenance.json`。`public/evaluation/media/` 为保持原时长的 H.264 展示副本，原始证据仍在服务器；时长核验见 `data/evaluation-media.json`。

更新看板时应同时同步内嵌 dataset 与相应媒体，保留原评分口径和运行身份；执行 `python3 scripts/build.py` 会校验全部本地录像路径。不要将 localhost/SSH 隧道地址写成公开页面的媒体地址。

## 发布体积（2026-11-09）

当前完整静态站点约 541 MB（516 MiB），其中测评看板及 18 个录像展示文件约 232 MB（221 MiB）；最大单文件约 84 MB（80 MiB）。代码、JSON 和展示媒体进入仓库，`_site/` 仅作为 Actions 构建产物，不重复提交。Git 历史单独占用存储，后续替换大视频会继续增长。

本次同步仅发布网页已有内容；仿真器、资产数据集、完整实验日志和原始录像继续保留在 JiangXing。看板是已整理的历史结果，SE/MP 待完成任务不记作正式成绩。

## 前端访问密码

首页和测评页使用同一套 `public/access.js` 密码入口；输入正确密码后，当前标签页保留 12 小时登录状态，导航栏可退出。静态路径适配 GitHub Pages 子目录、本地预览与 JiangXing 镜像。

这是按需求设置的形式验证，不是安全访问控制：验证逻辑在浏览器运行，公开仓库、页面源码和媒体直链仍可访问。密码仅做编码，不视为加密；不要依靠这个入口保护敏感内容。变更密码应同时更新会话键版本使旧登录失效。
