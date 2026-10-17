# hhmao

A documentation site built with [Docusaurus](https://docusaurus.io/).

## Local development

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build static site
npm run build

# Preview built site
npm run serve
```

The dev server runs at http://localhost:3000 by default.

## Project layout

```
.
├── docs/                  # Markdown docs (the content)
├── src/                   # React components / pages
├── static/                # Static assets copied as-is
├── i18n/                  # Translations
├── templates/             # Page templates
├── docusaurus.config.ts   # Site configuration
├── sidebars.ts            # Sidebar structure
└── package.json
```

## Deployment

This site is automatically deployed via Cloudflare Pages on every push to `main`.

- Build command: `npm run build`
- Build output directory: `build`
- Node version: 18 or 20

## Notes

- `node_modules/`, `build/`, and `.docusaurus/` are git-ignored.
- Local backup folder `backup-html-original/` is excluded from the repo.
