---
title: MeowLoad CLI
sidebar_label: CLI
sidebar_position: 1
description: Since v3.9.9, Meowload ships the meowload CLI for downloading videos, audio, images, live streams, and subtitles from the terminal.
keywords: ["MeowLoad CLI", "command line video downloader", "download video from terminal", "CLI batch downloader", "video downloader", "image downloader", "audio downloader", "watermark remover", "online downloader", "video download", "hhmao", "Meowload"]
---

# MeowLoad CLI

Starting with **v3.9.9**, Meowload includes the `meowload` command-line tool so you can download videos, audio, images, live streams, and subtitles directly from the terminal — perfect for command-line fans or scripts that need to integrate downloading.

## How it works

The `meowload` CLI talks to the Meowload desktop app to perform tasks. When you run `info` or `download` in the terminal, the CLI automatically launches the desktop app (if it isn't already running), which then parses and downloads the resource.

The CLI requires the Meowload desktop app to be installed and you must be signed in.

## System requirements

| OS | Supported |
|---|---|
| macOS | ✅ Supported |
| Windows | ✅ Supported |

The CLI is bundled with the desktop app — no separate install. If you don't have the desktop app yet, get it from the [download page](https://hhmao.cn/app).

## Verify the install

After installing the desktop app, open a terminal and run:

```bash
meowload version
```

If installed correctly, it prints the current version:

```json
{"version":"3.9.9"}
```

## Quick start

### Download resources

Use `download` to grab all media in a link:

```bash
meowload download https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

Only video:

```bash
meowload download https://www.youtube.com/watch?v=dQw4w9WgXcQ --media_type video
```

Only audio and images:

```bash
meowload download https://www.youtube.com/watch?v=dQw4w9WgXcQ --media_type audio,image
```

### Inspect a link

Use `info` to see what media is available at a URL:

```bash
meowload info https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

## Command list

| Command | Description |
|---|---|
| `meowload download` | Download the media in a link |
| `meowload info` | Inspect the available media in a link |
| `meowload convert` | Convert media files (video / audio / image) |
| `meowload md5` | Modify a file's MD5 hash |
| `meowload completion` | Generate a shell autocompletion script |
| `meowload version` | Print the current version |
| `meowload help` | Show help |