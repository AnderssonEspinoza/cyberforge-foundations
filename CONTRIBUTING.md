# Contributing to CyberForge Foundations

Thanks for considering a contribution. The goal of this project is to make cybersecurity learning more accessible, structured, and practical.

## Before you start

- Read the main [README.md](./README.md).
- Check open issues before starting work.
- Prefer small, focused Pull Requests.

## Local setup

```bash
npm install
npm run dev
```

If you want to refresh the shared news feed locally:

```bash
npm run scrape
```

## Project layout

- `src/components/`: reusable UI pieces
- `src/layouts/`: shared layout shells
- `src/pages/`: route-level screens
- `src/data/`: hardcoded learning content and metadata
- `src/services/`: state, persistence, and feed access
- `scripts/`: Node scripts such as the RSS scraper
- `public/`: static assets deployed as-is

## Contribution guidelines

- Keep changes focused and easy to review.
- Preserve the mobile-first experience.
- Prefer readable code over clever code.
- When adding cybersecurity content, use accurate and verifiable sources.
- When adding links or references, prefer official documentation or high-quality primary sources.
- Avoid placeholders and incomplete fake content.

## Pull Request checklist

- The app still runs with `npm run dev`.
- Production build passes with `npm run build`.
- If you changed the scraper, verify `npm run scrape`.
- Update documentation when behavior or setup changes.
- Keep commits descriptive and scoped.

## Suggested first contributions

- accessibility improvements
- glossary additions with verified definitions
- extra guided labs for existing modules
- improved quiz coverage
- new RSS sources from trustworthy organizations

## Code of collaboration

Be respectful, specific, and constructive in issues and Pull Requests. The goal is to help learners, not to gatekeep them.
