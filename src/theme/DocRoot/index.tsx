/**
 * Swizzle DocRoot：当 catch-all 路由命中 404 时补上 noindex 与 keywords。
 * 站点 routeBasePath 为 '/'，404.html 由 docs 插件的 DocRoot 渲染，
 * 默认不输出任何 PageMetadata，所以这里补上。
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, ThemeClassNames, PageMetadata} from '@docusaurus/theme-common';
import {
  DocsSidebarProvider,
  useDocRootMetadata,
} from '@docusaurus/plugin-content-docs/client';
import DocRootLayout from '@theme/DocRoot/Layout';
import NotFoundContent from '@theme/NotFound/Content';
import type {Props} from '@theme/DocRoot';

export default function DocRoot(props: Props): ReactNode {
  const currentDocRouteMetadata = useDocRootMetadata(props);
  if (!currentDocRouteMetadata) {
    // 404：标记 noindex，并补上基础关键词
    return (
      <>
        <PageMetadata
          keywords={['hhmao', '哼哼猫去水印', '视频下载', 'video downloader']}>
          <meta name="robots" content="noindex, follow" />
        </PageMetadata>
        <NotFoundContent />
      </>
    );
  }
  const {docElement, sidebarName, sidebarItems} = currentDocRouteMetadata;
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.page.docsDocPage)}>
      <DocsSidebarProvider name={sidebarName} items={sidebarItems}>
        <DocRootLayout>{docElement}</DocRootLayout>
      </DocsSidebarProvider>
    </HtmlClassNameProvider>
  );
}
