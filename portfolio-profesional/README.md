# Portfolio profesional

## Desarrollo local

Requisitos: Node.js 22.12 o posterior y npm.

```bash
npm install
npm run dev
```

Abre http://localhost:3000. El servidor de desarrollo solo escucha en el equipo local.

No hace falta una clave de Gemini para ejecutar el portfolio. La sección de Google
Calendar requiere configurar Google como proveedor de Firebase Authentication,
autorizar `localhost` en Firebase y habilitar Google Calendar API en el proyecto
de Google asociado.

## Comprobaciones

```bash
npm run lint
npm run build
```
