import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function HomepageHeader(): React.ReactElement {
  const {siteConfig, i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const heroImage = useBaseUrl('/img/multi-link-zh.png');

  // 不同语言下 hero 描述
  const description =
    locale === 'en'
      ? 'Download videos, images, and music from 1,000+ websites. Just paste a link — free, no signup.'
      : locale === 'zh-TW'
        ? '支援從 1000+ 網站下載影片、圖片與音樂。貼上連結即可使用，免費、無需註冊。'
        : '支持从 1000+ 网站下载视频、图片和音乐。粘贴链接即可使用，免费、无需注册。';

  // 不同语言下 hero 标题（siteConfig.title 在繁体/英文下仍是简体，做语言分支）
  const heading =
    locale === 'en' ? 'hhmao' : siteConfig.title;

  return (
    <header className="hero hero--primary" style={{padding: '4rem 0 3rem'}}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hh-hero-grid"
        >
          <div>
            <h1
              className="hero__title"
              style={{marginBottom: '0.75rem', color: '#000000'}}
            >
              {heading}
            </h1>
            <p
              className="hero__subtitle"
              style={{color: '#000000'}}
            >
              {siteConfig.tagline}
            </p>
            <p
              style={{
                color: '#333740',
                maxWidth: 560,
                margin: '0 0 1.5rem',
              }}
            >
              {description}
            </p>
            <div>
              <Link
                className="button button--primary button--lg"
                to="/quickstart/single-link"
              >
                {locale === 'en'
                  ? 'Get started →'
                  : locale === 'zh-TW'
                    ? '開始使用 →'
                    : '开始使用 →'}
              </Link>
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <img
              src={heroImage}
              alt="多链接批量提取界面预览"
              loading="eager"
              style={{
                width: '100%',
                maxWidth: 560,
                height: 'auto',
                borderRadius: 16,
                boxShadow:
                  '0 30px 60px -20px rgba(108, 140, 255, 0.35), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}