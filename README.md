# LaST-R1 — Project Page

Static project page for [**LaST-R1: Reinforcing Action via Adaptive Physical Latent Reasoning for VLA Models**](#). Plain HTML / CSS / vanilla JS, no build step, hosted on GitHub Pages.

🔗 **Live**: <https://siriyep.github.io/last-star-0/>

## 页面内容

```
Teaser  ─►  Title + Buttons  ─►  Headline Results (Sim)  ─►  Real-World  ─►  Abstract  ─►  BibTeX
```

实验结果整段前置到 Abstract 之前，论文方法 / 消融 / 附录分析全部不放——读者看完核心战绩想了解细节直接走 Paper / arXiv 链接。

| 段落 | 内容 |
|------|------|
| **Hero intro** | 进页面瞬间全屏显示标题白条 + teaser 图，第一次滚动触发 FLIP morph 动画把标题滑到正文位置、teaser 缩到正常位置；hash 直链（`#bibtex` 等）和 `prefers-reduced-motion` 用户跳过此动画 |
| **Teaser** | 论文 Figure 1 (`teaser.png`) |
| **Title + Authors + Buttons** | 标题，`LaST-R1` 用 Cornell 红高亮；5 个按钮：Paper / arXiv（官方 logomark inline SVG，左红右白）/ Code / Video / BibTeX |
| **Headline Results** | 4 张数字卡（**99.8%** LIBERO / **+44%** real-world / **1 traj** warm-up / **100%** OOD on 3 held-out tasks）+ 完整 LIBERO 11 行对比表（`tab:libero_comparison`）+ 学习曲线图（`main_results.png`）+ 三联 callout（Faster Convergence / Higher Final Accuracy / Stronger OOD Transfer） |
| **Real-World** | 真机蒙太奇 (`main_real.png`) + 双子表成功率 (`tab:realworld_results`，hexagon \| zipper / vase \| bottle cap，含相对下降比例) + 4 个任务视频区块（共 16 个 .mp4 槽位）|
| **Abstract** | 论文 V3 abstract 原文 |
| **BibTeX** | 引用块 + 一键复制按钮 |

## 目录结构

```
.
├── index.html                          # 整个页面（约 730 行）
├── README.md
├── .gitignore
├── .nojekyll                           # 让 GitHub Pages 跳过 Jekyll
└── static/
    ├── css/style.css                   # 所有样式
    ├── js/main.js                      # intro morph 逻辑 + BibTeX 复制
    ├── videos/                         # 真机视频
    │   ├── hexagon_*.mp4               # 4 段：original + 3 OOD
    │   ├── zipper_*.mp4                # 4 段
    │   ├── vase_*.mp4                  # 4 段
    │   └── bottle_*.mp4                # 4 段（待上传，目前显示占位图）
    └── images/
        ├── teaser.png                  # 用：teaser
        ├── main_results.png            # 用：学习曲线
        ├── main_real.png               # 用：真机蒙太奇
        ├── arxiv-logomark.svg          # 备份：官方 X mark SVG（按钮里是 inline 拷贝）
        └── video_placeholder.svg       # 视频未上传时的占位图
```

## 论文实验数据（已对齐到论文 V3）

### LIBERO Benchmark（仿真）
| Suite | LaST-R1 | π_RL（次优） |
|-------|---------|--------------|
| Spatial | **99.8** | 99.6 |
| Object | **100.0** | 100.0 |
| Goal | **100.0** | 99.6 |
| Long | **99.4** | 94.0 |
| **Average** | **99.8** | 98.3 |

### Real-World 真机（4 任务，warm-up vs RL，含 OOD 三列）

每任务格式：`Original / Unseen-Object / -Background / -Lighting`

| Task | After warm-up | After RL |
|------|---------------|----------|
| Insert hexagon block (single) | 45 / 35 / 35 / 40 | **90 / 75 / 85 / 80** |
| Open bag zipper (dual) | 55 / 30 / 50 / 45 | **95 / 80 / 95 / 90** |
| Wipe the Vase with a Sponge (dual) | 65 / 35 / 40 / 20 | **95 / 80 / 90 / 95** |
| Open bottle cap (dual) | 45 / 30 / 30 / 35 | **95 / 95 / 80 / 85** |
| **Original 列平均** | 52.5 | **93.75** |

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 还要填的占位

| 位置 | 替换什么 |
|------|---------|
| `index.html` 内 5 个 `Anonymous Author N` 和 `Senior Author` | 真名 + 主页链接（论文 deanonymize 后） |
| `Institution One` / `Institution Two` | 真机构名 |
| `.action-buttons` 5 个 `href="#"` | Paper PDF / arXiv / GitHub repo / Video / BibTeX 真 URL |
| `#bibtex` 内 `<pre><code>` 块 | 正式 BibTeX |

## 真机视频

16 个 `.mp4` 槽位，HTML 里 hardcode 了文件名（**不要改名**）。文件没上传时显示 `video_placeholder.svg` 的 "Video coming soon" 占位图，丢进 `static/videos/` 自动顶替。

| 任务 | 槽位 | 文件名 |
|------|------|--------|
| **Insert hexagon block** (single-arm) | Original | `static/videos/hexagon_original.mp4` |
| | Unseen-Object | `static/videos/hexagon_object.mp4` |
| | Unseen-Background | `static/videos/hexagon_background.mp4` |
| | Unseen-Lighting | `static/videos/hexagon_lighting.mp4` |
| **Open bag zipper** (dual-arm) | Original | `static/videos/zipper_original.mp4` |
| | Unseen-Object | `static/videos/zipper_object.mp4` |
| | Unseen-Background | `static/videos/zipper_background.mp4` |
| | Unseen-Lighting | `static/videos/zipper_lighting.mp4` |
| **Wipe the Vase with a Sponge** (dual-arm) | Original | `static/videos/vase_original.mp4` |
| | Unseen-Object | `static/videos/vase_object.mp4` |
| | Unseen-Background | `static/videos/vase_background.mp4` |
| | Unseen-Lighting | `static/videos/vase_lighting.mp4` |
| **Open bottle cap** (dual-arm) | Original | `static/videos/bottle_original.mp4` |
| | Unseen-Object | `static/videos/bottle_object.mp4` |
| | Unseen-Background | `static/videos/bottle_background.mp4` |
| | Unseen-Lighting | `static/videos/bottle_lighting.mp4` |

> 当前已上传 12/16（hexagon、zipper、vase 各 4 个，bottle cap 还未拍）。bottle 那 4 个空着会显示占位图，拍好后丢进 `static/videos/` 用上面的文件名命名即可。

**视频建议规格**：H.264 / 720p+ / 16:9 / 单文件 < 10 MB（已上传的范围 1.3–13 MB，OK）。压缩命令（需 `ffmpeg`）：
```bash
ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -preset slow -an out.mp4
```

GitHub 单文件 100 MB 上限，仓库总大小 1 GB 上限。

## 自定义

### 主题色

`static/css/style.css` 顶部 `:root`：

```css
--accent: #b11f3a;        /* Cornell 红 — 标题 LaST-R1 / "After RL" 行 / callout 边线 */
--accent-blue: #2f5f8f;   /* baseline 蓝 — 学习曲线注释 */
```

### Intro 动画时长

`static/js/main.js` 顶部：

```js
var MORPH_MS = 950;   // 标题 / 图片 morph 持续时间
var FADE_MS  = 350;   // morph 完成后 veil 整体淡出时间
```

### 跳过 intro

加 `?` 后的任意 `#hash`（比如 `#bibtex`），或在系统设置里打开"减少动效"。也可以注释掉 `<head>` 里加 `intro-active` class 的那段 `<script>`。

## Tech notes

- **KaTeX** via CDN（jsdelivr）：所有 `$...$` / `$$...$$` 自动渲染。当前页面 KaTeX 主要用于公式（论文 V3 删掉 method 段后实际使用很少，但 CDN 仍保留以备将来）
- **Font Awesome 6** via CDN：所有按钮图标
- **Google Fonts** Inter (sans) + Noto Serif (标题)
- **arXiv logo**：从 [info.arxiv.org/assets/arxiv-logomark-small.svg](https://info.arxiv.org/assets/arxiv-logomark-small.svg) 抓的官方 SVG，inline 在按钮里、左红 (`#b31b1b` Cornell red) 右白 (`currentColor`) 双色填充
- **Intro morph**：FLIP 思路，JS 实测 in-flow 元素位置 → 给 veil 元素加 `translate(dx,dy) scale(s)` → CSS `transition: transform 0.95s` 驱动平滑变换 → veil 淡出。标题 scale ≈ 1（intro 和 in-flow 用同字号），所以视觉上是纯 translate（标题往下，图片往上）

## 致谢

布局借鉴 [Nerfies](https://github.com/nerfies/nerfies.github.io)、[ManualVLA](https://sites.google.com/view/maunalvla/) 和 [LaST₀](https://vla-last0.github.io/)。arXiv 字标使用遵循 [arXiv brand guidelines](https://info.arxiv.org/brand/brand-guidelines.html)。
