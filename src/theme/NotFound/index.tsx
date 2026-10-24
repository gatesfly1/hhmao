/**
 * Swizzle NotFound：404 页应标记 noindex，并补上 keywords。
 * 全局 headTags 里的 robots 是 index,follow，这里在 404 页覆盖为 noindex。
 */
import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';

export default function Index(): ReactNode {
  const title = translate({
    id: 'theme.NotFound.title',
    message: 'Page Not Found',
  });
  return (
    <>
      <PageMetadata
        title={title}
        keywords={['hhmao', '哼哼猫去水印', '视频下载', 'video downloader']}>
        <meta name="robots" content="noindex, follow" />
      </PageMetadata>
      <Layout>
        <NotFoundContent />
      </Layout>
    </>
  );
}
