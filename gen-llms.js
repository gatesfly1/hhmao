// 生成/更新 static/llms.txt —— 把 docs/ 下所有 md 按 sidebar 分组、列出 url + title + 简介
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs');
const SITE = 'https://docs.hhmao.cn';

function readMd(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?\n)---\n([\s\S]*)$/);
  if (!fmMatch) return null;
  const fm = {};
  for (const line of fmMatch[1].split('\n')) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^['"]|['"]$/g, '').trim();
  }
  // 正文：去掉首个 # 段落、拿首段作为简介
  let body = fmMatch[2].trim();
  // 去掉脚本 / 注释
  body = body.replace(/<script[\s\S]*?<\/script>\n?/g, '');
  body = body.replace(/<!--[\s\S]*?-->\n?/g, '');
  const lines = body.split('\n').map(l => l.trim()).filter(l => l);
  let summary = '';
  for (const line of lines) {
    if (line.startsWith('#')) continue;
    if (line.startsWith('|')) continue; // 跳过表格
    if (line.startsWith('---')) continue;
    if (line.startsWith('|')) continue;
    summary = line;
    break;
  }
  return {
    title: fm.title || '(no title)',
    description: fm.description || summary || '',
    slug: fm.slug || path.basename(file, '.md'),
  };
}

function walk(dir, base = '') {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...walk(full, base + e.name + '/'));
    } else if (e.name.endsWith('.md')) {
      const data = readMd(full);
      if (!data) continue;
      out.push({
        ...data,
        relPath: base + e.name.replace(/\.md$/, ''),
      });
    }
  }
  return out;
}

const entries = walk(DOCS);

// 按 sidebar 顺序分组
const GROUPS = [
  {
    label: '介绍',
    match: ['intro'],
  },
  {
    label: '快速上手',
    match: (rel) => rel.startsWith('quickstart/'),
  },
  {
    label: '客户端',
    match: (rel) => rel.startsWith('client/'),
  },
  {
    label: '功能特性',
    match: (rel) => rel.startsWith('features/'),
  },
  {
    label: '支持的平台',
    match: (rel) => rel.startsWith('platforms/'),
  },
  {
    label: '常见疑问',
    match: (rel) => rel.startsWith('faq/'),
  },
  {
    label: '总览',
    match: (rel) => rel === 'supported-websites',
  },
];

function findGroup(rel) {
  for (const g of GROUPS) {
    if (typeof g.match === 'function') {
      if (g.match(rel)) return g.label;
    } else if (g.match.includes(rel)) {
      return g.label;
    }
  }
  return null;
}

const grouped = {};
for (const e of entries) {
  const g = findGroup(e.relPath) || '其他';
  if (!grouped[g]) grouped[g] = [];
  grouped[g].push(e);
}

// 生成 llms.txt 内容
const lines = [];
lines.push('# hhmao (哼哼猫去水印)');
lines.push('');
lines.push('> 全网视频 / 图集 / 音频 下载。从 1000+ 网站一键下载原始画质视频、图集和音频。免费、无需注册。');
lines.push('');
lines.push('## 站点元信息');
lines.push('');
lines.push('- 品牌：哼哼猫去水印（hhmao）');
lines.push(`- 域名：${SITE}`);
lines.push('- 语言：简体中文（zh-CN）、繁體中文（zh-TW）、English（en）');
lines.push(`- sitemap：${SITE}/sitemap.xml`);
lines.push(`- llms.txt：${SITE}/llms.txt`);
lines.push('');
lines.push('## 主要功能');
lines.push('');
lines.push('- 单个链接提取：粘贴一条帖子链接，下载原始画质视频、图集或音频');
lines.push('- 多链接批量提取：一次粘贴最多 20 条帖子链接，系统自动解析');
lines.push('- 主页批量：给定作者主页，按页取回其全部公开内容');
lines.push('- 视频转音频：在线或本地视频一键提取音轨，输出 MP3 / M4A / WAV');
lines.push('- 批量修改 MD5：重写文件哈希，绕过平台重复识别');
lines.push('- 资源嗅探：内置浏览器嗅探任意网页音视频资源');
lines.push('');

// 各分组内容
const groupOrder = ['介绍', '快速上手', '客户端', '功能特性', '支持的平台', '常见疑问', '总览'];
for (const label of groupOrder) {
  const items = grouped[label] || [];
  if (!items.length) continue;
  lines.push(`## ${label}`);
  lines.push('');
  for (const it of items) {
    const url = `${SITE}/${it.relPath}`;
    lines.push(`### [${it.title}](${url})`);
    if (it.description) {
      lines.push('');
      lines.push(it.description);
    }
    lines.push('');
  }
}

lines.push('## 支持的平台');
lines.push('');
lines.push('YouTube、Bilibili、Twitter / X、TikTok、Instagram、Facebook、Threads、Sora、Reddit、Pinterest、Twitch、SoundCloud、Snapchat、Vimeo、Tumblr、Dailymotion、Likee、LinkedIn、VKontakte、微博、小红书 等 1000+ 站点。');
lines.push('');
lines.push('## 客户端');
lines.push('');
lines.push('- Windows 10+ 桌面客户端：内置浏览器、批量下载、资源嗅探、断点续传');
lines.push('- macOS 10.13+ 桌面客户端：同上');
lines.push('');
lines.push('## 限制');
lines.push('');
lines.push('- 私密账号、需登录或会员可见内容无法解析');
lines.push('- 地区限制内容可能失败');
lines.push('- 解析得到的源站直链通常几十分钟到几小时失效，需尽快下载');
lines.push('- 失败时返回错误而非残缺文件');
lines.push('');

const content = lines.join('\n');
fs.writeFileSync(path.join(ROOT, 'static', 'llms.txt'), content, 'utf8');
console.log('wrote', (content.length / 1024).toFixed(1), 'KB,', entries.length, 'pages indexed');