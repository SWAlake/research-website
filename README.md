# S.W. Alake | Researcher

Personal academic website for **Suliat Wuraola Alake**, built with Astro, Tailwind CSS and Markdown/MDX. Intended URL: `https://swalake.github.io/research-website/`. Initial publication requires owner approval.

## Start and preview

Install Node **24.19.0** (see `.node-version`) and pnpm **11.25.0**. Run:

```sh
pnpm install
pnpm dev
```

Open the printed local URL with `/research-website/` appended. For production verification run `pnpm build`, then `pnpm preview`. The build checks types, content schemas, generated local URLs, base paths, draft exclusion and sitemap. Commit the lockfile whenever dependencies change. Docker is unnecessary.

## Update personal information

Edit `src/data/profile.ts` for personal information. The `profile` object contains shared identity and contact details; the `about` object contains the homepage role, pronouns, headline, approved biography, completed education and interests. Biography paragraphs are separate quoted strings. Education dates are deliberately omitted; current PhD status appears in the biography rather than in Education. The Contact page retains its original role wording.

Edit `professionalLinks` at the top of `src/data/profile.ts` to update the confirmed LinkedIn, GitHub, Google Scholar and ORCID URLs. This single list supplies both the homepage circular icons and Contact page links. Email comes from `profile.email`. Include only owner-confirmed HTTPS URLs; unconfigured homepage icons remain hidden.

The pattern is original SVG geometry in `public/images/textile-rhythm.svg`, interpreting the supplied indigo-and-ivory textile's banded rhythm, nested diamonds and diagonal grids without claiming a particular origin or traditional symbol. It appears across the shared navigation band, styled in `src/layouts/Layout.astro`. The header uses indigo with ivory text in light mode, and ivory with indigo text in dark mode. The SVG serves as a mask so its lines follow the header colour treatment. Homepage layout and research-card styles live in `src/styles/about.css`; the textile photograph itself is not published.

The `about.featuredResearch` object holds the text-only research card's category, title, summary and internal link. The summary is italicised. The title and “Read research brief” link both use the site's base-aware URL helper; the current destination is `/papers/beyond-a-single-ground-truth/`, an existing in-preparation brief page. Linking to its status page does not make a manuscript downloadable. No image or placeholder is rendered.

The homepage research feature lives in `src/pages/index.astro`. Distinguish completed findings, proposed investigations and future applications. Unpublished numerical results are intentionally absent.

## Replace the photograph

Replace `public/images/portrait.webp` with a square, approximately 800 × 800 pixel image. Crop naturally around the head and shoulders, export an optimised WebP and remove EXIF/location metadata. Keep the original outside the repository. Update the alt text in `src/pages/index.astro` if needed. CSS makes the image circular.

## Add a paper or PDF

Copy `templates/paper.md` into `src/content/papers/descriptive-short-name.md`. The filename determines the URL. Metadata sits between `---` lines; Markdown below supplies approved details.

Supported types: Master's thesis, Research brief, Working paper, Poster companion paper, Conference paper, Preprint — not peer reviewed, Peer-reviewed journal article, Other scholarly output. Status: In Preparation, Submitted, Accepted or Published. Never infer peer review from status alone. Supply authors and year only when confirmed. An optional numeric `month` (1–12) displays the month alongside the year without inventing a day. Undated current writing appears first; dated entries follow from newest to oldest, so the current research brief appears above the December 2024 thesis.

For a writing entry hosted elsewhere, set `externalOnly: true` and `externalUrl` to its confirmed HTTPS destination. Its title and main action link go straight to that source; no local detail page or sitemap entry is created. A `doi` supplies an additional DOI link. Do not upload the document or set `pdf` for these entries. The Master's thesis entry is an example: it links to WSU's PDF and DOI record while keeping the document off this site. Its Published status means the thesis is publicly available; its type remains Master's thesis, not a peer-reviewed journal article.

Optional fields: `summary`, `authors`, `year`, `doi` (a full https://doi.org/ URL), `externalUrl`, `materials`, `relatedJournal`. Related entries use filenames without extensions.

Place only complete, explicitly approved documents in `public/documents/`. Set `pdf: documents/approved-filename.pdf` and `approvedDownload: true`. The build rejects PDFs on In Preparation entries or without approval. `materials` accepts `{ label, url }` items; approval of every attachment remains an editorial responsibility.

**The repository is public. A draft flag does not make source or attachments private. Do not commit confidential drafts, restricted research, patient information or unapproved manuscripts. Deleting a file later does not erase Git history.**

## Create a Research Journal entry

Copy `src/content/journal/editorial-template.mdx` to a new `.md` or `.mdx` file in the same folder. Set the title, ISO date (`YYYY-MM-DD`), summary and tags. Keep `draft: true` until approved. Drafts are excluded from routes, indexes, related-reading links and sitemap, including in local preview. To preview an article, temporarily set `draft: false` locally; do not commit unapproved writing. The supplied template is instructional content, not research attributed to the owner.

No index or layout edits are needed when adding entries. Entries sort by date; reading time is estimated automatically. Markdown is sufficient for most writing; MDX permits reusable components.

### Equations and scientific content

Use `$x$` for inline mathematics and `$$` on separate lines for display equations. Use ordinary LaTeX backslashes; see the template. KaTeX renders at build time. Markdown supports tables, fenced code blocks with language names, hyperlinks and footnotes (`[^1]`, with `[^1]: Reference text` below). Add verified references under a References heading.

Put approved images in `public/images/` and supplements in `public/documents/`. Markdown links must include the project base:

```md
![Meaningful alt text](/research-website/images/approved-figure.webp)
[Supplement](/research-website/documents/approved-supplement.pdf)
[Related paper](/research-website/papers/beyond-a-single-ground-truth/)
```

Captioned image in MDX:

```mdx
<figure>
  <img src="/research-website/images/approved-figure.webp" alt="Meaningful description" loading="lazy" />
  <figcaption>Approved caption and source attribution.</figcaption>
</figure>
```

Optional article metadata `image: { src: images/approved-image.webp, alt: Description }` supplies a featured image. `materials`, `relatedPapers` and `relatedJournal` provide supplementary and related-reading links.

## GitHub review and publishing

1. Edit on a feature branch. GitHub's web editor can create one for simple content edits.
2. Open a pull request into `main`. **Validate website** installs locked dependencies and runs the production build. It never deploys.
3. Review locally and merge only after owner approval.
4. For first publication, select **Settings → Pages → Build and deployment → Source → GitHub Actions**. Ensure Actions are enabled; an administrator may need to permit Pages and OIDC workflow permissions.
5. For additional protection, configure the `github-pages` environment with the owner as required reviewer where supported.
6. After explicit publication approval, run **Actions → Publish website (manual approval) → Run workflow**, selecting `main`. The workflow refuses deployment from other branches, builds the site, uploads `dist` and deploys to Pages. Future updates also require this manual action after merge.
7. Verify the live project URL, navigation, images and article routes. A green build alone does not verify the live site.

There is no deployment on push or merge. To roll back, revert the relevant pull request, validate, and manually deploy the reverted `main` after approval.

## Design and structure

Palette tokens and responsive styles: `src/styles/global.css`. Shared layout and metadata: `src/layouts/Layout.astro`. Content validation: `src/content.config.ts`. The URL helper applies the project base path. Do not change Astro's `site` or `base` unless hosting changes.

Fonts are self-hosted. Dark mode follows the system initially and remembers explicit choices. Navigation remains visible on mobile without a menu script. Original decorative geometry is sparsely informed by textile repetition; it does not reproduce cultural symbols. No analytics or external contact form is included.
