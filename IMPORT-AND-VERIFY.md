# Clean website import and verification

This source export preserves the approved website from the corrected production-readiness branch. It contains no Git directory or commit history. Website code, portrait, textile SVG, content, dependency lockfile and both GitHub Actions workflows are unchanged. Old release and validation reports are omitted. Nothing has been deployed by preparing this export.

## Back up before deleting anything

1. Download the ZIP, this guide and the verification report. Save a second copy somewhere you control outside the old checkout.
2. Extract the ZIP and confirm the root contains `package.json`, `src`, `public`, `templates`, `scripts`, `.github`, `.gitignore` and `.node-version`.
3. Compare the ZIP SHA-256 with the supplied checksum. In PowerShell: `Get-FileHash -Algorithm SHA256 -LiteralPath 'C:\path\research-website-clean-source.zip'`.
4. Review the included README and files. Delete/recreate the old GitHub repository only after you are satisfied with your backup. No deletion is part of this export process.

## Import through GitHub Web

1. When ready, create an empty repository owned by `SWAlake` named `research-website`. Do not initialize a README, license or .gitignore; those options are unnecessary for importing this source. Choose public if using free GitHub Pages hosting.
2. On the empty repository page choose **uploading an existing file** (or **Add file → Upload files**).
3. Extract the ZIP first. Upload all files and folders INSIDE the extracted source directory, preserving their paths. Do not upload the ZIP itself or put the entire source inside an extra parent folder. `package.json` must be at the repository root.
4. Explicitly include `.github/workflows/check.yml`, `.github/workflows/deploy.yml`, `.node-version` and `.gitignore`. Enable hidden items in your file browser if needed. Drag the contents, including folders, into the upload area. If a dotfile or workflow folder is skipped, use **Add file → Create new file**, enter its exact path, and paste its complete text from the export.
5. Commit the clean files to `main` with a message such as **Import approved website source with fresh history**. Do not import old branches, tags, PR commits or the old `.git` directory.
6. Open **Actions** and check that the website check workflow finishes successfully. Uploading to main runs validation; publishing is a separate manual action.

GitHub Web supports folder uploads, at most 100 files per upload and 25 MiB per file. This export fits within those limits.
Official upload instructions: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## Repository completeness checklist

- [ ] Repository is `SWAlake/research-website`, default branch `main`, with a new initial history.
- [ ] Root has `README.md`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.node-version`, `.gitignore`, `astro.config.mjs` and `tsconfig.json`.
- [ ] `src` contains components, layouts, styles, profile data, pages, content schemas and the Papers/Journal collections.
- [ ] Both dynamic `[id].astro` page files are present, with their names unchanged.
- [ ] `public/images/portrait.webp`, `public/images/textile-rhythm.svg`, favicon and social cards are present.
- [ ] `scripts/check-build.mjs`, `templates/paper.md` and the unpublished instructional journal template are present.
- [ ] `.github/workflows/check.yml` AND `.github/workflows/deploy.yml` exist in the Code tab.
- [ ] There is no `.git`, `node_modules`, `dist`, `.astro`, environment file, private research document, original portrait file or old audit report in the uploaded files.
- [ ] Actions validation is green. Review the build output if it fails before attempting publication.
- [ ] Source has `site: 'https://swalake.github.io'` and `base: '/research-website'` in `astro.config.mjs`.
- [ ] Papers retains the In Preparation brief without a manuscript download. Journal is intentionally empty; the public template remains `draft: true`.

## Pages settings and eventual publication

Settings do not transfer from a deleted repository, even when the name is reused.

1. Ensure GitHub Actions is enabled for the new repository.
2. Under **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. Keep the supplied workflows; no starter workflow is needed.
3. The existing publish workflow has only a manual `workflow_dispatch` trigger and only builds from `main`. Importing source does not trigger that workflow.
4. Only when you choose to publish: **Actions → Publish website (manual approval) → Run workflow → main**. Configuring Pages alone does not run this custom workflow.
5. Wait for both build and deploy jobs to succeed, then verify https://swalake.github.io/research-website/ yourself before considering the site live.
6. Check About, Papers, Research Journal, Contact, the research brief detail page, portrait, navigation pattern and both themes on desktop and mobile. Brief route: `/research-website/papers/beyond-a-single-ground-truth/`.

Official Pages settings: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Continue editing with Codex

After import, use a NEW clone/checkout of the recreated repository in a separate local directory, then open that directory in Codex. Do not push from the old checkout: it still contains the old history. Reconnect repository access if the new repository is not immediately visible. Future work can use `codex/` feature branches and pull requests as before. The README explains all content editing and local preview steps; Node 24.19.0 and pnpm 11.25.0 are pinned.

The journal template and paper template are public instructional source, not unpublished manuscripts. Draft flags prevent rendered pages, not source visibility. Keep confidential work outside the repository. Recreating a repository starts a clean Git history but cannot revoke previously downloaded copies or guarantee removal of cached GitHub content.
