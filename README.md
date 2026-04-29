# LaST₀* — Project Page

[LaST₀*: Shaping Action through Physical Latent Reasoning via Reinforcement Learning](#) 的项目主页，纯静态 HTML/CSS/JS，可直接部署到 GitHub Pages。

## 页面布局（按从上到下的顺序）

精简版：实验展示 + 摘要，论文方法 / 消融 / 附录分析等都不放——读者看完核心结果想了解细节直接看论文。

1. **Teaser** — 论文 `teaset.pdf` 直接铺在首屏顶部
2. **Title + Authors + Buttons** — 标题、作者、机构、Paper / arXiv (官方 logomark) / Code / Video / BibTeX 按钮
3. **Headline Results (Simulation)** — 4 个核心数字 callout + 完整 LIBERO 对比表 (`tab:libero_comparison`) + 学习曲线 (`main_results.pdf`) + 三联 callout（Faster Convergence / Higher Final Accuracy / Stronger OOD Transfer）
4. **Real-World Experiments** — 论文真机蒙太奇 (`real.pdf`) + 双子表成功率表 (`tab:real`，hexagon|zipper / USB|marker cap) + 4 个任务视频区块（每块 1 normal + 3 generalization 槽位）
5. **Abstract**
6. **BibTeX** — 引用 + 一键复制
7. **Footer**

## 目录结构

```
.
├── index.html
├── .nojekyll              # 让 GitHub Pages 跳过 Jekyll
├── static/
│   ├── css/style.css
│   ├── js/main.js              # 仅 BibTeX 一键复制
│   ├── videos/                 # 真机视频（自行上传，文件名见下方表）
│   └── images/                 # 由 ref/.../figs/*.pdf 转换得到
│       ├── teaset.png
│       ├── main_results.png
│       ├── ablation_latent.png
│       ├── ablation_gen.png
│       └── video_placeholder.svg  # 视频未上传时的占位图
├── ref/                   # 原始 NeurIPS 2026 LaTeX 源（不会被 push 到主页）
└── README.md
```

## 本地预览

```bash
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 部署到 GitHub Pages

### 方法 A：用户/组织 Page（`<username>.github.io`）
1. 仓库名设为 `<username>.github.io`
2. push 到 `main`
3. Settings → Pages → Source = `Deploy from a branch`，分支 `main`，目录 `/ (root)`

### 方法 B：项目 Page（`<username>.github.io/<repo>/`）
1. 仓库名随意
2. push 到 `main`
3. Settings → Pages → Source = `main` + `/ (root)`

### 方法 C：GitHub Actions
Settings → Pages → Source = `GitHub Actions`，新建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

> `.nojekyll` 已包含。`ref/` 目录建议加进 `.gitignore`，避免 LaTeX 源被 push 上去。

## 还需要你填的占位符

`index.html` 里目前用了占位的作者名字。NeurIPS 投稿是双盲的，正式上线前替换：

| 位置 | 替换什么 |
|------|---------|
| `<title>` | 已是真标题，可留 |
| `.authors` | 把 `Anonymous Author N` 换成真名 + 主页链接 |
| `.affiliations` | 把 `Institution One/Two` 换成真机构名 |
| `.action-buttons` 里的 `href="#"` | 填上真正的 paper / arXiv / code / video URL |
| `#bibtex` 里的 `<pre><code>` | 填上正式 BibTeX |

## 把图换成新版本

直接覆盖 `static/images/` 下对应的 PNG 即可。如果要从 LaTeX 源重新生成：

```bash
cd ref/Formatting_Instructions_For_NeurIPS_2026/figs
for f in teaset main_results ablation_latent ablation_gen; do
  pdftoppm -png -r 200 "$f.pdf" "../../../static/images/$f" -singlefile
done
```

需要 `pdftoppm`（macOS: `brew install poppler`）。

## 真机视频上传

真机段对齐论文 Table 3 的 4 个任务（hexagon / zipper / USB / marker cap），每任务 4 个视频槽位（Original + Object/Background/Lighting 三种泛化），其中 zipper 没有 Object 泛化测试。共计 **15 个 .mp4 槽位**。槽位空着也不会报错，会显示 `static/images/video_placeholder.svg` 的"Video coming soon"占位图，文件一拖进 `static/videos/` 自动顶替。

文件名约定（**不要改名**，HTML 里 hardcode 了路径）：

| 任务 | 槽位 | 文件名 |
|------|------|--------|
| **Insert hexagon block** (single-arm) | Original | `static/videos/hexagon_original.mp4` |
| | Object 泛化 | `static/videos/hexagon_object.mp4` |
| | Background 泛化 | `static/videos/hexagon_background.mp4` |
| | Lighting 泛化 | `static/videos/hexagon_lighting.mp4` |
| **Open bag zipper** (dual-arm) | Original | `static/videos/zipper_original.mp4` |
| | Background 泛化 | `static/videos/zipper_background.mp4` |
| | Lighting 泛化 | `static/videos/zipper_lighting.mp4` |
| **Insert USB into port** (single-arm) | Original | `static/videos/usb_original.mp4` |
| | Object 泛化 | `static/videos/usb_object.mp4` |
| | Background 泛化 | `static/videos/usb_background.mp4` |
| | Lighting 泛化 | `static/videos/usb_lighting.mp4` |
| **Open marker cap** (single-arm) | Original | `static/videos/marker_original.mp4` |
| | Object 泛化 | `static/videos/marker_object.mp4` |
| | Background 泛化 | `static/videos/marker_background.mp4` |
| | Lighting 泛化 | `static/videos/marker_lighting.mp4` |

视频建议规格：
- 编码：H.264 (libx264)，AAC 或无音轨
- 分辨率：≥720p，宽高比 16:9
- 单文件 < 5 MB（Pages 整个仓库限制 1 GB，单文件超过 100 MB push 不上去）

压一波视频体积的命令（需要 ffmpeg）：
```bash
ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -preset slow -an out.mp4
```

## 改主题色

`static/css/style.css` 顶部的 `:root` 里：
```css
--accent: #b11f3a;        /* 论文图里那种红色，用于强调和"我们方法"行 */
--accent-blue: #2f5f8f;   /* baseline 蓝 */
```
直接改这两个就能换全站主色。

## 致谢

模板布局借鉴 [Nerfies](https://github.com/nerfies/nerfies.github.io)、[ManualVLA](https://sites.google.com/view/maunalvla/) 和 [LaST₀](https://vla-last0.github.io/)。
