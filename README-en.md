# ZeroDay

[README en espanol](./README.md)

ZeroDay is an open source cybersecurity microlearning app designed for short study sessions on mobile or desktop. It combines stable technical foundations, guided labs, level-based learning paths, local progress tracking, and a real news feed generated from RSS sources.

## Stack

- React + Vite
- React Router
- Tailwind CSS
- Framer Motion
- Node.js for the news scraper
- `localStorage` for per-user local progress

## Features

- 10 core modules with lessons, common mistakes, references, and mini labs
- Level roadmap: Level 0, Foundations, Junior, and Intermediate
- Role tracks: Blue Team, Pentesting, AppSec, and Cloud Security
- Living glossary and study guide
- Spaced-repetition flashcards
- Quizzes by difficulty: basic, applied, and scenario-based
- Real cybersecurity news feed generated from RSS
- Progress export and import

## Project structure

```text
.
|- public/
|  `- noticias.json
|- scripts/
|  `- scraper.js
|- src/
|  |- components/
|  |- data/
|  |- layouts/
|  |- pages/
|  |- services/
|  `- utils/
|- .github/workflows/
|  `- update-news.yml
|- CONTRIBUTING.md
|- LICENSE
|- README-en.md
`- README.md
```

## Local setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Vite will start a local server, usually at `http://localhost:5173`.

## Production build

```bash
npm run build
```

## Refresh the news feed

Manual refresh:

```bash
npm run scrape
```

That command updates:

- `noticias.json`
- `public/noticias.json`

## Automatic updates

The repository includes [`.github/workflows/update-news.yml`](./.github/workflows/update-news.yml), which runs the scraper every day and can also be triggered manually from GitHub Actions.

If the project is deployed through Vercel or Netlify and connected to this repository, changes to `public/noticias.json` will be redeployed automatically after each successful workflow run.

## Recommended usage

1. Start with the `Level 0 -> Foundations` roadmap.
2. Track each lesson as `confused`, `review`, `understood`, or `mastered`.
3. Complete the mini lab before taking the quiz.
4. Use the news feed to connect theory with real-world cases.
5. Pair the app with hands-on labs and official documentation.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a Pull Request.

If you plan to expand lessons, quizzes, glossary entries, or labs, also read [CONTENT_GUIDE.md](./CONTENT_GUIDE.md).

Good contribution ideas:

- improve accessibility and mobile navigation
- expand lessons or add verified references
- add trustworthy RSS sources
- improve quizzes and guided labs
- refine styling, performance, or architecture

## Collaboration workflow

- Always work from your own branch.
- Open a Pull Request into `main`.
- CI validates the production build.
- `CODEOWNERS` requests maintainer review automatically.
- Recommended branch protection settings are documented in [MAINTAINER_SETUP.md](./MAINTAINER_SETUP.md).

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
