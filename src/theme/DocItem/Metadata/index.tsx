import React, {type ReactNode} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Head from '@docusaurus/Head';

/**
 * Swizzle DocItem/Metadata：注入当前文档专属的 JSON-LD。
 * - id 以 platforms/ 开头的：注入 HowTo + FAQPage
 * - 其他文档：注入 Article
 */
export default function DocItemMetadata(): React.ReactElement {
  const {metadata, frontMatter, assets} = useDoc();
  const {id} = metadata;

  const isPlatform = id.startsWith('platforms/');
  // 把 id（如 platforms/youtube-video-downloader）转成可读名
  const platformName = isPlatform
    ? id
        .replace(/^platforms\//, '')
        .replace(/-video-downloader$/, '')
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
    : '';
  const prettyName =
    platformName === 'xiaohongshu'
      ? 'rednote'
      : platformName === 'vk'
        ? 'VKontakte'
        : platformName === 'weibo'
          ? 'Weibo'
          : platformName;

  const url = `https://hhmao.cn/${id.replace(/^platforms\//, 'platforms/')}`;

  const howTo = isPlatform
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `如何下载 ${prettyName} 视频`,
        description: frontMatter.description ?? '',
        totalTime: 'PT1M',
        tool: [{'@type': 'HowToTool', name: 'hhmao (哼哼猫去水印)'}],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: '复制链接',
            text: `在 ${prettyName} 上打开你想保存的帖子，使用「分享」并复制链接。`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: '粘贴到 hhmao',
            text: '回到本页顶部搜索框，粘上链接并点击「开始解析」。',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: '选择清晰度下载',
            text: '解析完成后挑选需要的画质或 MP3，保存到本地。',
          },
        ],
      }
    : null;

  const faqPage = isPlatform
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `下载的 ${prettyName} 视频会带水印吗？`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: '不。hhmao 拿到的是源站原始文件，没有二次压制、没有任何叠加水印。',
            },
          },
          {
            '@type': 'Question',
            name: `${prettyName} 私密账号的内容能下载吗？`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: '不能。需登录或付费才能看到的内容我们同样无法访问，链接会返回失败。',
            },
          },
          {
            '@type': 'Question',
            name: `${prettyName} 直链有有效期吗？`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: '源站提供的直链通常几十分钟到几小时会失效，重新解析即可。',
            },
          },
        ],
      }
    : null;

  return (
    <>
      <PageMetadata
        title={metadata.title}
        description={metadata.description}
        keywords={frontMatter.keywords}
        image={assets.image ?? frontMatter.image}
      />
      {howTo && (
        <Head>
          <script type="application/ld+json">{JSON.stringify(howTo)}</script>
          <script type="application/ld+json">{JSON.stringify(faqPage)}</script>
        </Head>
      )}
    </>
  );
}