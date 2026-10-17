---
title: 網站結構說明
sidebar_label: 網站結構
sidebar_position: 100
description: hhmao 文檔站（hhmao-docs）的目錄結構、配置入口、組件分層與多語言機制。
---

# 網站結構說明

> 本頁面向開發者，介紹 hhmao-docs（Docusaurus 3.10）站點的目錄組織、配置文件、組件分層與多語言實現。修改代碼前建議先通讀。

## 頂層目錄

```
hhmao-docs/
├── docs/                          # 文檔源文件（中文 zh-CN）
├── i18n/                          # 多語言翻譯
│   ├── en/                        # 英文翻譯
│   └── zh-TW/                     # 繁體翻譯
├── src/                           # 自定義 React 組件 / 主題覆蓋 / CSS
├── static/                        # 靜態資源（拷貝到根目錄）
├── .docusaurus/                   # Docusaurus 緩存（可刪）
├── build/                         # 構建產物（可刪）
├── docusaurus.config.ts           # ★ 主配置
├── sidebars.ts                    # ★ 側邊欄結構
├── package.json
└── gen-llms.js                    # 腳本：生成 llms.txt
```

## 文檔源：docs/

zh-CN 文檔按用途分為 8 個子目錄 + 根級文件：

```
docs/
├── intro.md                       # 站點首頁（sidebar_position: 1）
├── cli.md                         # MeowLoad CLI 命令行工具
├── supported-websites.md          # 支持的平臺列表
│
├── quickstart/                    # 快速上手
│   ├── single-link.md
│   ├── batch.md
│   ├── md5.md
│   └── audio-extract.md
│
├── client/                        # 客戶端下載
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
├── faq/                           # 常見問題
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
├── platforms/                     # 21 個平臺下載頁
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
├── video-downloads/               # 視頻下載專題
│   ├── bulk-video-downloader.md
│   ├── how-to-download-ifunny-videos.md
│   ├── sora2-watermark-remover.md
│   └── batch-download-profile-playlist.md
│
├── livestream-recording/          # 直播錄製
│   ├── how-to-record-twitch-live-streams.md
│   └── how-to-record-kick-live-streams.md
│
├── browser-extension/             # 瀏覽器插件
│   ├── install-meowload-extension.md
│   ├── download-ecommerce-product-videos.md
│   ├── download-1688-product-videos.md
│   ├── download-wechat-article-videos.md
│   └── batch-save-xiaohongshu-notes.md
│
└── youtube/                       # YouTube 專題
    ├── youtube-subtitles-download.md
    ├── download-youtube-with-meowload-browser-extension.md
    ├── how-to-download-a-youtube-playlist.md
    └── youtube-network-troubleshooting.md
```

每篇 markdown 頂部都有 frontmatter：

```yaml
---
title: 顯示在瀏覽器標籤與搜索結果的標題
sidebar_label: 側邊欄顯示名
sidebar_position: 側邊欄內排序
description: SEO 描述
---
```

## 多語言：i18n/

Docusaurus i18n 約定：每個 locale 在 `i18n/<locale>/` 下鏡像站點結構。

```
i18n/
├── en/
│   ├── docusaurus-plugin-content-docs/current/
│   │   ├── intro.md                    # zh-CN docs/* 的鏡像
│   │   ├── platforms/*.md
│   │   └── ...
│   ├── docusaurus-plugin-content-docs/current.json   # sidebar / label 翻譯
│   ├── docusaurus-theme-classic/
│   │   ├── navbar.json                 # navbar 文案翻譯
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

### 翻譯層級

| 文件 | 作用 |
|---|---|
| `<file>.md` 鏡像 | 整篇文檔翻譯，與 zh-CN 同名 |
| `current.json` | sidebar 分類標籤、版本標籤 |
| `navbar.json` | navbar item.label.*、title、logo.alt、`<Translate>` 文案 |
| `footer.json` | footer 鏈接標題與文案 |
| `code.json` | Docusaurus UI 字符串（如 "Previous"、"Next"） |

zh-CN 是**默認 locale**，無需 i18n 目錄；其他 locale 都通過 `<Translate id="...">` 標籤或配置文件裡的字符串觸發翻譯。

## 側邊欄：sidebars.ts

定義 sidebar 結構與分組。一個 `mainSidebar` 數組，按以下順序排列：

| # | 分組 | 子項 |
|---|---|---|
| 1 | `intro` | 站點首頁 |
| 2 | 快速上手 | single-link / batch / md5 / audio-extract |
| 3 | 客戶端 | windows / mac / cli |
| 4 | 功能特性 | sniffer / playlist-channel / coverage / quality / audio-extract / batch-links |
| 5 | 視頻下載 | bulk / ifunny / sora2 / batch-download |
| 6 | 直播錄製 | twitch / kick |
| 7 | 瀏覽器插件 | install / ecom / 1688 / wechat / xiaohongshu |
| 8 | YouTube | subtitles / extension / playlist / network |
| 9 | 支持的平臺 | 21 個平臺頁 |
| 10 | 常見疑問 | 8 個 FAQ + 2 個新加（賬號、文件順序） |
| 11 | `supported-websites` | 平臺總覽 |

分組標籤的翻譯來自 `i18n/<locale>/docusaurus-plugin-content-docs/current.json` 中的 `sidebar.mainSidebar.category.<label>`。

## 主配置：docusaurus.config.ts

關鍵字段：

| 字段 | 說明 |
|---|---|
| `url` / `baseUrl` | `https://hhmao.cn/` / `/` |
| `i18n.defaultLocale` | `zh-CN` |
| `i18n.locales` | `['zh-CN', 'zh-TW', 'en']` |
| `presets.classic.docs.routeBasePath` | `/`（首頁即文檔根） |
| `themeConfig.navbar.items` | 頂部導航：左 sidebar / 支持平臺 / 常見疑問，右 自定義「回到哼哼貓 ↗」+ 語言切換 |
| `themeConfig.footer` | 底部鏈接 |
| `themeConfig.colorMode.defaultMode` | `dark` |

navbar 自定義項使用 swizzle 註冊的類型 `custom-NavbarBackHome`（見 `src/theme/NavbarItem/`）。

## 自定義組件：src/

```
src/
├── components/                    # 普通 React 組件
│   ├── HomepageFeatures.tsx       # 首頁 6 個特性卡片
│   └── HomepageHeader.tsx
├── css/
│   └── custom.css                  # 站點主題、navbar 按鈕、卡片樣式
└── theme/                         # Docusaurus 主題覆蓋（swizzle）
    ├── DocItem/Metadata/index.tsx  # 平臺頁注入 HowTo + FAQPage JSON-LD
    ├── NavbarItem/
    │   ├── BackHome.tsx           # 回到哼哼貓 ↗ 按鈕
    │   └── ComponentTypes.tsx      # 註冊 custom-NavbarBackHome 類型
    └── NotFound/Content/index.tsx
```

### custom.css 關鍵樣式塊

- `:root` / `[data-theme='light']`：品牌色變量 `--hh-bg-*`、`--hh-accent`
- `.hero--primary`：首頁英雄區背景
- `.hh-card` + `.theme-doc-card-container`：統一藍色卡片樣式
- `.navbar__back-home`：回到哼哼貓 ↗ 鏈接樣式（默認無下劃線，hover 變藍）
- `.hh-hero-grid`：首頁雙列英雄網格

## 主題 swizzle 工作流

swizzle = 把 Docusaurus 主題組件複製到 `src/theme/`，然後可自由修改。本項目 swizzle 了：

1. **DocItem/Metadata**：往平臺頁 `<head>` 注入 `HowTo` + `FAQPage` JSON-LD（基於當前頁面 id）
2. **NavbarItem/ComponentTypes**：註冊自定義 navbar item 類型 `custom-NavbarBackHome`
3. **NavbarItem/BackHome**：實現「回到哼哼貓 ↗」React 組件（用 `<Translate>` + i18n JSON）
4. **NotFound/Content**：自定義 404 頁

新增 swizzle 用：

```bash
npx docusaurus swizzle @docusaurus/theme-classic NavbarItem/ComponentTypes --wrap
```

## 靜態資源：static/

構建時整目錄複製到 `build/` 根目錄。當前文件：

- `llms.txt` — 大模型摘要
- `manifest.webmanifest` — PWA 配置
- `robots.txt`

## 構建命令

| 命令 | 作用 |
|---|---|
| `npm run start` | dev server（`http://localhost:3000`） |
| `npm run build` | 構建生產靜態文件到 `build/` |
| `npm run clear` | 清除 `.docusaurus` 緩存 |
| `npm run serve` | 預覽 `build/` 產物 |

## 多語言路由

| URL | locale |
|---|---|
| `https://hhmao.cn/` | zh-CN（默認） |
| `https://hhmao.cn/en/` | English |
| `https://hhmao.cn/zh-TW/` | 繁體中文 |

Docusaurus 自動按 i18n.json 中的 `baseUrl` 路由。

## 添加新文檔的步驟

1. 在 `docs/<分類>/` 下新建 `.md`，寫好 frontmatter
2. 在 `i18n/en/docusaurus-plugin-content-docs/current/<分類>/` 下寫英文版（路徑與文件名保持一致）
3. 在 `i18n/zh-TW/docusaurus-plugin-content-docs/current/<分類>/` 下寫繁體版
4. 若新增 sidebar 分類：在 `sidebars.ts` 裡添加 category；並分別在 en/zh-TW 的 `current.json` 加 `sidebar.mainSidebar.category.<label>` 翻譯
5. 重新 `npm run build` 驗證

## 添加新平臺的步驟

1. `docs/platforms/<key>-video-downloader.md` 寫中文
2. i18n 兩個目錄裡寫英文/繁體（同路徑）
3. `sidebars.ts` 的"支持的平臺"分類里加引用
4. 如果需要 JSON-LD，由 `src/theme/DocItem/Metadata/index.tsx` 自動檢測 `id` 前綴生成

## 關鍵腳本

- `gen-llms.js`：生成 `static/llms.txt`
- `translate.js`：批量機翻工具（依賴 `opencc`）