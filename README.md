# LaST<sub>0</sub><sup>*</sup> — Project Page

Static project page for [**LaST<sub>0</sub><sup>*</sup>: Shaping Action through Physical Latent Reasoning via Reinforcement Learning**](#). Plain HTML / CSS / vanilla JS, no build step, hosted on GitHub Pages.

🔗 **Live**: <https://siriyep.github.io/last-star-0/> *(activates after `Settings → Pages → Source = main / root` on first deploy)*

## 页面内容

```
Teaser  ─►  Title + Buttons  ─►  Headline Results (Sim)  ─►  Real-World  ─►  Abstract  ─►  BibTeX
```

实验结果整段前置到 Abstract 之前，论文方法 / 消融 / 附录分析全部不放——读者看完核心战绩想了解细节直接走 Paper / arXiv 链接。

| 段落 | 内容 |
|------|------|
| **Hero intro** | 进页面瞬间全屏显示 teaser + 白条标题，第一次滚动触发 FLIP morph 动画把 teaser 缩到正常位置、标题平滑滑入正文位置；hash 直链 (`#bibtex` 等) 和 `prefers-reduced-motion` 用户跳过此动画 |
| **Teaser** | 论文 Figure 1 (`teaset.png`) |
| **Title + Authors + Buttons** | 标题（`LaST<sub>0</sub><sup>*</sup>` 用 KaTeX 渲染，红色高亮）；5 个按钮：Paper / arXiv（官方 logomark inline SVG，左红右白）/ Code / Video / BibTeX |
| **Headline Results** | 4 张数字卡 (99.8% / +50% / 1 traj / 100% OOD) + 完整 LIBERO 11 行对比表（`tab:libero_comparison`）+ 学习曲线图（`main_results.png`）+ 三联 callout（Faster Convergence / Higher Final Accuracy / Stronger OOD Transfer） |
| **Real-World** | 真机蒙太奇（`real.png`）+ 双子表成功率（`tab:real`，hexagon\|zipper / USB\|marker cap）+ 4 个任务视频区块（每任务 1 normal + 3 generalization 槽位，共 15 个 .mp4 占位） |
| **Abstract** | 论文 abstract 原文 |
| **BibTeX** | 引用块 + 一键复制按钮 |

## 目录结构

```
.
├── index.html                          # 整个页面（约 600 行）
├── README.md
├── .gitignore
├── .nojekyll                           # 让 GitHub Pages 跳过 Jekyll
└── static/
    ├── css/style.css                   # 所有样式（~600 行）
    ├── js/main.js                      # intro morph 逻辑 + BibTeX 复制
    ├── videos/                         # 真机视频（自行上传，命名见下）
    └── images/
        ├── teaset.png                  # 用：teaser
        ├── main_results.png            # 用：学习曲线
        ├── real.png                    # 用：真机蒙太奇
        ├── arxiv-logomark.svg          # 备份：官方 X mark SVG（按钮里是 inline 拷贝）
        ├── video_placeholder.svg       # 视频未上传时的占位图
        └── ablation_*.png, appd_*.png  # 孤儿文件（可清掉，见下）
```

> **孤儿文件**：`static/images/` 下的 `ablation_gen.png` / `ablation_latent.png` / `appd_attn.png` / `appd_freq.png` / `appd_gen.png` / `appd_lambda.png` / `appd_mask.png` / `appd_step.png` 共 8 个 PNG（约 2 MB）当前没被 `index.html` 引用——是早期 Method/Ablation 段被删掉时留下的。要清干净的话：
> ```bash
> rm static/images/{ablation_*,appd_*}.png && git add -A && git commit -m "Remove unused figures" && git push
> ```

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

直接双击 `index.html` 也能看，但 KaTeX 在 `file://` 下偶尔有 CORS 抱怨，建议起 server。

## 还要填的占位

| 位置 | 替换什么 |
|------|---------|
| `index.html` 内 5 个 `Anonymous Author N` 和 `Senior Author` | 真名 + 主页链接（论文 deanonymize 后） |
| `Institution One` / `Institution Two` | 真机构名 |
| `.action-buttons` 5 个 `href="#"` | Paper PDF / arXiv / GitHub repo / Video / BibTeX 真 URL |
| `#bibtex` 内 `<pre><code>` 块 | 正式 BibTeX |
| 表格里的 `[Task name TBD]` | 已删（4 个真机任务名都是 paper 里的真名） |

## 真机视频上传

15 个 `.mp4` 槽位，HTML 里 hardcode 了文件名（**不要改名**）。文件没上传时显示 `video_placeholder.svg` 的 "Video coming soon" 占位图，丢进 `static/videos/` 自动顶替。

| 任务 | 槽位 | 文件名 |
|------|------|--------|
| **Insert hexagon block** (single-arm) | Original | `static/videos/hexagon_original.mp4` |
| | Object | `static/videos/hexagon_object.mp4` |
| | Background | `static/videos/hexagon_background.mp4` |
| | Lighting | `static/videos/hexagon_lighting.mp4` |
| **Open bag zipper** (dual-arm) | Original | `static/videos/zipper_original.mp4` |
| | Background | `static/videos/zipper_background.mp4` |
| | Lighting | `static/videos/zipper_lighting.mp4` |
| **Insert USB into port** (single-arm) | Original | `static/videos/usb_original.mp4` |
| | Object | `static/videos/usb_object.mp4` |
| | Background | `static/videos/usb_background.mp4` |
| | Lighting | `static/videos/usb_lighting.mp4` |
| **Open marker cap** (single-arm) | Original | `static/videos/marker_original.mp4` |
| | Object | `static/videos/marker_object.mp4` |
| | Background | `static/videos/marker_background.mp4` |
| | Lighting | `static/videos/marker_lighting.mp4` |

> Zipper 没有 Object 泛化（论文 Table 3 里就是 `–`），所以只有 3 个槽位。

**视频建议规格**：H.264 / 720p+ / 16:9 / 单文件 < 5 MB。压缩命令（需 `ffmpeg`）：
```bash
ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -preset slow -an out.mp4
```

GitHub 单文件 100 MB 上限，仓库总大小 1 GB 上限。视频多了考虑外挂 CDN 或者 git-lfs。

## 自定义

### 主题色

`static/css/style.css` 顶部 `:root`：

```css
--accent: #b11f3a;        /* Cornell 红 — 标题 LaST*0 / "After RL" 行 / callout 边线 */
--accent-blue: #2f5f8f;   /* baseline 蓝 — 学习曲线里 baseline 颜色注释 */
```

### Intro 动画时长

`static/js/main.js` 顶部：

```js
var MORPH_MS = 950;   // teaser/title morph 持续时间
var FADE_MS  = 350;   // morph 完成后 veil 整体淡出时间
```

### 跳过 intro

加 `?` 后的任意 `#hash`（比如 `#bibtex`），或在系统设置里打开"减少动效"。也可以注释掉 `<head>` 里加 `intro-active` class 的那段 `<script>`。

## Tech notes

- **KaTeX** via CDN（jsdelivr）：所有 `$...$` / `$$...$$` 自动渲染。`\text{LaST}_0^*` 在标题里、LAPO 公式在 Method 段（虽然 Method 段已删）
- **Font Awesome 6** via CDN：所有按钮图标
- **Google Fonts** Inter (sans) + Noto Serif (标题)
- **arXiv logo**：从 [info.arxiv.org/assets/arxiv-logomark-small.svg](https://info.arxiv.org/assets/arxiv-logomark-small.svg) 抓的官方 SVG，inline 在按钮里、左红 (`#b31b1b` Cornell red) 右白 (`currentColor`) 双色填充
- **Intro morph**：FLIP 思路，JS 实测 in-flow 元素位置 → 给 veil 元素加 `translate(dx,dy) scale(s)` → CSS `transition: transform 0.95s` 驱动平滑变换 → veil 淡出。标题 scale ≈ 1（因为 intro 和 in-flow 用同字号），所以视觉上是纯 translate

## 致谢

布局借鉴 [Nerfies](https://github.com/nerfies/nerfies.github.io)、[ManualVLA](https://sites.google.com/view/maunalvla/) 和 [LaST₀](https://vla-last0.github.io/)。arXiv 字标使用遵循 [arXiv brand guidelines](https://info.arxiv.org/brand/brand-guidelines.html)。
