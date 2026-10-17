---
title: How to keep downloaded files in order?
sidebar_label: Keep file order
sidebar_position: 2
description: 'Two ways to preserve order in batch downloads: sort by modification time or prefix filenames with sequence numbers.'
---

# How to keep downloaded files in order?

Keeping the file order after batch downloads matters for organization and review. Meowload provides two ways.

## Option 1: Sort by file modification time (default)

No setup needed. Files are saved with the modification time set to match their order in the extraction results table. Sort the folder by "Date modified" (newest first) and the order matches the table (default: most-recently published first).

## Option 2: Prefix filenames with sequence numbers

If you enable "Add sequence number to filename" in the app settings, every saved file is named with the index matching its row in the results table. After the download completes, simply sort by filename.

### FAQ: Why aren't the numbers consecutive when I only download videos?

**Reason:** The sequence number corresponds to the row index in the results table. When you click "Only download videos", the table still contains other types (audio, images, subtitles, etc.), so the video files have gaps in their numbering.

**Solution:**

1. In the extraction table, use the "Type filter" feature
2. Choose to show only videos
3. After filtering, the video rows are renumbered consecutively
4. Click "Download all" — the downloaded videos will now have consecutive numbers