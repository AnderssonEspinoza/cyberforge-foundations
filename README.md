# CyberForge Foundations

[English README](./README-en.md)

CyberForge Foundations es una app open source de microaprendizaje en ciberseguridad pensada para estudiar desde movil o desktop en sesiones cortas. Combina fundamentos tecnicos estables, laboratorios guiados, rutas por nivel, seguimiento local del progreso y un feed de noticias reales que se actualiza con un scraper RSS.

## Stack

- React + Vite
- React Router
- Tailwind CSS
- Framer Motion
- Node.js para el scraper de noticias
- `localStorage` para progreso local del usuario

## Lo que incluye

- 10 modulos base con lecciones, errores comunes, fuentes y mini laboratorios
- Ruta por niveles: Nivel 0, Fundamentos, Junior e Intermedio
- Trayectorias por rol: Blue Team, Pentesting, AppSec y Cloud Security
- Glosario vivo y guia de estudio
- Flashcards con repeticion espaciada
- Quizzes por dificultad: basico, aplicado y escenario
- Feed de noticias reales generado desde RSS
- Exportacion e importacion de progreso

## Estructura

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

## Instalacion local

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Vite levantara un servidor local, normalmente en `http://localhost:5173`.

## Build de produccion

```bash
npm run build
```

## Actualizar noticias

Manual:

```bash
npm run scrape
```

Ese comando actualiza:

- `noticias.json`
- `public/noticias.json`

## Actualizacion automatica

El repositorio incluye el workflow [`.github/workflows/update-news.yml`](./.github/workflows/update-news.yml), que ejecuta el scraper diariamente y tambien permite lanzarlo manualmente desde GitHub Actions.

Si publicas el proyecto en Vercel o Netlify conectado al repo, los cambios en `public/noticias.json` se desplegaran automaticamente despues de cada ejecucion exitosa del workflow.

## Uso recomendado

1. Empieza por la ruta `Nivel 0 -> Fundamentos`.
2. Marca cada leccion como `confundido`, `repasar`, `entendido` o `dominado`.
3. Haz el mini laboratorio antes de pasar al quiz.
4. Usa el feed de noticias para conectar teoria con casos reales.
5. Complementa la app con laboratorios externos y documentacion oficial.

## Contribuir

Las contribuciones son bienvenidas. Antes de abrir un Pull Request, revisa [CONTRIBUTING.md](./CONTRIBUTING.md).

Ideas de contribucion utiles:

- mejorar accesibilidad y navegacion movil
- ampliar lecciones o recursos verificables
- agregar nuevas fuentes RSS confiables
- mejorar quizzes y laboratorios guiados
- refinar estilos, rendimiento o arquitectura

## Licencia

Este proyecto usa la licencia MIT. Revisa [LICENSE](./LICENSE).

## Topics sugeridos para GitHub

Agrega estos topics en la seccion `About` del repositorio para mejorar descubrimiento:

- `cybersecurity`
- `microlearning`
- `react`
- `vite`
- `education`
- `open-source`
- `javascript`
- `tailwindcss`
