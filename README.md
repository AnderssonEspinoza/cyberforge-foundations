# CyberForge

CyberForge es una app de microaprendizaje de ciberseguridad pensada para estudiar en bloques cortos, sin perder profundidad tecnica. La aplicacion separa dos capas:

- Fundamentos estables: redes, sistemas, criptografia, web, pentesting, malware, ingenieria social, blue team, Active Directory y cloud.
- Actualidad variable: noticias y avisos reales que se cargan desde `noticias.json` o se actualizan con `scraper.js`.

## Que incluye hoy

- `index.html`: app deployable en un solo archivo con React, Tailwind, React Router y Framer Motion por CDN.
- `scraper.js`: agrega noticias reales desde RSS de ciberseguridad y genera `noticias.json`.
- `noticias.json`: feed inicial para que la app funcione incluso antes de ejecutar el scraper.
- Persistencia local con `localStorage`: progreso, racha, flashcards, noticias leidas y ajustes.
- Exportacion e importacion del progreso en JSON.

## Como actualizar noticias

### Opcion 1: manual

Si estas trabajando localmente, refrescas noticias con:

```bash
npm run scrape
```

### Opcion 2: automatica para usarla desde el celular

El proyecto ya incluye el workflow [`.github/workflows/update-news.yml`](/home/andersson/Escritorio/app-ciberseguridad/.github/workflows/update-news.yml).

Si subes esta carpeta a GitHub y publicas la app desde ese repositorio, GitHub Actions puede actualizar `noticias.json` automaticamente una vez al dia, sin que tengas que entrar al codigo ni correr comandos desde tu telefono.

Eso es lo mas comodo para uso movil:

1. subes el proyecto a GitHub,
2. activas GitHub Actions,
3. publicas la carpeta en GitHub Pages, Netlify o Vercel,
4. el workflow refresca `noticias.json` por ti diariamente.

## Instalacion del feed de noticias

1. Entra a la carpeta del proyecto.
2. Instala dependencias:

```bash
npm install
```

3. Genera o refresca el feed:

```bash
npm run scrape
```

Esto sobrescribe `noticias.json` con noticias mas recientes tomadas de los feeds configurados.

## Ejecutar la app

Como `index.html` usa `fetch("noticias.json")`, conviene abrirla con un servidor local en lugar de hacer doble clic directo.

Opcion A:

```bash
python3 -m http.server 8000
```

Luego abre:

`http://localhost:8000/index.html`

Opcion B:

Usa Live Server de VS Code o despliega la carpeta completa en Netlify / Vercel.

## Notas importantes

- El contenido de estudio esta redactado para darte una base solida y util, pero las noticias y CVEs dependen de la fecha del feed.
- Para mantener actualidad, ejecuta el scraper con frecuencia.
- La app no pretende sustituir laboratorios, documentacion oficial ni advisories del fabricante; su objetivo es ordenar el estudio y priorizar lo importante.

## Estructura del proyecto

- `index.html`: interfaz, rutas, contenido y persistencia.
- `scraper.js`: lector de RSS y generador de `noticias.json`.
- `package.json`: dependencias y scripts.
- `noticias.json`: noticias iniciales o generadas.

## Recomendacion de uso

Haz una sesion corta al dia:

1. Lee la leccion del dia.
2. Revisa 2 o 3 noticias del feed.
3. Haz flashcards pendientes.
4. Cierra con el quiz del modulo cuando te sientas listo.

## Publicarlo en GitHub

Si quieres usarlo principalmente desde el celular, lo ideal es:

1. subir este proyecto a GitHub,
2. activar GitHub Actions,
3. publicar la carpeta en GitHub Pages, Netlify o Vercel,
4. dejar que el workflow actualice `noticias.json` automaticamente cada dia.

Si ya tienes GitHub configurado en tu maquina, puedes iniciar y subir el repo con:

```bash
git init
git add .
git commit -m "Initial CyberForge foundations app"
```

Luego conectas tu repositorio remoto y haces push.

Si usas `gh` autenticado, tambien puedes crear el repo desde terminal con algo como:

```bash
gh repo create cyberforge --public --source=. --remote=origin --push
```
