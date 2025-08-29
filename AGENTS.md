# Repository Guidelines

## Project Structure & Module Organization
- Root SPA: `index.html` is the single-page app entry.
- JS modules live at the repo root (e.g., `sum.js`).
- Tests colocate using `*.test.js` (e.g., `sum.test.js`).
- Dependencies are in `node_modules/` (already committed). Avoid editing by hand.

## Build, Test, and Development Commands
- Install: `npm install` — installs dev dependencies (e.g., Jest).
- Test: `npm test` — runs the full Jest test suite once.
- Watch tests: `npx jest --watch` — reruns tests on file changes.
- Run locally: open `index.html` in a browser or serve statically (e.g., `python3 -m http.server 8080` then visit `http://localhost:8080`).

## Coding Style & Naming Conventions
- Language: JavaScript (`commonjs` modules via `require`/`module.exports`).
- Indentation: 2 spaces; include semicolons; prefer single quotes; trailing commas optional.
- Naming: files `kebab-case` or `lowercase` (e.g., `sum.js`); functions and variables `camelCase`; classes `PascalCase`.
- Imports: use relative paths (e.g., `require('./sum')`).

## Testing Guidelines
- Framework: Jest.
- File naming: `*.test.js` next to code under test.
- Run: `npm test`; focused runs: `npx jest path/to/file.test.js -t "matches behavior"`.
- Aim for small, behavior-focused tests; arrange–act–assert pattern; prefer pure functions.

## Commit & Pull Request Guidelines
- Commits: use Conventional Commits when possible (`feat:`, `fix:`, `chore:`, `docs:`). Keep messages imperative and scoped (e.g., `feat: add cube move validator`).
- PRs: include a clear description, linked issues (e.g., `Closes #123`), test updates, and screenshots/GIFs for UI changes to `index.html`.
- Keep PRs small and focused; note any breaking changes.

## Security & Configuration Tips
- Do not commit secrets or tokens. This repo is static; prefer client-safe configs only.
- Large/generated assets: avoid adding unless necessary. `node_modules/` is currently tracked; do not edit it manually.
- Browser compatibility: test in at least one Chromium-based browser; note any API assumptions in PRs.
