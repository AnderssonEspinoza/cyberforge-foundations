# Contributing to ZeroDay

Thanks for considering a contribution. The goal of this project is to make cybersecurity learning more accessible, structured, and practical.

## Before you start

- Read the main [README.md](./README.md).
- Read [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) if you will edit lessons, glossary, quizzes, or labs.
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
- `src/data/coreData.js`: glossary, levels, study guide, and role tracks
- `src/data/modules.js`: modules, lessons, flashcards, and quizzes
- `src/data/appData.js`: stable export layer consumed by the app
- `src/services/`: state, persistence, and feed access
- `scripts/`: Node scripts such as the RSS scraper
- `public/`: static assets deployed as-is

## Branch workflow

1. Create a branch from `main`.
2. Make focused changes.
3. Run `npm run build`.
4. Open a Pull Request back to `main`.

Do not push directly to `main`. The repository is intended to be reviewed through Pull Requests.

## Contribution guidelines

- Keep changes focused and easy to review.
- Preserve the mobile-first experience.
- Prefer readable code over clever code.
- When adding cybersecurity content, use accurate and verifiable sources.
- When adding links or references, prefer official documentation or high-quality primary sources.
- Avoid placeholders and incomplete fake content.
- Keep educational content aligned with `CONTENT_GUIDE.md`.

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
