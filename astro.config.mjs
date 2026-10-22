import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
export default defineConfig({
  site: 'https://swalake.github.io', base: '/research-website', trailingSlash: 'always',
  output: 'static', integrations: [mdx({ gfm: true, remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }), sitemap({ filter: (page) => !page.endsWith('/404/') })],
  markdown: { processor: unified({ gfm: true, remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }), shikiConfig: { theme: 'github-dark' } },
  vite: { plugins: [tailwindcss()] }, devToolbar: { enabled: false }
});
