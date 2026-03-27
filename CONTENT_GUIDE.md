# Content Guide

Esta guia define como ampliar o corregir contenido educativo en ZeroDay sin romper consistencia editorial ni calidad tecnica.

## Objetivo

ZeroDay busca explicar fundamentos de ciberseguridad de forma clara, practica y responsable. El contenido debe ayudar a aprender, no a impresionar con jerga ni a facilitar abuso real.

## Donde editar

- `src/data/coreData.js`: glosario, niveles, guia de estudio y tracks.
- `src/data/modules.js`: modulos, lecciones, flashcards y quizzes.

## Estructura minima de una leccion

Cada leccion debe incluir:

1. `title`: nombre corto y claro.
2. `summary`: una frase que explique por que importa.
3. `content`: HTML simple con al menos dos bloques explicativos reales.
4. `lab`: mini laboratorio guiado con pasos y preguntas.
5. `mistakes`: errores comunes o malentendidos tipicos.
6. `sources`: una fuente oficial, un recurso practico y una lectura opcional.

## Estandar editorial

- Escribe en espanol claro y tecnico.
- Explica primero el concepto y luego el riesgo o aplicacion.
- Prioriza fundamentos duraderos sobre hype.
- Evita promesas exageradas como "hackear cualquier cosa".
- Evita placeholders, texto vacio o afirmaciones no verificadas.

## Longitud esperada

- `summary`: 1 frase.
- `content`: apunta a 250-600 palabras reales por leccion en futuras ampliaciones.
- `mistakes`: 2 o mas puntos.
- `lab.questions`: al menos 2 preguntas.

## Fuentes aceptables

Prioriza:

- documentacion oficial de fabricantes
- NIST
- CISA
- MITRE
- Microsoft Learn
- AWS, Azure o GCP docs
- OWASP
- Cloudflare Learning
- PortSwigger Academy

Evita usar como unica base:

- blogs sin autor claro
- contenido generico sin fecha
- hilos virales
- respuestas de IA sin verificacion

## Limites de seguridad

No se aceptan contribuciones que:

- faciliten dano real contra sistemas de terceros
- incluyan payloads ofensivos sin contexto educativo ni mitigacion
- promuevan acceso no autorizado
- publiquen secretos, credenciales o datos reales

Las tecnicas ofensivas pueden explicarse solo dentro de un enfoque educativo, defensivo y responsable.

## Flashcards

Las flashcards deben:

- resumir una idea clave
- tener una respuesta breve y precisa
- evitar trivia irrelevante

## Quizzes

Cada modulo mantiene tres dificultades:

- `basico`: definicion o comprension inicial
- `aplicado`: usar el concepto en una situacion tecnica
- `escenario`: priorizar o decidir con contexto

Cada pregunta debe incluir `explanation`.

## Checklist para PRs de contenido

- La contribucion mejora claridad o cobertura real.
- Las fuentes son verificables y relevantes.
- El contenido sigue el tono y estructura del proyecto.
- `npm run build` sigue pasando.
- Si cambias referencias o expectativas, actualiza `README.md` o `CONTRIBUTING.md`.
