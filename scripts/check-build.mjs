import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('dist');
const walk = async dir => (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e => e.isDirectory() ? walk(join(dir,e.name)) : join(dir,e.name)))).flat();
const files = await walk(root);
const html = files.filter(f => f.endsWith('.html'));
for (const file of html) {
  const text = await readFile(file,'utf8');
  assert(!text.includes('editorial-template'),`Draft leaked: ${file}`);
  // Keep unpublished research values out of both site content and validation source.
  // Research confidentiality requires editorial review; do not encode private results here.
  assert(!/lorem ipsum|replace with approved|article template/i.test(text),`Editorial placeholder leaked: ${file}`);
  for (const [,raw] of text.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(raw)) continue;
    if (!raw.startsWith('/')) continue;
    assert(raw.startsWith('/research-website/'), `Missing base path: ${raw}`);
    const path = decodeURIComponent(raw.split(/[?#]/)[0].slice('/research-website/'.length));
    let target = join(root,path);
    assert(resolve(target).startsWith(root),`Unsafe path: ${raw}`);
    if (raw.endsWith('/')) target = join(target,'index.html');
    assert(await stat(target).catch(() => false),`Broken local URL: ${raw} in ${file}`);
  }
}
const sitemap = (await Promise.all(files.filter(f => /sitemap.*\.xml$/.test(f)).map(f => readFile(f,'utf8')))).join('');
assert(!sitemap.includes('editorial-template'),'Draft leaked into sitemap');
assert(!sitemap.includes('404'),'404 leaked into sitemap');
assert(sitemap.includes('https://swalake.github.io/research-website/'),'Missing canonical base');
for (const collection of ['journal','papers']) {
  for (const file of await walk(resolve(`src/content/${collection}`))) {
    const source = await readFile(file,'utf8');
    const frontmatter = source.split('---')[1] ?? '';
    const draft = /^draft:\s*true\s*$/m.test(frontmatter) || (collection === 'journal' && !/^draft:/m.test(frontmatter));
    if (!draft) continue;
    const slug = file.split(/[\\/]/).pop().replace(/\.(md|mdx)$/,'');
    assert(!(await stat(join(root,collection,slug,'index.html')).catch(()=>false)),`Draft route exists: ${slug}`);
    assert(!sitemap.includes(`/${collection}/${slug}/`),`Draft sitemap entry: ${slug}`);
  }
}
console.log(`Verified ${html.length} HTML pages: local URLs, base path, sitemap and draft exclusion.`);
