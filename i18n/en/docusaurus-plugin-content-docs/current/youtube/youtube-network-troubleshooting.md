---
title: YouTube download network issues — how to fix them?
sidebar_label: Network troubleshooting
sidebar_position: 4
description: Use Meowload's built-in network test to diagnose and resolve timeouts when downloading YouTube, Instagram, Twitter.
keywords: ["YouTube download not working", "download timeout fix", "network troubleshooting", "YouTube connection issue", "video downloader", "image downloader", "audio downloader", "watermark remover", "online downloader", "video download", "hhmao", "Meowload"]
---

# YouTube download network issues — how to fix them?

When using the [Meowload](https://hhmao.cn/app) desktop app to download from YouTube, Instagram, Twitter, etc., you may run into errors like:

- **Request timeout**
- **Network connection error**
- **Connection timeout**

These usually mean the computer's network can't reach those sites directly. Follow these steps to diagnose and fix.

## Step 1: Run the network test

On the download page, click the **Network test** link in the message. The app opens the Settings → Network page and starts checking connectivity to major sites.

## Step 2: Read the result

In Settings → Network, click **Start test**. The app checks YouTube, Twitter, Instagram, Baidu, etc. one by one:

- ✅ Connected
- ❌ Can't reach

If YouTube / Twitter show ❌, your network can't access them and you likely need a proxy.

## Step 3: Configure a proxy

Meowload defaults to **System proxy**, following the OS proxy settings. Confirm:

1. A proxy tool is installed and running
2. The proxy is set to **System proxy** mode (so all system traffic goes through it)
3. After configuring, return to the network test page, click **Start test** again, and confirm every site is ✅

:::tip
If the proxy is on but the test still fails, verify the proxy works (e.g. open YouTube in your browser) or try a different node.
:::

## Proxy is set but downloads still fail?

- Make sure the proxy is in **System proxy** mode (not just rule mode)
- Try switching nodes and retest
- Confirm the proxy can reach YouTube (verify in the browser)