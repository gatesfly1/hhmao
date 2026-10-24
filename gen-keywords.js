// 给所有 md 注入 SEO keywords frontmatter（按页面类型 + 语言定制）
// 用法：node gen-keywords.js
// 幂等：先移除已有 keywords 再重新注入
const fs = require('fs');
const path = require('path');
const OpenCC = require('opencc');

const ROOT = process.cwd();
const cc = new OpenCC('s2tw.json');

// ---------- 平台关键词 ----------
const PLATFORM = {
  youtube: {
    zh: ['YouTube视频下载', 'YouTube下载器', 'YouTube音频下载', 'YT下载', 'YouTube mp3下载', 'YouTube字幕下载', 'YouTube批量下载'],
    en: ['YouTube video downloader', 'download from YouTube', 'YouTube audio downloader', 'YT download', 'YouTube mp3 download', 'YouTube subtitle download', 'YouTube batch download'],
  },
  bilibili: {
    zh: ['B站视频下载', '哔哩哔哩下载', 'Bilibili下载器', 'B站缓存视频下载', 'B站音频提取', 'B站番剧下载'],
    en: ['Bilibili video downloader', 'B站 video download', 'download from Bilibili', 'Bilibili audio extractor', 'Bilibili cache download'],
  },
  twitter: {
    zh: ['Twitter视频下载', 'X视频下载', '推特视频下载', 'twitter下载器', '推特高清下载'],
    en: ['Twitter video downloader', 'X video download', 'download from Twitter', 'Twitter HD download'],
  },
  tiktok: {
    zh: ['TikTok视频下载', '抖音国际版下载', 'TikTok无水印下载', 'tiktok下载器', 'TikTok音乐下载'],
    en: ['TikTok video downloader', 'TikTok no watermark download', 'download from TikTok', 'TikTok mp3 download'],
  },
  instagram: {
    zh: ['Instagram视频下载', 'ins视频下载', 'Instagram图集下载', 'IG reels下载', 'ins照片下载'],
    en: ['Instagram video downloader', 'Instagram reels download', 'download from Instagram', 'Instagram photo downloader'],
  },
  facebook: {
    zh: ['Facebook视频下载', 'fb视频下载', 'FB Reels下载', 'facebook下载器'],
    en: ['Facebook video downloader', 'FB reels download', 'download from Facebook'],
  },
  threads: {
    zh: ['Threads视频下载', 'threads下载器'],
    en: ['Threads video downloader', 'download from Threads'],
  },
  sora: {
    zh: ['Sora视频下载', 'OpenAI视频下载', 'sora下载器'],
    en: ['Sora video downloader', 'OpenAI Sora download', 'download from Sora'],
  },
  reddit: {
    zh: ['Reddit视频下载', 'reddit下载器'],
    en: ['Reddit video downloader', 'download from Reddit'],
  },
  pinterest: {
    zh: ['Pinterest图片下载', 'Pinterest视频下载', 'pinterest下载器'],
    en: ['Pinterest video downloader', 'Pinterest image downloader', 'download from Pinterest'],
  },
  twitch: {
    zh: ['Twitch视频下载', 'twitch直播回放下载', 'Twitch下载器'],
    en: ['Twitch video downloader', 'Twitch VOD download', 'download from Twitch'],
  },
  soundcloud: {
    zh: ['SoundCloud音乐下载', 'soundcloud下载器', 'SC音乐下载'],
    en: ['SoundCloud music downloader', 'download from SoundCloud', 'SoundCloud mp3 download'],
  },
  snapchat: {
    zh: ['Snapchat视频下载', 'snapchat下载器'],
    en: ['Snapchat video downloader', 'download from Snapchat'],
  },
  vimeo: {
    zh: ['Vimeo视频下载', 'vimeo下载器'],
    en: ['Vimeo video downloader', 'download from Vimeo'],
  },
  tumblr: {
    zh: ['Tumblr视频下载', 'tumblr图集下载'],
    en: ['Tumblr video downloader', 'Tumblr image downloader', 'download from Tumblr'],
  },
  dailymotion: {
    zh: ['Dailymotion视频下载', 'dailymotion下载器'],
    en: ['Dailymotion video downloader', 'download from Dailymotion'],
  },
  likee: {
    zh: ['Likee视频下载', 'likee下载器'],
    en: ['Likee video downloader', 'download from Likee'],
  },
  linkedin: {
    zh: ['LinkedIn视频下载', '领英视频下载', 'linkedin下载器'],
    en: ['LinkedIn video downloader', 'download from LinkedIn'],
  },
  vk: {
    zh: ['VK视频下载', 'VKontakte下载', 'vk下载器'],
    en: ['VK video downloader', 'VKontakte download', 'download from VK'],
  },
  weibo: {
    zh: ['微博视频下载', '微博图集下载', '微博下载器'],
    en: ['Weibo video downloader', 'download from Weibo'],
  },
  xiaohongshu: {
    zh: ['小红书视频下载', '小红书图片下载', '小红书笔记下载', 'rednote下载', '小红书无水印下载'],
    en: ['Xiaohongshu video downloader', 'RedNote download', 'download from Xiaohongshu', 'Xiaohongshu image downloader'],
  },
};

// ---------- 普通页面关键词 ----------
const PAGES = {
  intro: {
    zh: ['全网视频下载', '视频下载网站', '免费视频下载', '在线去水印工具', '1000+网站视频下载', '图集下载', '音频提取'],
    en: ['video downloader', 'download video from any site', 'free video downloader', 'online video downloader', 'watermark remover online', 'download images from any site', 'audio extractor online'],
  },
  'supported-websites': {
    zh: ['支持的网站', '视频下载网站列表', '视频下载平台大全', '全网视频解析', '1000+网站支持'],
    en: ['supported websites', 'list of video download sites', 'all supported platforms', '1000+ supported sites'],
  },
  cli: {
    zh: ['MeowLoad CLI', '命令行下载工具', '终端下载视频', 'CLI视频下载', '命令行批量下载'],
    en: ['MeowLoad CLI', 'command line video downloader', 'download video from terminal', 'CLI batch downloader'],
  },
  structure: {
    zh: ['网站结构说明', '文档站结构', 'Docusaurus目录结构'],
    en: ['site structure', 'documentation structure', 'Docusaurus site structure'],
  },
  'quickstart/single-link': {
    zh: ['单个链接下载', '粘贴链接下载', '链接解析下载', '单个视频下载方法', '怎么下载视频链接'],
    en: ['single link download', 'paste link to download', 'download from a single URL', 'how to download a video link'],
  },
  'quickstart/batch': {
    zh: ['批量视频下载', '多链接批量下载', '批量下载视频', '一次下载多个视频', '20条链接批量下载'],
    en: ['batch video download', 'download multiple videos at once', 'multi link batch download', 'bulk video download'],
  },
  'quickstart/md5': {
    zh: ['批量修改MD5', 'MD5修改器', '视频去重', '批量改MD5工具', '文件哈希重写'],
    en: ['batch MD5 rewrite', 'MD5 changer', 'video deduplication', 'file hash rewrite tool'],
  },
  'quickstart/audio-extract': {
    zh: ['视频转音频', '提取视频音频', '视频转MP3', '音频提取工具', 'MP3转换'],
    en: ['video to audio', 'extract audio from video', 'video to MP3 converter', 'audio extractor tool'],
  },
  'client/windows': {
    zh: ['Windows下载器', 'Windows视频下载软件', 'PC视频下载工具', '桌面客户端下载'],
    en: ['Windows downloader', 'Windows video download software', 'desktop video downloader', 'Windows client'],
  },
  'client/mac': {
    zh: ['Mac下载器', 'macOS视频下载软件', '苹果电脑视频下载工具', 'Mac客户端下载'],
    en: ['Mac downloader', 'macOS video download software', 'Mac desktop client', 'Apple video downloader'],
  },
  'features/sniffer': {
    zh: ['网页视频嗅探', '万能嗅探下载', '网页视频抓取工具', '在线视频嗅探器', '网页音频嗅探'],
    en: ['universal video sniffer', 'sniff video from any website', 'web media sniffer', 'online audio sniffer'],
  },
  'features/playlist-channel': {
    zh: ['播放列表批量下载', '频道批量下载', '主页批量下载', '合集下载'],
    en: ['playlist batch download', 'channel bulk download', 'profile batch download', 'album download'],
  },
  'features/coverage': {
    zh: ['支持网站大全', '1000+网站支持', '多平台视频下载', '全网视频下载'],
    en: ['1000+ supported sites', 'all platform video download', 'full web coverage', 'multi site downloader'],
  },
  'features/quality': {
    zh: ['8K视频下载', '无损视频下载', '高清画质下载', '4K视频下载', '原始画质下载'],
    en: ['8K video download', 'lossless video download', 'high quality video download', '4K video download', 'original quality download'],
  },
  'features/audio-extract': {
    zh: ['视频提取音频', 'MP3提取', '音频格式转换'],
    en: ['extract audio from video', 'MP3 extractor', 'audio format converter'],
  },
  'features/batch-links': {
    zh: ['批量链接下载', '多链接提取', '批量视频提取'],
    en: ['batch link download', 'multiple link extraction', 'bulk video extraction'],
  },
  'faq/watermark': {
    zh: ['视频有水印吗', '下载视频去水印', '无水印下载', '去水印下载器'],
    en: ['does downloaded video have watermark', 'download video without watermark', 'no watermark downloader'],
  },
  'faq/install': {
    zh: ['需要安装吗', '无需安装下载', '网页版下载工具', '免安装视频下载'],
    en: ['do I need to install anything', 'no install required', 'web based downloader', 'browser download tool'],
  },
  'faq/quality': {
    zh: ['能选清晰度吗', '画质选择', '格式下载', '下载格式有哪些'],
    en: ['can I choose quality', 'video format options', 'choose resolution', 'download format list'],
  },
  'faq/album-audio': {
    zh: ['图集下载', '背景音乐提取', '图片批量下载', '相册下载'],
    en: ['album download', 'image gallery downloader', 'background music extraction', 'batch image download'],
  },
  'faq/private': {
    zh: ['私密账号能下载吗', '会员内容下载', '登录内容提取', '私密帖子下载'],
    en: ['can I download private accounts', 'members only content download', 'login protected content', 'private post download'],
  },
  'faq/expiry': {
    zh: ['下载链接有效期', '链接过期', '直链失效', '解析链接多久失效'],
    en: ['do download links expire', 'link expiration', 'direct link invalid', 'how long links last'],
  },
  'faq/batch': {
    zh: ['支持多链接吗', '批量处理链接', '一次能下几个'],
    en: ['can I download multiple links', 'batch link processing', 'how many links at once'],
  },
  'faq/failure': {
    zh: ['下载失败怎么办', '解析失败原因', '视频提取失败', '下载失败解决'],
    en: ['download failed what to do', 'extraction failure reasons', 'video download error', 'troubleshoot failed download'],
  },
  'faq/account-and-membership-faq': {
    zh: ['账号登录问题', '会员版本选择', '密码错误', '会员权益'],
    en: ['account login help', 'membership plan comparison', 'password reset', 'premium benefits'],
  },
  'faq/keep-downloaded-files-in-order': {
    zh: ['批量下载文件排序', '文件顺序保持', '下载顺序错乱', '按顺序命名'],
    en: ['keep downloaded files in order', 'batch download sorting', 'file naming order', 'sort downloaded videos'],
  },
  'video-downloads/bulk-video-downloader': {
    zh: ['批量下载视频', '多链接批量保存', '一次性下载多个视频', '批量下载图片音频'],
    en: ['bulk video downloader', 'batch save video audio images', 'download many videos at once', 'bulk media download'],
  },
  'video-downloads/how-to-download-ifunny-videos': {
    zh: ['下载iFunny视频', 'iFunny meme下载', 'iFunny GIF下载'],
    en: ['download iFunny videos', 'iFunny meme download', 'iFunny GIF download'],
  },
  'video-downloads/sora2-watermark-remover': {
    zh: ['Sora2去水印', 'AI视频去水印保存', 'Sora 2视频下载'],
    en: ['Sora2 watermark remover', 'remove watermark from AI video', 'Sora 2 video download'],
  },
  'video-downloads/batch-download-profile-playlist': {
    zh: ['主页批量下载', '播放列表批量下载', '频道批量下载', 'Hashtag批量下载'],
    en: ['profile batch download', 'playlist batch download', 'channel bulk download', 'hashtag bulk download'],
  },
  'livestream-recording/how-to-record-twitch-live-streams': {
    zh: ['录制Twitch直播', 'Twitch直播录制', 'Twitch直播回放下载'],
    en: ['record Twitch live stream', 'Twitch live recording', 'Twitch VOD download'],
  },
  'livestream-recording/how-to-record-kick-live-streams': {
    zh: ['录制Kick直播', 'Kick直播录制', 'Kick直播回放下载'],
    en: ['record Kick live stream', 'Kick live recording', 'Kick VOD download'],
  },
  'browser-extension/install-meowload-extension': {
    zh: ['安装浏览器插件', 'Chrome插件安装', 'Edge插件安装', '哼哼猫插件下载'],
    en: ['install browser extension', 'Chrome extension install', 'Edge extension install', 'Meowload extension download'],
  },
  'browser-extension/download-ecommerce-product-videos': {
    zh: ['电商产品视频下载', '淘宝商品视频下载', '京东商品视频下载', '拼多多产品视频', '亚马逊产品视频下载'],
    en: ['e-commerce product video download', 'Taobao product video', 'Amazon product video download', 'shopping site video downloader'],
  },
  'browser-extension/download-1688-product-videos': {
    zh: ['1688商品视频下载', '阿里巴巴商品视频', '1688主图视频下载'],
    en: ['1688 product video download', 'Alibaba product video download', '1688 listing video'],
  },
  'browser-extension/download-wechat-article-videos': {
    zh: ['微信公众号视频下载', '微信文章视频提取', '公众号视频保存'],
    en: ['WeChat article video download', 'WeChat official account video', 'extract video from WeChat article'],
  },
  'browser-extension/batch-save-xiaohongshu-notes': {
    zh: ['批量保存小红书笔记', '小红书博主主页批量下载', '小红书文案视频批量保存'],
    en: ['batch save Xiaohongshu notes', 'Xiaohongshu profile bulk download', 'save RedNote posts in batch'],
  },
  'youtube/youtube-subtitles-download': {
    zh: ['YouTube字幕下载', 'SRT字幕下载', 'VTT字幕下载', '多语言字幕下载', 'TTML字幕下载'],
    en: ['YouTube subtitle download', 'download SRT subtitles', 'VTT subtitle download', 'multi language subtitles', 'TTML subtitle download'],
  },
  'youtube/download-youtube-with-meowload-browser-extension': {
    zh: ['浏览器插件下载YouTube', '绕过403下载YouTube', '年龄限制视频下载', '地区限制视频下载'],
    en: ['download YouTube with extension', 'bypass 403 YouTube download', 'age restricted video download', 'geo blocked YouTube download'],
  },
  'youtube/how-to-download-a-youtube-playlist': {
    zh: ['下载YouTube播放列表', '批量下载YouTube视频', 'YouTube合集下载'],
    en: ['download YouTube playlist', 'batch download YouTube videos', 'YouTube collection download'],
  },
  'youtube/youtube-network-troubleshooting': {
    zh: ['YouTube下载失败', '下载超时怎么办', '网络问题排查', 'YouTube连接不上'],
    en: ['YouTube download not working', 'download timeout fix', 'network troubleshooting', 'YouTube connection issue'],
  },
};

// ---------- 通用词 ----------
const BRAND = {zh: ['hhmao', '哼哼猫去水印'], en: ['hhmao', 'Meowload']};
const CORE = {
  zh: ['视频下载', '图集下载', '音频下载', '去水印', '下载器', '在线下载'],
  en: ['video downloader', 'image downloader', 'audio downloader', 'watermark remover', 'online downloader', 'video download'],
};
// 台湾地区常用说法补充（与繁体主词并存，提高本地搜索召回）
const TW_SUPPLEMENT = {
  zh: [
    '影片下載', '下載影片', '線上下載', '免費下載', '全網下載',
    '影片下載器', '線上影片下載', '下載工具', '批次下載', '下載連結',
    '音訊下載', '音訊擷取', '無水印下載', '線上影片擷取工具',
    '批次下載影片', '批次修改MD5', '影片字幕下載', '直播錄製',
  ],
  en: [],
};

// 台湾用语替换规则（长词优先匹配）
const TW_TERM = {
  批量修改MD5: '批次修改MD5',
  批量下載: '批次下載',
  批量: '批次',
  音頻下載: '音訊下載',
  音頻提取: '音訊擷取',
  音頻: '音訊',
  視頻下載器: '影片下載器',
  視頻下載: '影片下載',
  視頻: '影片',
  用戶: '使用者',
  軟件: '軟體',
  信息: '資訊',
  網絡: '網路',
  提取: '擷取',
};

// 平台页显示名（zh-CN / en）
const PLATFORM_NAME = {
  youtube: {zh: 'YouTube', en: 'YouTube'},
  bilibili: {zh: 'Bilibili', en: 'Bilibili'},
  twitter: {zh: 'Twitter', en: 'Twitter'},
  tiktok: {zh: 'TikTok', en: 'TikTok'},
  instagram: {zh: 'Instagram', en: 'Instagram'},
  facebook: {zh: 'Facebook', en: 'Facebook'},
  threads: {zh: 'Threads', en: 'Threads'},
  sora: {zh: 'Sora', en: 'Sora'},
  reddit: {zh: 'Reddit', en: 'Reddit'},
  pinterest: {zh: 'Pinterest', en: 'Pinterest'},
  twitch: {zh: 'Twitch', en: 'Twitch'},
  soundcloud: {zh: 'SoundCloud', en: 'SoundCloud'},
  snapchat: {zh: 'Snapchat', en: 'Snapchat'},
  vimeo: {zh: 'Vimeo', en: 'Vimeo'},
  tumblr: {zh: 'Tumblr', en: 'Tumblr'},
  dailymotion: {zh: 'Dailymotion', en: 'Dailymotion'},
  likee: {zh: 'Likee', en: 'Likee'},
  linkedin: {zh: 'LinkedIn', en: 'LinkedIn'},
  vk: {zh: 'VK', en: 'VK'},
  weibo: {zh: '微博', en: 'Weibo'},
  xiaohongshu: {zh: '小红书', en: 'Xiaohongshu'},
};

// 台湾用语替换规则（按 key 长度倒序，保证长词优先匹配）
const TW_TERM_RULES = Object.entries(TW_TERM).sort((a, b) => b[0].length - a[0].length);

function toTw(list) {
  return list.map(w => {
    let s = cc.convertSync(w);
    for (const [from, to] of TW_TERM_RULES) {
      s = s.split(from).join(to);
    }
    return s;
  });
}

/**
 * @param {string} relPath 形如 platforms/youtube-video-downloader
 * @param {string} title
 * @param {'zh-CN'|'zh-TW'|'en'} locale
 */
function buildKeywords(relPath, title, locale) {
  const isEn = locale === 'en';
  const isTw = locale === 'zh-TW';
  const lang = isEn ? 'en' : 'zh';
  const core = isTw ? toTw(CORE.zh).slice(0, 4) : CORE[lang];
  const brand = isTw ? toTw(BRAND.zh) : BRAND[lang];

  if (relPath.startsWith('platforms/')) {
    const slug = relPath.replace('platforms/', '').replace('-video-downloader', '');
    const pkw = PLATFORM[slug] ? PLATFORM[slug][lang] : [];
    const name = (PLATFORM_NAME[slug] ? PLATFORM_NAME[slug][lang] : title).trim();
    let list;
    if (isEn) {
      list = [`${name} video download`, `download from ${name}`, ...pkw, ...core, ...brand];
    } else if (isTw) {
      const twName = toTw([name])[0];
      list = [
        `${twName}影片下載`,
        `${twName}下載`,
        ...toTw(pkw),
        ...toTw(TW_SUPPLEMENT.zh),
        ...core,
        ...brand,
      ];
    } else {
      list = [`${name}视频下载`, `${name}下载`, ...pkw, ...core, ...brand];
    }
    return [...new Set(list)];
  }

  const page = PAGES[relPath];
  if (page) {
    if (isTw) {
      return [
        ...new Set([
          ...toTw(page.zh),
          ...toTw(TW_SUPPLEMENT.zh),
          ...core,
          ...brand,
        ]),
      ];
    }
    return [...new Set([...page[lang], ...core, ...brand])];
  }

  // 兜底：用标题 + 通用词
  const cleanTitle = (title || '').replace(/\s*[?？]\s*$/, '').trim();
  let list = isEn ? [cleanTitle, ...core, ...brand] : [cleanTitle, ...core, ...brand];
  if (isTw) list = [...list, ...toTw(list)];
  return [...new Set(list.filter(Boolean))];
}

/**
 * @param {string} file 绝对路径
 * @param {string} relPath 形如 platforms/youtube-video-downloader
 * @param {'zh-CN'|'zh-TW'|'en'} locale
 */
function inject(file, relPath, locale) {
  if (!fs.existsSync(file)) return false;
  const src = fs.readFileSync(file, 'utf8');
  const fm = src.match(/^---\r?\n([\s\S]*?\r?\n)---\r?\n([\s\S]*)$/);
  if (!fm) return false;
  let front = fm[1];
  const body = fm[2];

  // 移除旧 keywords（幂等）
  front = front.replace(/^keywords:.*\r?\n/m, '');
  front = front.replace(/\r?\n{2,}/g, '\n');

  const titleMatch = front.match(/^title:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/^['"]|['"]$/g, '').trim() : '';

  const kw = buildKeywords(relPath, title, locale);
  const kwLine = `keywords: [${kw.map(k => `"${k.replace(/"/g, '')}"`).join(', ')}]`;

  if (/^description:/m.test(front)) {
    front = front.replace(/^(description:.*)$/m, `$1\n${kwLine}`);
  } else if (/^title:/m.test(front)) {
    front = front.replace(/^(title:.*)$/m, `$1\n${kwLine}`);
  } else {
    front = `${kwLine}\n${front}`;
  }

  fs.writeFileSync(file, `---\n${front}---\n${body}`, 'utf8');
  return true;
}

// ---------- 遍历 ----------
function walk(dir, base = '') {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full, base + e.name + '/'));
    else if (e.name.endsWith('.md')) out.push(base + e.name.replace(/\.md$/, ''));
  }
  return out;
}

const ROOTS = [
  {dir: path.join(ROOT, 'docs'), locale: 'zh-CN'},
  {dir: path.join(ROOT, 'i18n', 'zh-TW', 'docusaurus-plugin-content-docs', 'current'), locale: 'zh-TW'},
  {dir: path.join(ROOT, 'i18n', 'en', 'docusaurus-plugin-content-docs', 'current'), locale: 'en'},
];

let total = 0;
for (const root of ROOTS) {
  const rels = walk(root.dir);
  let n = 0;
  for (const rel of rels) {
    if (inject(path.join(root.dir, `${rel}.md`), rel, root.locale)) n++;
  }
  console.log(`${root.locale} -> ${n}`);
  total += n;
}
console.log('total:', total);
