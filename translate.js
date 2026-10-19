// 用 OpenCC 做简体→繁体（s2tw），再用英文模板生成英文版
const fs = require('fs');
const path = require('path');
const OpenCC = require('opencc');

const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs');
const OUT_TW = path.join(ROOT, 'i18n', 'zh-TW', 'docusaurus-plugin-content-docs', 'current');
const OUT_EN = path.join(ROOT, 'i18n', 'en', 'docusaurus-plugin-content-docs', 'current');

const cc = new OpenCC('s2tw.json');

// 英文模板（同上一版）
const EN = {
  'intro.md': `---
title: Introduction
sidebar_position: 1
slug: /
---

# Download Videos, Albums, and Audio from Any Site

## Save from 1,000+ websites — videos, images, and music

hhmao is an online video, album, and audio extractor. It covers 1,000+ sites including YouTube, Bilibili, Twitter, TikTok, and Instagram.

No install needed. Just paste a link.

import HomepageHeader from '@site/src/components/HomepageHeader';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

<HomepageHeader />
<HomepageFeatures />

## Three steps to get started

1. Find the post you want to save, then copy the post link from the share options
2. Paste the link into the input box above and click "Extract single link"
3. Pick a video quality or audio language, and download whatever format you need
`,
  'supported-websites.md': `---
title: Supported sites
sidebar_position: 100
---

# Supported sites

Coverage spans the major platforms across the web — easily download every video, audio track, and image.

## Videos & albums

- [YouTube](/platforms/youtube-video-downloader)
- [Sora](/platforms/sora-video-downloader)
- [Instagram](/platforms/instagram-video-downloader)
- [Twitter](/platforms/twitter-video-downloader)
- [TikTok](/platforms/tiktok-video-downloader)
- [Threads](/platforms/threads-video-downloader)
- [Facebook](/platforms/facebook-video-downloader)
- Vimeo
- afreecatv
- Tumblr
- Likee
- Dailymotion
- [Twitch](/platforms/twitch-video-downloader)
- Snapchat
- [Pinterest](/platforms/pinterest-video-downloader)
- [Reddit](/platforms/reddit-video-downloader)
- LinkedIn
- [Bilibili](/platforms/bilibili-video-downloader)
- [Weibo](/platforms/weibo-video-downloader)
- [rednote](/platforms/xiaohongshu-video-downloader)
- [VK](/platforms/vk-video-downloader)

## Audio

- SoundCloud
- Suno
- NetEase Cloud Music

## Albums / others

- Lemon8, Tmall, Xianyu, UC Video, Qutoutiao, Pipixia, Meitu, and other regional sites.

Coverage is updated weekly — see the changelog for details.
`,
};

function enPlatform(name) {
  return `---
title: Download from ${name}
sidebar_label: ${name}
sidebar_position: 1
description: Download videos, albums, and audio from ${name} — original quality, free, no signup.
---

# Download videos & albums from ${name}

Save videos, albums, or audio tracks from ${name} with hhmao. Original quality, free, no signup required.

## Steps

1. Open the post you want to save on ${name}
2. Use **Share → Copy link**
3. Come back to hhmao, paste the link in the input box, and click **Start extraction**
4. Pick a quality or audio format and save it locally

## What's supported

- Public videos
- Public albums (every original image)
- Background music attached to the post (as a standalone audio item)

## Limits

- Private accounts, login-gated, or membership-only content can't be extracted
- Region-locked content may fail
- Source links typically expire in tens of minutes to a few hours — re-extract if they do
`;
}

const EN_DIR = {
  'quickstart/single-link.md': `---
title: Single link extraction
sidebar_position: 1
---

# Single link extraction

Paste one post link and the system parses it for original-quality videos, albums, or audio.

## Steps

1. Open the post you want to save in the target app or web page and tap **Share → Copy link**
2. Go back to hhmao's homepage and paste the link into the input box at the top
3. Click **Extract single link**
4. Once parsing finishes, choose a quality or MP3 and save it locally

## Supported link formats

- Mobile share links (utm_source / share_token etc. are also recognized)
- Desktop URLs
- Short links (t.co / youtu.be / b23.tv, etc.)

## Supported platforms

Almost every platform listed on hhmao supports single-link extraction.
`,
  'quickstart/batch.md': `---
title: Batch by link list
sidebar_position: 2
---

# Batch by link list

Paste up to 20 post links at once — the system automatically parses them in order and queues album and video downloads.

## How to use

1. Open **Batch by link list** on the homepage
2. Paste one link per line
3. Click **Start batch parse**
4. After it finishes, pick the items you want and download them

## When to use it

- Pack multiple works from the same creator
- Collect cross-platform material on the same topic
- Back up favorite content in case it gets removed

## Notes

- Up to 20 links per batch
- One failure won't block the others
- Some platforms throttle short bursts — wait and retry if many items fail
`,
  'quickstart/md5.md': `---
title: Batch MD5 rewrite
sidebar_position: 3
---

# Batch MD5 rewrite

Rewrite the file hashes of downloaded videos or images so platforms can't recognize them as duplicates.

## When to use it

- Multi-account matrix distribution of the same material
- Re-uploading backed-up content past risk control
- Automated content production pipelines

## Steps

1. Pick a local folder as input
2. Pick an output folder (can be the same — files will be auto-renamed)
3. Click **Start rewriting**

Original videos or albums are not corrupted — only the file-level byte content is rewritten.
`,
  'quickstart/audio-extract.md': `---
title: Video to audio
sidebar_position: 4
---

# Video to audio

Pull the audio track out of online videos in one click, or transcode local videos to MP3 / M4A / WAV.

## Online extraction

Open any platform page and use **Extract single link** with **Keep audio only** checked to get just the audio without downloading the whole video.

## Local transcoding

1. Open **Video to audio** in the desktop client
2. Pick a local video file (mp4 / mov / mkv / webm)
3. Pick the target format and bitrate
4. Save to the destination folder

## When to use it

- Pull audio tracks from lectures or podcasts
- Convert music videos to MP3 for offline listening
- Build a stock library for editing
`,
  'client/windows.md': `---
title: Windows client
sidebar_position: 1
---

# Download for Windows

For Windows 10 (64-bit) and above.

## Main features

- One-click batch download
- Built-in browser resource sniffer
- Batch audio & video editing
- Resumable downloads
- Auto sort by creator / platform

## Install

Get the latest installer from the [download page](https://hhmao.cn/app) and follow the prompts.
`,
  'client/mac.md': `---
title: macOS client
sidebar_position: 2
---

# Download for Mac

For macOS 10.13 and above.

## Main features

- One-click batch download
- Built-in browser resource sniffer
- Batch audio & video editing
- Resumable downloads
- Auto sort by creator / platform

## Install

Get the latest `.dmg` from the [download page](https://hhmao.cn/app) and drag it into Applications.
`,
};

const FEATURES = {
  sniffer: `---
title: Universal sniffer
sidebar_position: 1
---

# Universal sniffer

A built-in browser sniffs any web page, auto-detects music & video links, and supports one-click batch download — if it can play, it can save.

## How it works

Open the built-in browser on any web page; the sniffer module watches network requests and identifies audio / video streams by file type and byte range, then lists downloadable resources.

## Typical uses

- Open a web video site → sniff → batch download
- Grab embedded mp4 / m3u8 while browsing forum posts
- Cache in the background while playing online
`,
  'playlist-channel': `---
title: Playlist & channel downloads
sidebar_position: 2
---

# Playlist & channel downloads

Supports batch parsing & download of creator pages, channels, playlists, and hashtag feeds on YouTube, Instagram, Twitter, TikTok, Bilibili, and more — automatically pulling in every work.

## Creator-page batch

Paste a creator page URL, choose page count or **all**, and the system retrieves every public post in publish order.

## Playlists

Structured lists like YouTube playlists and Bilibili favorites are detected as playlists and downloaded in their original order.

## Hashtags

#hashtag pages on TikTok, Instagram, and Twitter can also be batch-parsed. Note that platforms limit what a hashtag page shows — trending is not the same as everything.
`,
  coverage: `---
title: 1,000+ sites
sidebar_position: 3
---

# 1,000+ sites supported

Covers mainstream and niche platforms — YouTube, X, Facebook, TikTok, VKontakte, Instagram, rednote, and many more — for videos, audio, and albums.

## Mainstream

YouTube, X / Twitter, Facebook, Instagram, TikTok, Twitch, Reddit, Pinterest, Bilibili, Weibo, rednote, and more.

## Niche

VKontakte, Threads, Sora, afreecatv, Dailymotion, Likee, Tumblr, Snapchat, LinkedIn, SoundCloud, and more.

## Always growing

The coverage matrix updates weekly — new platforms are noted in the changelog.
`,
  quality: `---
title: High quality
sidebar_position: 4
---

# Up to 8K lossless download

The default is the highest quality — with 8K / 4K / 1080P options to switch between, perfect for editing and high-quality viewing.

## Quality tiers

After parsing, every available tier (8K / 4K / 1440p / 1080p / 720p / 480p) is listed. Switch freely based on bandwidth and storage.

## Audio languages

Some platforms carry multiple audio tracks (e.g. original Japanese + Mandarin dub). Choose as needed.

## Merging

The highest tier is sometimes split audio + video streams. The client auto-merges them with ffmpeg into a single mp4 if you check the merge option.
`,
  'audio-extract': `---
title: Extract audio
sidebar_position: 5
---

# Extract audio from videos

Pull the audio track out of online or local videos in one click — export as MP3 or other formats.

## Online extraction

Open any platform page and use **Extract single link** with **Keep audio only** checked.

## Local extraction

The desktop client can pick local videos and transcode them straight to MP3 / M4A / WAV.

## Use cases

- Stock library reuse for editing
- Offline playback
- Republishing podcasts or talks
`,
  'batch-links': `---
title: Batch by link list
sidebar_position: 6
---

# Batch by link list

Paste up to 20 post links at once — the system auto-extracts and queues albums & videos.

## vs. creator-page batch

- **Link list**: each link is an independent post from different creators or content
- **Creator-page batch**: give a creator page and retrieve every public item page by page

## Troubleshooting

Failed entries are flagged with a reason and can be retried individually. Successful entries are not affected.
`,
};

const FAQ = {
  watermark: `---
title: Does the extracted video have a watermark?
sidebar_position: 1
---

# Does the extracted video have a watermark?

No. We get the original file from the source — no re-encoding, no watermark from the platform or us.
`,
  install: `---
title: Do I need to install software or a browser extension?
sidebar_position: 2
---

# Do I need to install software or a browser extension?

No. Paste a link and you're done — it all runs in the browser.

If you want batch processing, resumable downloads, or auto file organization, then consider the desktop client. It's optional, not required.
`,
  quality: `---
title: Can I choose quality and format myself?
sidebar_position: 3
---

# Can I choose quality and format myself?

Yes. After parsing, every available quality and audio/video format is listed. Pick whichever you want.

For some sites, the highest tier is split audio + video — if you select it, the system will prompt for merging.
`,
  'album-audio': `---
title: Can I extract albums and audio, not just videos?
sidebar_position: 4
---

# Can I extract albums and audio, not just videos?

Yes. Albums list every original image separately. Background music attached to notes or posts shows up as its own audio entry — no need to capture it yourself.
`,
  private: `---
title: Can I extract private accounts or members-only content?
sidebar_position: 5
---

# Can I extract private accounts or members-only content?

No. If a login, follow, payment, or membership is needed to see it, we can't see it either. These links will return a failure rather than a broken file.
`,
  expiry: `---
title: Do extracted download links expire?
sidebar_position: 6
---

# Do extracted download links expire?

Yes. The listed links are direct source links — they typically expire in tens of minutes to a few hours. Download quickly after parsing.

Re-parse if they expire — no extra charge.
`,
  batch: `---
title: Can I process multiple links at once?
sidebar_position: 7
---

# Can I process multiple links at once?

Yes. The link-list feature lets you paste a batch at once. Creator-page batch lets you give one author page and pull every public post page by page.
`,
  failure: `---
title: What are the common reasons extraction fails?
sidebar_position: 8
---

# What are the common reasons extraction fails?

In rough order of frequency:

1. The creator has deleted or made the content private
2. The link is a search or home page, not a specific post
3. The platform for that item isn't supported yet
4. The content is region-locked

Try another public link on the same platform to tell whether the problem is the link or the platform.
`,
};

function listMdFiles(d) {
  const out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...listMdFiles(p));
    else if (e.name.endsWith('.md') || e.name.endsWith('.mdx')) out.push(p);
  }
  return out;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function relPath(abs) {
  return path.relative(DOCS, abs).replace(/\\/g, '/');
}

function enContentFor(rel) {
  if (EN[rel]) return EN[rel];
  const base = path.basename(rel);
  const dir = path.dirname(rel);
  if (dir === 'quickstart') return EN_DIR['quickstart/' + base];
  if (dir === 'client') return EN_DIR['client/' + base];
  if (dir === 'features') return FEATURES[base.replace('.md', '')] ?? null;
  if (dir === 'faq') return FAQ[base.replace('.md', '')] ?? null;
  if (dir === 'platforms') {
    const m = base.match(/^([a-z]+)-video-downloader\.md$/);
    if (m) {
      const NAMES = {
        youtube:'YouTube', bilibili:'Bilibili', twitter:'Twitter / X', tiktok:'TikTok',
        instagram:'Instagram', facebook:'Facebook', threads:'Threads', sora:'Sora',
        reddit:'Reddit', pinterest:'Pinterest', twitch:'Twitch', soundcloud:'SoundCloud',
        snapchat:'Snapchat', vimeo:'Vimeo', tumblr:'Tumblr', dailymotion:'Dailymotion',
        likee:'Likee', linkedin:'LinkedIn', vk:'VK', weibo:'Weibo', xiaohongshu:'rednote',
      };
      return enPlatform(NAMES[m[1]] || m[1]);
    }
  }
  return null;
}

const files = listMdFiles(DOCS);
let tw = 0, en = 0, skipped = 0;

for (const abs of files) {
  const rel = relPath(abs);
  const src = fs.readFileSync(abs, 'utf8');

  // 繁体（OpenCC s2tw）
  const twText = cc.convertSync(src);
  const twOut = path.join(OUT_TW, rel);
  ensureDir(path.dirname(twOut));
  fs.writeFileSync(twOut, twText, 'utf8');
  tw++;

  // 英文
  const enText = enContentFor(rel);
  if (enText) {
    const enOut = path.join(OUT_EN, rel);
    ensureDir(path.dirname(enOut));
    fs.writeFileSync(enOut, enText, 'utf8');
    en++;
  } else {
    skipped++;
  }
}

console.log(`zh-TW: ${tw} files`);
console.log(`en:    ${en} files`);
console.log(`skipped (no EN template): ${skipped}`);