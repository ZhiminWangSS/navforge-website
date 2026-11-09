# NavForge website

公开展示站：https://zhiminwangss.github.io/navforge-website/

GitHub 仓库：https://github.com/ZhiminWangSS/navforge-website

从原 NavForge 网站迁出为独立静态站点，保留 26 个完整视频、封面、场景/轨迹图及交互。无需 Node、数据库或登录服务。GitHub Pages 与 JiangXing 使用相同构建脚本。原 Sites 站点和源码不受影响。

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

本站为研究展示；原场景、视频、字体和其他素材沿用各自许可与署名，来源见页面「素材与说明」及各案例。没有把第三方资产重新授予开源许可。仓库仅包含展示媒体，不包含完整场景资产。网站为公开访问，不含原站密码、会话密钥或部署凭据。

## 交互式测评看板

主导航「测评」打开 `evaluation/index.html`，GitHub Pages 与 JiangXing 均提供同一份页面，无需 SSH 转发。页面支持任务切换、三视角/第三人称切换和动作时间轴。

2026-11-09 从服务器原看板导入 9 项正式复测，原成绩、动作与视频时间映射不变。页面明确标注旧版简单档/完全档评分；未将待运行的 SE/MP 或新部分可见协议混入旧成绩。来源记录在 `data/evaluation-provenance.json`。`public/evaluation/media/` 为保持原时长的 H.264 展示副本，原始证据仍在服务器；时长核验见 `data/evaluation-media.json`。

更新看板时应同时同步内嵌 dataset 与相应媒体，保留原评分口径和运行身份；执行 `python3 scripts/build.py` 会校验全部本地录像路径。不要将 localhost/SSH 隧道地址写成公开页面的媒体地址。
