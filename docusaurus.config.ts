import type {Config} from '@docusaurus/types';
import {themes as prismThemes} from 'prism-react-renderer';

const SITE_URL = 'https://docs.hhmao.cn';

const config: Config = {
  title: '哼哼猫去水印',
  tagline: '全网视频 / 图集 / 音频 下载',
  favicon: 'img/logo.svg',

  url: SITE_URL,
  baseUrl: '/',

  organizationName: 'hhmao',
  projectName: 'hhmao-docs',

  headTags: [
    {tagName: 'link', attributes: {rel: 'manifest', href: '/manifest.webmanifest'}},
    {tagName: 'link', attributes: {rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'hhmao LLM 摘要'}},
    {tagName: 'meta', attributes: {name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1'}},
    {tagName: 'meta', attributes: {name: 'googlebot', content: 'index,follow'}},
    {tagName: 'meta', attributes: {name: 'referrer', content: 'strict-origin-when-cross-origin'}},
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '哼哼猫去水印',
        alternateName: 'hhmao',
        url: SITE_URL,
        logo: `${SITE_URL}/img/logo.svg`,
      }),
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '哼哼猫去水印',
        description: '全网视频 / 图集 / 音频 下载',
        url: SITE_URL,
        inLanguage: ['zh-CN', 'zh-TW', 'en'],
      }),
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: '哼哼猫去水印',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Windows 10+, macOS 10.13+',
        description: '支持从 1000+ 网站下载原始画质视频、图集和音频，免费、无需注册。',
        offers: {'@type': 'Offer', price: '0', priceCurrency: 'CNY'},
        url: SITE_URL,
      }),
    },
  ],

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'zh-TW', 'en'],
    localeConfigs: {
      'zh-CN': {label: '简体中文', htmlLang: 'zh-CN'},
      'zh-TW': {label: '繁體中文', htmlLang: 'zh-Hant'},
      en: {label: 'English', htmlLang: 'en'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies import('@docusaurus/preset-classic').PresetOptions,
    ],
  ],

  themeConfig: {
    image: 'img/og-cover.svg',
    metadata: [
      {name: 'theme-color', content: '#6c8cff'},
      {name: 'application-name', content: '哼哼猫去水印'},
      {name: 'apple-mobile-web-app-title', content: '哼哼猫去水印'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'},
      {name: 'format-detection', content: 'telephone=no'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '哼哼猫去水印',
      logo: {alt: '哼哼猫去水印', src: 'img/logo.svg'},
      items: [
        {type: 'docSidebar', sidebarId: 'mainSidebar', position: 'left'},
        {to: '/supported-websites', label: '支持平台', position: 'left'},
        {to: '/faq/watermark', label: '常见疑问', position: 'left'},
        {
          type: 'custom-NavbarBackHome',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '下载',
          items: [
            {label: 'Windows 客户端', to: '/client/windows'},
            {label: 'Mac 客户端', to: '/client/mac'},
          ],
        },
        {
          title: '支持平台',
          items: [
            {label: 'YouTube', to: '/platforms/youtube-video-downloader'},
            {label: 'Bilibili', to: '/platforms/bilibili-video-downloader'},
            {label: '查看全部', to: '/supported-websites'},
          ],
        },
        {
          title: '文档',
          items: [
            {label: '快速上手', to: '/'},
            {label: '常见疑问', to: '/faq/watermark'},
            {label: '支持的网站', to: '/supported-websites'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} hhmao`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies import('@docusaurus/preset-classic').ThemeConfig,
};

export default config;