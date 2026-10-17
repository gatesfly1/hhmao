---
title: 网站结构说明
sidebar_label: 网站结构
sidebar_position: 100
description: hhmao 文档站（hhmao-docs）的目录结构、配置入口、组件分层与多语言机制。
---

# 网站结构说明

> 本页面向开发者，介绍 hhmao-docs（Docusaurus 3.10）站点的目录组织、配置文件、组件分层与多语言实现。修改代码前建议先通读。

## 顶层目录

```
hhmao-docs/
├── docs/                          # 文档源文件（中文 zh-CN）
├── i18n/                          # 多语言翻译
│   ├── en/                        # 英文翻译
│   └── zh-TW/                     # 繁体翻译
├── src/                           # 自定义 React 组件 / 主题覆盖 / CSS
├── static/                        # 静态资源（拷贝到根目录）
├── .docusaurus/                   # Docusaurus 缓存（可删）
├── build/                         # 构建产物（可删）
├── docusaurus.config.ts           # ★ 主配置
├── sidebars.ts                    # ★ 侧边栏结构
├── package.json
└── gen-llms.js                    # 脚本：生成 llms.txt
```

## 文档源：docs/

zh-CN 文档按用途分为 8 个子目录 + 根级文件：

```
docs/
├── intro.md                       # 站点首页（sidebar_position: 1）
├── cli.md                         # MeowLoad CLI 命令行工具
├── supported-websites.md          # 支持的平台列表
│
├── quickstart/                    # 快速上手
│   ├── single-link.md
│   ├── batch.md
│   ├── md5.md
│   └── audio-extract.md
│
├── client/                        # 客户端下载
│   ├── windows.md
│   └── mac.md
│
├── features/                      # 功能特性
│   ├── sniffer.md
│   ├── playlist-channel.md
│   ├── coverage.md
│   ├── quality.md
│   ├── audio-extract.md
│   └── batch-links.md
│
├── faq/                           # 常见问题
│   ├── watermark.md
│   ├── install.md
│   ├── quality.md
│   ├── album-audio.md
│   ├── private.md
│   ├── expiry.md
│   ├── batch.md
│   ├── failure.md
│   ├── account-and-membership-faq.md
│   └── keep-downloaded-files-in-order.md
│
├── platforms/                     # 21 个平台下载页
│   ├── youtube-video-downloader.md
│   ├── bilibili-video-downloader.md
│   ├── twitter-video-downloader.md
│   ├── tiktok-video-downloader.md
│   ├── instagram-video-downloader.md
│   ├── facebook-video-downloader.md
│   ├── threads-video-downloader.md
│   ├── sora-video-downloader.md
│   ├── reddit-video-downloader.md
│   ├── pinterest-video-downloader.md
│   ├── twitch-video-downloader.md
│   ├── soundcloud-video-downloader.md
│   ├── snapchat-video-downloader.md
│   ├── vimeo-video-downloader.md
│   ├── tumblr-video-downloader.md
│   ├── dailymotion-video-downloader.md
│   ├── likee-video-downloader.md
│   ├── linkedin-video-downloader.md
│   ├── vk-video-downloader.md
│   ├── weibo-video-downloader.md
│   └── xiaohongshu-video-downloader.md
│
├── video-downloads/               # 视频下载专题
│   ├── bulk-video-downloader.md
│   ├── how-to-download-ifunny-videos.md
│   ├── sora2-watermark-remover.md
│   └── batch-download-profile-playlist.md
│
├── livestream-recording/          # 直播录制
│   ├── how-to-record-twitch-live-streams.md
│   └── how-to-record-kick-live-streams.md
│
├── browser-extension/             # 浏览器插件
│   ├── install-meowload-extension.md
│   ├── download-ecommerce-product-videos.md
│   ├── download-1688-product-videos.md
│   ├── download-wechat-article-videos.md
│   └── batch-save-xiaohongshu-notes.md
│
└── youtube/                       # YouTube 专题
    ├── youtube-subtitles-download.md
    ├── download-youtube-with-meowload-browser-extension.md
    ├── how-to-download-a-youtube-playlist.md
    └── youtube-network-troubleshooting.md
```

每篇 markdown 顶部都有 frontmatter：

```yaml
---
title: 显示在浏览器标签与搜索结果的标题
sidebar_label: 侧边栏显示名
sidebar_position: 侧边栏内排序
description: SEO 描述
---
```

## 多语言：i18n/

Docusaurus i18n 约定：每个 locale 在 `i18n/<locale>/` 下镜像站点结构。

```
i18n/
├── en/
│   ├── docusaurus-plugin-content-docs/current/
│   │   ├── intro.md                    # zh-CN docs/* 的镜像
│   │   ├── platforms/*.md
│   │   └── ...
│   ├── docusaurus-plugin-content-docs/current.json   # sidebar / label 翻译
│   ├── docusaurus-theme-classic/
│   │   ├── navbar.json                 # navbar 文案翻译
│   │   └── footer.json
│   └── code.json
│
└── zh-TW/
    ├── docusaurus-plugin-content-docs/current/
    ├── docusaurus-plugin-content-docs/current.json
    ├── docusaurus-theme-classic/
    │   ├── navbar.json
    │   └── footer.json
    └── code.json
```

### 翻译层级

| 文件 | 作用 |
|---|---|
| `<file>.md` 镜像 | 整篇文档翻译，与 zh-CN 同名 |
| `current.json` | sidebar 分类标签、版本标签 |
| `navbar.json` | navbar item.label.*、title、logo.alt、`<Translate>` 文案 |
| `footer.json` | footer 链接标题与文案 |
| `code.json` | Docusaurus UI 字符串（如 "Previous"、"Next"） |

zh-CN 是**默认 locale**，无需 i18n 目录；其他 locale 都通过 `<Translate id="...">` 标签或配置文件里的字符串触发翻译。

## 侧边栏：sidebars.ts

定义 sidebar 结构与分组。一个 `mainSidebar` 数组，按以下顺序排列：

| # | 分组 | 子项 |
|---|---|---|
| 1 | `intro` | 站点首页 |
| 2 | 快速上手 | single-link / batch / md5 / audio-extract |
| 3 | 客户端 | windows / mac / cli |
| 4 | 功能特性 | sniffer / playlist-channel / coverage / quality / audio-extract / batch-links |
| 5 | 视频下载 | bulk / ifunny / sora2 / batch-download |
| 6 | 直播录制 | twitch / kick |
| 7 | 浏览器插件 | install / ecom / 1688 / wechat / xiaohongshu |
| 8 | YouTube | subtitles / extension / playlist / network |
| 9 | 支持的平台 | 21 个平台页 |
| 10 | 常见疑问 | 8 个 FAQ + 2 个新加（账号、文件顺序） |
| 11 | `supported-websites` | 平台总览 |

分组标签的翻译来自 `i18n/<locale>/docusaurus-plugin-content-docs/current.json` 中的 `sidebar.mainSidebar.category.<label>`。

## 主配置：docusaurus.config.ts

关键字段：

| 字段 | 说明 |
|---|---|
| `url` / `baseUrl` | `https://hhmao.cn/` / `/` |
| `i18n.defaultLocale` | `zh-CN` |
| `i18n.locales` | `['zh-CN', 'zh-TW', 'en']` |
| `presets.classic.docs.routeBasePath` | `/`（首页即文档根） |
| `themeConfig.navbar.items` | 顶部导航：左 sidebar / 支持平台 / 常见疑问，右 自定义「回到哼哼猫 ↗」+ 语言切换 |
| `themeConfig.footer` | 底部链接 |
| `themeConfig.colorMode.defaultMode` | `dark` |

navbar 自定义项使用 swizzle 注册的类型 `custom-NavbarBackHome`（见 `src/theme/NavbarItem/`）。

## 自定义组件：src/

```
src/
├── components/                    # 普通 React 组件
│   ├── HomepageFeatures.tsx       # 首页 6 个特性卡片
│   └── HomepageHeader.tsx
├── css/
│   └── custom.css                  # 站点主题、navbar 按钮、卡片样式
└── theme/                         # Docusaurus 主题覆盖（swizzle）
    ├── DocItem/Metadata/index.tsx  # 平台页注入 HowTo + FAQPage JSON-LD
    ├── NavbarItem/
    │   ├── BackHome.tsx           # 回到哼哼猫 ↗ 按钮
    │   └── ComponentTypes.tsx      # 注册 custom-NavbarBackHome 类型
    └── NotFound/Content/index.tsx
```

### custom.css 关键样式块

- `:root` / `[data-theme='light']`：品牌色变量 `--hh-bg-*`、`--hh-accent`
- `.hero--primary`：首页英雄区背景
- `.hh-card` + `.theme-doc-card-container`：统一蓝色卡片样式
- `.navbar__back-home`：回到哼哼猫 ↗ 链接样式（默认无下划线，hover 变蓝）
- `.hh-hero-grid`：首页双列英雄网格

## 主题 swizzle 工作流

swizzle = 把 Docusaurus 主题组件复制到 `src/theme/`，然后可自由修改。本项目 swizzle 了：

1. **DocItem/Metadata**：往平台页 `<head>` 注入 `HowTo` + `FAQPage` JSON-LD（基于当前页面 id）
2. **NavbarItem/ComponentTypes**：注册自定义 navbar item 类型 `custom-NavbarBackHome`
3. **NavbarItem/BackHome**：实现「回到哼哼猫 ↗」React 组件（用 `<Translate>` + i18n JSON）
4. **NotFound/Content**：自定义 404 页

新增 swizzle 用：

```bash
npx docusaurus swizzle @docusaurus/theme-classic NavbarItem/ComponentTypes --wrap
```

## 静态资源：static/

构建时整目录复制到 `build/` 根目录。当前文件：

- `llms.txt` — 大模型摘要
- `manifest.webmanifest` — PWA 配置
- `robots.txt`

## 构建命令

| 命令 | 作用 |
|---|---|
| `npm run start` | dev server（http://localhost:3000） |
| `npm run build` | 构建生产静态文件到 `build/` |
| `npm run clear` | 清除 `.docusaurus` 缓存 |
| `npm run serve` | 预览 `build/` 产物 |

## 多语言路由

| URL | locale |
|---|---|
| `https://hhmao.cn/` | zh-CN（默认） |
| `https://hhmao.cn/en/` | English |
| `https://hhmao.cn/zh-TW/` | 繁體中文 |

Docusaurus 自动按 i18n.json 中的 `baseUrl` 路由。

## 添加新文档的步骤

1. 在 `docs/<分类>/` 下新建 `.md`，写好 frontmatter
2. 在 `i18n/en/docusaurus-plugin-content-docs/current/<分类>/` 下写英文版（路径与文件名保持一致）
3. 在 `i18n/zh-TW/docusaurus-plugin-content-docs/current/<分类>/` 下写繁体版
4. 若新增 sidebar 分类：在 `sidebars.ts` 里添加 category；并分别在 en/zh-TW 的 `current.json` 加 `sidebar.mainSidebar.category.<label>` 翻译
5. 重新 `npm run build` 验证

## 添加新平台的步骤

1. `docs/platforms/<key>-video-downloader.md` 写中文
2. i18n 两个目录里写英文/繁体（同路径）
3. `sidebars.ts` 的"支持的平台"分类里加引用
4. 如果需要 JSON-LD，由 `src/theme/DocItem/Metadata/index.tsx` 自动检测 `id` 前缀生成

## 关键脚本

- `gen-llms.js`：生成 `static/llms.txt`
- `translate.js`：批量机翻工具（依赖 `opencc`）