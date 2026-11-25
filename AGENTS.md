# AGENTS.md

## Propósito
- Landing SPA de Equilibra para presentar el sistema y ofrecer descargas Android/iOS.
- Este repositorio solo contiene la web; firmware ESP32, app Flutter y servicios Firebase no están implementados aquí.

## Stack y herramientas
- Lenguajes: TypeScript estricto, TSX, CSS y HTML.
- UI: React 19 y React DOM; SPA sin router.
- Build/desarrollo: Vite 8 con `@vitejs/plugin-react`; npm y `package-lock.json`.
- Estado: estado local con `useState`; no hay gestor de estado global.
- Iconos: Lucide React y React Icons.
- Calidad: ESLint con reglas de TypeScript, React Hooks y React Refresh.
- Backend/base de datos: ninguno en runtime; la landing solo describe Firebase como parte del ecosistema externo.
- APIs externas: enlaces de descarga MediaFire y Google Fonts; no hay cliente HTTP.

## Mapa de arquitectura
```text
Equilibra-web/
├── src/
│   ├── App.tsx                 # Componente raíz; secciones, UI y simulaciones interactivas de la landing.
│   ├── main.tsx                # Entrada React; monta App, carga CSS e instala la protección de overlays.
│   ├── styles.css              # Diseño global, responsive, animaciones y estados visuales.
│   ├── overlayProtection.ts    # Detecta y elimina overlays externos fijos de alta prioridad.
│   └── config/
│       └── downloads.ts        # Tipos, versión, build y URLs de descarga Android/iOS.
├── public/
│   ├── logo.png                # Logo servido directamente por Vite.
│   └── robots.txt              # Directivas para rastreadores.
├── assets/
│   └── banner.svg              # Banner del README; no forma parte del runtime de la SPA.
├── index.html                  # Documento base, nodo `#root` y fuentes externas.
└── README.md                   # Descripción funcional, instalación y despliegue.
```

## Flujo de datos y comunicación
- `src/main.tsx` monta `App`; toda la interacción y el estado viven en el navegador.
- `App.tsx` consume `downloads` desde `src/config/downloads.ts` y genera enlaces directos de descarga.
- `VITE_IOS_MEDIAFIRE_URL` puede reemplazar en build la URL del IPA; las demás URLs están en `downloads.ts`.
- No existen llamadas a backend, base de datos ni Firebase en esta web; los enlaces externos se abren o descargan directamente.
- Vite genera archivos estáticos en `dist/`, publicables sin servidor de aplicación ni reglas de rutas SPA.

## Comandos del proyecto
```bash
npm ci               # Instalar dependencias desde package-lock.json
npm run dev          # Servidor de desarrollo Vite
npm run lint         # Análisis ESLint
npm run build        # Comprobar TypeScript y generar dist/
npm run preview      # Servir localmente el build de dist/
```
- Pruebas: no hay framework ni script de tests configurado en `package.json`.
- Ejecutable: no aplica; el artefacto de producción es el sitio estático generado en `dist/` por `npm run build`.

## Reglas para el agente
- Ir directo a los archivos indicados en el prompt sin escanear todo el repositorio innecesariamente.
- Respetar el tipado estricto y las convenciones existentes en el proyecto.
- Actualizar este `AGENTS.md` únicamente cuando se agreguen módulos, rutas o carpetas principales nuevas.
