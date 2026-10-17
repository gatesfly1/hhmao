---
title: MeowLoad CLI 命令行工具
sidebar_label: CLI 命令行
sidebar_position: 1
description: 哼哼猫自 v3.9.9 起新增 meowload CLI，可在终端下载视频、音频、图片、直播流、字幕等资源。
---

# MeowLoad CLI 命令行工具

哼哼猫自 **v3.9.9** 版本起新增了命令行工具 `meowload`，让你可以直接在终端中下载视频、音频、图片、直播流、字幕等资源，适合喜欢命令行操作或需要在脚本中集成下载能力的用户。

## 工作原理

`meowload` CLI 通过与哼哼猫桌面软件通信来执行任务。当你在终端执行 `info` 或 `download` 命令时，CLI 会自动启动桌面软件（如果软件未启动），并由桌面软件完成资源的解析和下载。

CLI 需要搭配哼哼猫桌面软件使用，使用前请确保已在桌面软件中登录账号。

## 系统要求

| 系统 | 支持情况 |
|---|---|
| macOS | ✅ 支持 |
| Windows | ✅ 支持 |

CLI 随桌面软件一起安装，无需单独下载。如果你还没有安装哼哼猫桌面软件，请前往 [下载页面](https://hhmao.cn/app) 获取。

## 验证安装

安装桌面软件后，打开终端输入以下命令，确认 CLI 已正确安装：

```bash
meowload version
```

如果安装成功，会输出当前桌面软件版本号：

```json
{"version":"3.9.9"}
```

## 快速上手

### 下载资源

使用 `download` 命令下载链接中的所有媒体资源：

```bash
meowload download https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

只下载视频：

```bash
meowload download https://www.youtube.com/watch?v=dQw4w9WgXcQ --media_type video
```

只下载音频和图片：

```bash
meowload download https://www.youtube.com/watch?v=dQw4w9WgXcQ --media_type audio,image
```

### 查询资源信息

使用 `info` 命令查看某个链接包含的媒体资源：

```bash
meowload info https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

## 命令列表

| 命令 | 说明 |
|---|---|
| `meowload download` | 下载链接中的媒体资源 |
| `meowload info` | 查询链接中可用的媒体资源 |
| `meowload convert` | 转换媒体文件格式（视频 / 音频 / 图片） |
| `meowload md5` | 修改文件的 MD5 哈希值 |
| `meowload completion` | 生成 Shell 自动补全脚本 |
| `meowload version` | 查看当前版本号 |
| `meowload help` | 查看帮助信息 |