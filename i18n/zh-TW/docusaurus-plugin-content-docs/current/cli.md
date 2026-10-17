---
title: MeowLoad CLI 命令行工具
sidebar_label: CLI 命令行
sidebar_position: 1
description: 哼哼貓自 v3.9.9 起新增 meowload CLI，可在終端下載視頻、音頻、圖片、直播流、字幕等資源。
---

# MeowLoad CLI 命令行工具

哼哼貓自 **v3.9.9** 版本起新增了命令行工具 `meowload`，讓你可以直接在終端中下載視頻、音頻、圖片、直播流、字幕等資源，適合喜歡命令行操作或需要在腳本中集成下載能力的用戶。

## 工作原理

`meowload` CLI 通過與哼哼貓桌面軟件通信來執行任務。當你在終端執行 `info` 或 `download` 命令時，CLI 會自動啟動桌面軟件（如果軟件未啟動），並由桌面軟件完成資源的解析和下載。

CLI 需要搭配哼哼貓桌面軟件使用，使用前請確保已在桌面軟件中登錄賬號。

## 系統要求

| 系統 | 支持情況 |
|---|---|
| macOS | ✅ 支持 |
| Windows | ✅ 支持 |

CLI 隨桌面軟件一起安裝，無需單獨下載。如果你還沒有安裝哼哼貓桌面軟件，請前往 [下載頁面](https://hhmao.cn/app) 獲取。

## 驗證安裝

安裝桌面軟件後，打開終端輸入以下命令，確認 CLI 已正確安裝：

```bash
meowload version
```

如果安裝成功，會輸出當前桌面軟件版本號：

```json
{"version":"3.9.9"}
```

## 快速上手

### 下載資源

使用 `download` 命令下載鏈接中的所有媒體資源：

```bash
meowload download https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

只下載視頻：

```bash
meowload download https://www.youtube.com/watch?v=dQw4w9WgXcQ --media_type video
```

只下載音頻和圖片：

```bash
meowload download https://www.youtube.com/watch?v=dQw4w9WgXcQ --media_type audio,image
```

### 查詢資源信息

使用 `info` 命令查看某個鏈接包含的媒體資源：

```bash
meowload info https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

## 命令列表

| 命令 | 說明 |
|---|---|
| `meowload download` | 下載鏈接中的媒體資源 |
| `meowload info` | 查詢鏈接中可用的媒體資源 |
| `meowload convert` | 轉換媒體文件格式（視頻 / 音頻 / 圖片） |
| `meowload md5` | 修改文件的 MD5 哈希值 |
| `meowload completion` | 生成 Shell 自動補全腳本 |
| `meowload version` | 查看當前版本號 |
| `meowload help` | 查看幫助信息 |