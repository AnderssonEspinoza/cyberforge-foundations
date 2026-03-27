# Maintainer Setup

Esta guia cubre los pasos manuales en GitHub para que ZeroDay reciba contribuciones de forma segura.

## 1. Proteger `main`

En GitHub ve a:

`Settings -> Branches -> Add branch protection rule`

Usa `main` y activa:

1. Require a pull request before merging
2. Require approvals
3. Dismiss stale pull request approvals when new commits are pushed
4. Require status checks to pass before merging
5. Require review from Code Owners
6. Require branches to be up to date before merging
7. Require conversation resolution before merging
8. Do not allow bypassing the above settings

Nota:

En algunas interfaces de GitHub no aparece la opcion `Restrict who can push to matching branches`. Si no la ves, no pasa nada: con PR obligatorio, approvals, checks requeridos y sin bypass ya tienes una proteccion fuerte para `main`.

## 2. Checks recomendados

Cuando el workflow `CI` aparezca en GitHub Actions, activalo como required status check para `main`.

## 3. Flujo recomendado para contribuciones

1. Contributors crean rama desde `main`
2. Abren Pull Request
3. CI valida build
4. `CODEOWNERS` te solicita review
5. Apruebas o pides cambios
6. Merge solo desde PR

## 4. Labels recomendados

Configura estos labels en GitHub:

- `good first issue`
- `help wanted`
- `content`
- `ui`
- `bug`
- `needs sources`
- `docs`

## 5. Tareas abiertas para comunidad

Usa los borradores de `docs/issue-drafts.md` para crear las primeras issues manualmente si quieres promover contribuciones rapidamente.

## 6. Topics sugeridos para GitHub

En la seccion `About` del repositorio, agrega topics para mejorar descubrimiento:

- `cybersecurity`
- `microlearning`
- `react`
- `vite`
- `education`
- `open-source`
- `javascript`
- `tailwindcss`
