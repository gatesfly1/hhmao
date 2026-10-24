/**
 * Swizzle DocCategoryGeneratedIndexPage：为分类索引页补齐按语言区分的 SEO keywords。
 * Docusaurus 默认从 sidebars.ts 读取 category.link.keywords，全站共用一套，
 * 这里按当前 locale 生成对应语言的关键词。
 */
import React, {type ReactNode} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useCurrentSidebarCategory} from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Heading from '@theme/Heading';
import type {Props} from '@theme/DocCategoryGeneratedIndexPage';

import styles from './styles.module.css';

const CATEGORY_KEYWORDS: Record<string, {zh: string[]; tw: string[]; en: string[]}> = {
  'video-downloads': {
    zh: [
      '批量下载视频',
      '多链接批量保存',
      '一次性下载多个视频',
      '批量下载图片音频',
      '视频下载',
      '批量下载',
      'hhmao',
      '哼哼猫去水印',
    ],
    tw: [
      '批次下載影片',
      '多連結批次儲存',
      '一次下載多支影片',
      '批次下載圖片音訊',
      '影片下載',
      '批次下載',
      'hhmao',
      '哼哼貓去水印',
    ],
    en: [
      'bulk video downloader',
      'batch save video audio images',
      'download many videos at once',
      'video downloader',
      'bulk download',
      'hhmao',
      'Meowload',
    ],
  },
  'livestream-recording': {
    zh: [
      '录制直播',
      'Twitch直播录制',
      'Kick直播录制',
      '直播回放下载',
      '直播录屏下载',
      'hhmao',
      '哼哼猫去水印',
    ],
    tw: [
      '錄製直播',
      'Twitch直播錄製',
      'Kick直播錄製',
      '直播回放下載',
      '直播錄影下載',
      'hhmao',
      '哼哼貓去水印',
    ],
    en: [
      'record live stream',
      'Twitch live recording',
      'Kick live recording',
      'live VOD download',
      'livestream recorder',
      'hhmao',
      'Meowload',
    ],
  },
  'browser-extension': {
    zh: [
      '浏览器插件下载视频',
      '安装浏览器插件',
      '网页视频嗅探下载',
      '电商产品视频下载',
      '微信公众号视频下载',
      '小红书批量保存',
      'hhmao',
      '哼哼猫去水印',
    ],
    tw: [
      '瀏覽器外掛下載影片',
      '安裝瀏覽器外掛',
      '網頁影片嗅探下載',
      '電商產品影片下載',
      '微信公眾號影片下載',
      '小紅書批次儲存',
      'hhmao',
      '哼哼貓去水印',
    ],
    en: [
      'browser extension video downloader',
      'install browser extension',
      'sniff video from any website',
      'e-commerce product video download',
      'WeChat article video download',
      'batch save Xiaohongshu posts',
      'hhmao',
      'Meowload',
    ],
  },
  youtube: {
    zh: [
      'YouTube视频下载',
      'YouTube字幕下载',
      'YouTube播放列表下载',
      'YouTube批量下载',
      '绕过403下载YouTube',
      'YouTube下载失败怎么办',
      'hhmao',
      '哼哼猫去水印',
    ],
    tw: [
      'YouTube影片下載',
      'YouTube字幕下載',
      'YouTube播放清單下載',
      'YouTube批次下載',
      '繞過403下載YouTube',
      'YouTube下載失敗怎麼辦',
      'hhmao',
      '哼哼貓去水印',
    ],
    en: [
      'YouTube video downloader',
      'YouTube subtitle download',
      'YouTube playlist download',
      'YouTube batch download',
      'bypass 403 YouTube download',
      'YouTube download troubleshooting',
      'hhmao',
      'Meowload',
    ],
  },
};

function DocCategoryGeneratedIndexPageMetadata({
  categoryGeneratedIndex,
}: Props): ReactNode {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const lang = locale === 'en' ? 'en' : locale === 'zh-TW' ? 'tw' : 'zh';

  // 从 permalink 末段取分类 slug（如 /video-downloads）
  const slug = categoryGeneratedIndex.permalink.replace(/\/$/, '').split('/').pop() ?? '';

  const localized = CATEGORY_KEYWORDS[slug];
  const keywords = localized
    ? [...new Set([...localized[lang], ...(categoryGeneratedIndex.keywords ?? [])])]
    : categoryGeneratedIndex.keywords;

  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}>
      <meta
        name="robots"
        content="index,follow,max-image-preview:large,max-snippet:-1"
      />
    </PageMetadata>
  );
}

function DocCategoryGeneratedIndexPageContent({
  categoryGeneratedIndex,
}: Props): ReactNode {
  const category = useCurrentSidebarCategory();
  return (
    <div className={styles.generatedIndexPage}>
      <DocVersionBanner />
      <DocBreadcrumbs />
      <DocVersionBadge />
      <header>
        <Heading as="h1" className={styles.title}>
          {categoryGeneratedIndex.title}
        </Heading>
        {categoryGeneratedIndex.description && (
          <p>{categoryGeneratedIndex.description}</p>
        )}
      </header>
      <article className="margin-top--lg">
        <DocCardList items={category.items} className={styles.list} />
      </article>
      <footer className="margin-top--md">
        <DocPaginator
          previous={categoryGeneratedIndex.navigation.previous}
          next={categoryGeneratedIndex.navigation.next}
        />
      </footer>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props: Props): ReactNode {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
