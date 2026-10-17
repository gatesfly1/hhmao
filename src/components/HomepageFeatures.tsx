import React from 'react';
import clsx from 'clsx';

type Locale = 'zh-CN' | 'zh-TW' | 'en';

const I18N: Record<
  Locale,
  Array<{title: string; description: string}>
> = {
  'zh-CN': [
    {
      title: '万能音视频嗅探',
      description: '内置浏览器支持任意网页资源嗅探，自动识别音乐与视频链接，支持一键批量下载。',
    },
    {
      title: '播放列表/频道下载',
      description:
        '支持 YouTube、Instagram、Twitter、TikTok、Bilibili 等平台作者主页、频道、播放列表和 Hashtag 列表批量解析下载。',
    },
    {
      title: '全网覆盖，1000+ 网站',
      description:
        'YouTube、X、Facebook、TikTok、VKontakte、Instagram、rednote 等主流及小众平台，快速保存。',
    },
    {
      title: '超清画质，8K 无损下载',
      description: '默认下载最高画质，支持 8K、4K、1080P 多分辨率选择，画质无损保存。',
    },
    {
      title: '视频提取音频',
      description: '在线或本地视频一键提取音轨，转为 MP3 或其他音频格式。',
    },
    {
      title: '多链接批量提取',
      description: '一次粘贴最多 20 条帖子链接，系统自动提取资源，批量下载图集与视频。',
    },
  ],
  'zh-TW': [
    {
      title: '萬能音視訊片嗅探',
      description: '內建瀏覽器支援任意網頁資源嗅探，自動識別音樂與影片連結，支援一鍵批次下載。',
    },
    {
      title: '播放清單/頻道下載',
      description:
        '支援 YouTube、Instagram、Twitter、TikTok、Bilibili 等平臺作者主頁、頻道、播放清單與 Hashtag 列表批次解析下載。',
    },
    {
      title: '全網覆蓋，1000+ 網站',
      description:
        'YouTube、X、Facebook、TikTok、VKontakte、Instagram、rednote 等主流及小眾平臺，快速保存。',
    },
    {
      title: '超高畫質，8K 無損下載',
      description: '預設下載最高畫質，支援 8K、4K、1080P 多解析度選擇，畫質無損保存。',
    },
    {
      title: '影片擷取音訊',
      description: '線上或本機影片一鍵擷取音軌，轉為 MP3 或其他音訊格式。',
    },
    {
      title: '多連結批次擷取',
      description: '一次貼上最多 20 則貼文連結，系統自動擷取資源，批次下載圖集與影片。',
    },
  ],
  en: [
    {
      title: 'Universal sniffer',
      description:
        'Built-in browser sniffs any web page, auto-detects music & video links, and supports one-click batch downloads.',
    },
    {
      title: 'Playlists & channels',
      description:
        'Batch parse & download creator pages, channels, playlists, and hashtag feeds from YouTube, Instagram, Twitter, TikTok, Bilibili, and more.',
    },
    {
      title: '1,000+ supported sites',
      description:
        'Mainstream and niche platforms — YouTube, X, Facebook, TikTok, VKontakte, Instagram, rednote — saved fast.',
    },
    {
      title: '8K lossless quality',
      description:
        'Default highest quality with 8K / 4K / 1080P options and bit-for-bit lossless output.',
    },
    {
      title: 'Extract audio',
      description:
        'Pull the audio track from online or local videos and export as MP3 or other formats.',
    },
    {
      title: 'Batch by link list',
      description:
        'Paste up to 20 post links at once and let the system batch-extract videos, albums, and audio.',
    },
  ],
};

function Feature({title, description}: {title: string; description: string}) {
  return (
    <div className={clsx('col col--4')} style={{marginBottom: '2rem', display: 'flex'}}>
      <div
        className="hh-card"
        style={{
          padding: '1.25rem 1.5rem',
          borderRadius: 14,
          background:
            'linear-gradient(135deg, #4f7bff 0%, #6c8cff 60%, #8aa3ff 100%)',
          border: '1px solid rgba(255,255,255,0.10)',
          color: '#ffffff',
          boxShadow: '0 12px 28px -12px rgba(79, 123, 255, 0.45)',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h3 style={{marginTop: 0}}>{title}</h3>
        <p
          style={{
            marginBottom: 0,
            color: 'rgba(255,255,255,0.88)',
            flex: 1,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.ReactElement {
  const locale = (typeof document !== 'undefined'
    ? document.documentElement.lang
    : 'zh-CN') as Locale;
  const items = I18N[locale] ?? I18N['zh-CN'];
  return (
    <section style={{padding: '3rem 0'}}>
      <div className="container">
        <div className="row">
          {items.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}