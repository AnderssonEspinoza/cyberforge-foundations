# Issue Drafts

Estos borradores estan listos para crear issues manualmente en GitHub.

## 1. Expandir modulo de redes con mas profundidad

**Title**
`Expand networking lessons with deeper OSI/TCP/DNS examples`

**Body**
Queremos ampliar las lecciones del modulo de redes para que expliquen mejor OSI, handshake TCP, puertos, DNS y segmentacion. La meta no es agregar relleno sino mejorar claridad y profundidad para principiantes.

Alcance sugerido:

- ampliar `m1l1` y `m1l2` en `src/data/modules.js`
- mantener el tono claro y educativo
- agregar o mejorar errores comunes
- conservar mini lab y preguntas
- citar fuentes verificables segun `CONTENT_GUIDE.md`

Checklist:

- [ ] build pasa con `npm run build`
- [ ] contenido nuevo sigue la guia editorial
- [ ] se agregaron o actualizaron fuentes confiables

Labels sugeridos:
`good first issue`, `content`, `needs sources`

## 2. Mejorar accesibilidad y navegacion movil

**Title**
`Improve mobile navigation and accessibility across key screens`

**Body**
ZeroDay se usa mucho desde celular. Queremos mejorar foco visual, navegacion por teclado, estados activos y legibilidad en pantallas pequenas.

Areas sugeridas:

- barra de navegacion inferior
- formularios de notas
- botones de seguimiento y quizzes
- contraste y estados hover/focus

Checklist:

- [ ] no rompe layout mobile
- [ ] `npm run build` pasa
- [ ] cambios revisados en navegacion principal

Labels sugeridos:
`good first issue`, `ui`

## 3. Añadir mas glosario y referencias oficiales

**Title**
`Add glossary terms and verified reference links`

**Body**
Queremos ampliar el glosario con terminos frecuentes para principiantes y mejorar el puente hacia documentacion oficial.

Ejemplos de terminos:

- MFA fatigue
- pass-the-hash
- blast radius
- secrets management
- hardening

Condiciones:

- definiciones cortas y precisas
- nada de jerga vacia
- usar fuentes verificables

Labels sugeridos:
`good first issue`, `content`, `docs`

## 4. Separar `src/data/modules.js` por dominios

**Title**
`Split learning modules into domain-based data files`

**Body**
Ahora el catalogo de modulos ya no vive en `appData.js`, pero aun esta concentrado en `src/data/modules.js`. Queremos dividirlo por dominios para que colaborar en contenido sea menos intimidante.

Objetivo:

- crear archivos por dominio o modulo
- mantener export estable para el resto de la app
- no cambiar comportamiento visible

Checklist:

- [ ] imports actualizados
- [ ] `npm run build` pasa
- [ ] no cambia la API consumida por las paginas

Labels sugeridos:
`help wanted`, `content`, `refactor`

## 5. Mejorar cobertura de quizzes

**Title**
`Improve quiz coverage with stronger applied and scenario questions`

**Body**
Queremos que los quizzes no midan solo memoria, sino criterio. La meta es reforzar preguntas `aplicado` y `escenario` en los modulos actuales.

Ideas:

- preguntas con priorizacion
- decisiones segun contexto
- diferenciar autenticacion y autorizacion
- usar cloud, identidad, logs y CVEs con mas criterio real

Checklist:

- [ ] cada pregunta incluye explicacion
- [ ] se mantiene lenguaje claro
- [ ] `npm run build` pasa

Labels sugeridos:
`help wanted`, `content`
