# PROMPT — Cross-Platform Boilerplate Template

> Copia e incolla questo prompt intero in Cursor, Claude Projects, o qualsiasi AI coding assistant.
> Sostituisci `[NOME_PROGETTO]` con il nome del tuo progetto prima di inviarlo.

---

## ISTRUZIONE PRINCIPALE

Sei un senior full-stack engineer. Il tuo compito è costruire un **monorepo boilerplate production-ready** chiamato `[NOME_PROGETTO]` che serva da template base per qualsiasi applicazione cross-platform futura.

Il template deve essere **completamente funzionante out-of-the-box**: clonato il repo, lanciato `pnpm install` e `docker-compose up`, deve partire senza errori con una schermata di login funzionante su tutte le piattaforme.

---

## STACK TECNOLOGICO — NON DEROGARE

### Package Manager
- **pnpm 9+** con workspaces

### Frontend (condiviso tra tutte le piattaforme)
- **React 18** + **TypeScript 5**
- **Tailwind CSS 3** con configurazione condivisa
- **shadcn/ui** — componenti copiati in `packages/ui/components/ui/`
- **Lucide React** — unica fonte di icone
- **Framer Motion** — animazioni
- **Zustand 4** — state management
- **TanStack Query 5** — server state e cache
- **React Hook Form 7** + **Zod 3** — form e validazione
- **react-i18next** — traduzioni su Desktop e Mobile
- **next-intl** — traduzioni su Web (Next.js)

### Desktop
- **Electron 31+**
- **electron-builder** — packaging Win/Mac/Linux
- **electron-updater** — auto-update
- **electron-store** — persistenza locale
- **safeStorage** di Electron — cifratura token

### Mobile
- **Capacitor 6+**
- `@capacitor/preferences` — storage sicuro (Keychain iOS / Keystore Android)
- `@capacitor/push-notifications`
- `@capacitor/haptics`
- `@capacitor/filesystem`

### Web SaaS
- **Next.js 14** con App Router
- Middleware per auth guard e redirect lingua
- Route `[locale]` per i18n

### API Backend
- **Fastify 4** + `@fastify/jwt` + `@fastify/cors` + `@fastify/multipart`
- **Prisma 5** ORM — PostgreSQL
- **Zod** + `@fastify/type-provider-zod` per validazione request/response
- **bcryptjs** — hashing password
- `@aws-sdk/client-s3` — upload file su MinIO/S3

### Infrastruttura
- **Docker Compose** — postgres, redis, minio, api, web, nginx
- **GitHub Actions** — CI/CD per tutte le piattaforme

---

## STRUTTURA DIRECTORY — RISPETTALA ESATTAMENTE

```
[NOME_PROGETTO]/
├── apps/
│   ├── desktop/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── preload.ts
│   │   │   └── renderer/         ← entry point che monta packages/ui
│   │   ├── electron-builder.yml
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── mobile/
│   │   ├── ios/
│   │   ├── android/
│   │   ├── capacitor.config.ts
│   │   ├── package.json
│   │   └── src/                  ← entry point che monta packages/ui
│   │
│   ├── web/
│   │   ├── app/
│   │   │   └── [locale]/
│   │   │       ├── login/
│   │   │       ├── register/
│   │   │       ├── dashboard/
│   │   │       └── layout.tsx
│   │   ├── middleware.ts
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/
│       ├── src/
│       │   ├── routes/
│       │   │   ├── auth.ts
│       │   │   └── index.ts
│       │   ├── middleware/
│       │   │   └── auth.ts
│       │   ├── lib/
│       │   │   ├── prisma.ts
│       │   │   └── jwt.ts
│       │   └── server.ts
│       ├── prisma/
│       │   └── schema.prisma
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/           ← shadcn components
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   └── RegisterForm.tsx
│   │   │   │   └── layout/
│   │   │   │       ├── AppShell.tsx
│   │   │   │       └── Sidebar.tsx
│   │   │   └── styles/
│   │   │       └── globals.css
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── core/
│   │   ├── src/
│   │   │   ├── adapters/
│   │   │   │   ├── storage/
│   │   │   │   │   ├── StorageAdapter.interface.ts
│   │   │   │   │   ├── ElectronStorageAdapter.ts
│   │   │   │   │   ├── CapacitorStorageAdapter.ts
│   │   │   │   │   ├── WebStorageAdapter.ts
│   │   │   │   │   └── index.ts  ← factory
│   │   │   │   └── notifications/
│   │   │   │       ├── NotificationAdapter.interface.ts
│   │   │   │       ├── WebNotificationAdapter.ts
│   │   │   │       ├── CapacitorNotificationAdapter.ts
│   │   │   │       └── index.ts
│   │   │   ├── api/
│   │   │   │   └── client.ts     ← fetch wrapper con auth headers
│   │   │   └── store/
│   │   │       └── auth.store.ts ← Zustand auth store
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/
│   │   ├── src/
│   │   │   └── index.ts          ← User, Session, ApiResponse<T>
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── it/
│   │   │   │   ├── common.json
│   │   │   │   └── auth.json
│   │   │   └── en/
│   │   │       ├── common.json
│   │   │       └── auth.json
│   │   ├── config.ts
│   │   └── package.json
│   │
│   └── config/
│       ├── eslint.config.js
│       ├── tailwind.config.js    ← configurazione Tailwind condivisa
│       ├── tsconfig.base.json
│       └── package.json
│
├── .github/
│   └── workflows/
│       ├── ci.yml                ← lint + typecheck + test su ogni PR
│       └── build.yml             ← build tutte le piattaforme su main
│
├── docker-compose.yml
├── docker-compose.dev.yml
├── nginx.conf
├── .env.example
├── pnpm-workspace.yaml
├── package.json                  ← root scripts
└── README.md
```

---

## SCHEMA PRISMA — BASE MINIMA

Implementa esattamente questo schema come punto di partenza:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String
  locale       String    @default("it")
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  sessions     Session[]
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  refreshToken String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())
}
```

---

## AUTENTICAZIONE — FLUSSO COMPLETO

Implementa questi endpoint in `apps/api/src/routes/auth.ts`:

| Metodo | Path | Descrizione |
|--------|------|-------------|
| POST | /auth/register | Crea account, ritorna tokens |
| POST | /auth/login | Login email+password, ritorna tokens |
| POST | /auth/refresh | Rinnova accessToken via refreshToken |
| POST | /auth/logout | Invalida refreshToken in DB |
| GET  | /auth/me | Ritorna utente corrente (richiede auth) |

**Regole JWT:**
- `accessToken` — scade in 15 minuti, firmato con `JWT_SECRET`
- `refreshToken` — scade in 30 giorni, firmato con `JWT_REFRESH_SECRET`, salvato in DB
- Middleware `authenticate` — verifica accessToken su tutte le route protette

**Regole storage token per piattaforma:**
- Electron → `safeStorage.encryptString()` + `electron-store`
- Capacitor → `@capacitor/preferences` (va su Keychain iOS / Keystore Android)
- Web → `httpOnly` cookie gestito dal server, il client non tocca mai il token

---

## ADAPTER LAYER — IMPLEMENTA TUTTI

### StorageAdapter
```typescript
interface StorageAdapter {
  getToken(): Promise<string | null>
  setToken(token: string): Promise<void>
  clearToken(): Promise<void>
}
```
- `ElectronStorageAdapter` → usa `window.electronAPI.getToken/setToken/clearToken` (via preload IPC)
- `CapacitorStorageAdapter` → usa `@capacitor/preferences`
- `WebStorageAdapter` → no-op (il token è in httpOnly cookie)
- Factory `createStorageAdapter()` → rileva env con `'Capacitor' in window` e `'electronAPI' in window`

### NotificationAdapter
```typescript
interface NotificationAdapter {
  send(title: string, body: string): Promise<void>
  requestPermission(): Promise<boolean>
}
```
- `WebNotificationAdapter` → `new Notification()` browser API
- `CapacitorNotificationAdapter` → `@capacitor/push-notifications`
- Factory con stessa logica di rilevamento

---

## ZUSTAND AUTH STORE

```typescript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login(email: string, password: string): Promise<void>
  register(email: string, password: string, name: string): Promise<void>
  logout(): Promise<void>
  refreshSession(): Promise<void>
  fetchMe(): Promise<void>
}
```

Lo store deve:
1. Usare `createStorageAdapter()` — mai accedere direttamente a localStorage o Electron API
2. Usare `apiClient` dal package core per tutte le chiamate HTTP
3. Gestire automaticamente il refresh token quando riceve 401

---

## API CLIENT

`packages/core/src/api/client.ts` deve:
- Aggiungere automaticamente `Authorization: Bearer {token}` ad ogni request
- Intercettare risposta 401 → chiamare `/auth/refresh` → riprovare la request originale
- Lanciare errori tipizzati con `ApiError` che include `statusCode` e `message`
- Supportare `credentials: 'include'` per i cookie web

---

## I18N — STRUTTURA FILE

```json
// locales/it/common.json
{
  "app": { "name": "[NOME_PROGETTO]", "tagline": "La tua app ovunque" },
  "nav": { "dashboard": "Dashboard", "settings": "Impostazioni", "logout": "Esci" },
  "actions": { "save": "Salva", "cancel": "Annulla", "delete": "Elimina", "confirm": "Conferma" },
  "errors": { "network": "Errore di rete", "generic": "Qualcosa è andato storto", "unauthorized": "Sessione scaduta" }
}

// locales/it/auth.json
{
  "login": {
    "title": "Accedi", "subtitle": "Bentornato",
    "email": "Email", "password": "Password",
    "submit": "Accedi", "register_link": "Non hai un account? Registrati"
  },
  "register": {
    "title": "Crea account", "subtitle": "Inizia gratuitamente",
    "name": "Nome", "email": "Email", "password": "Password",
    "submit": "Crea account", "login_link": "Hai già un account? Accedi"
  },
  "errors": {
    "invalid_credentials": "Email o password non corretti",
    "email_taken": "Email già registrata",
    "weak_password": "Password troppo corta (min. 8 caratteri)"
  }
}
```

Crea gli stessi file in `locales/en/` tradotti in inglese.

---

## COMPONENTI UI DA IMPLEMENTARE

### shadcn/ui da installare
Button, Input, Label, Card, CardHeader, CardContent, Form, Toast, Toaster, Separator, Avatar, DropdownMenu, Dialog, Badge, Skeleton

### Componenti custom da creare in `packages/ui`

**LoginForm.tsx**
- Form con email + password
- Validazione Zod in tempo reale
- Stato loading sul bottone durante la chiamata API
- Mostra errore API sotto il form
- Link verso RegisterForm

**RegisterForm.tsx**
- Form con nome + email + password
- Stessa struttura di LoginForm

**AppShell.tsx**
- Layout base post-login
- Sidebar collassabile su mobile
- Slot per contenuto principale (`children`)
- Header con nome utente + menu dropdown (profilo, impostazioni, logout)

**Sidebar.tsx**
- Lista di voci di navigazione (configurabile via props)
- Icona + label per ogni voce
- Voce attiva evidenziata
- Versione collassata su mobile (solo icone)

---

## ELECTRON — CONFIGURAZIONE SICURA

`apps/desktop/src/main.ts`:
```typescript
// BrowserWindow DEVE avere queste opzioni — non cambiarle mai
webPreferences: {
  nodeIntegration: false,   // MAI true
  contextIsolation: true,   // SEMPRE true
  sandbox: true,
  preload: path.join(__dirname, 'preload.js')
}
```

`apps/desktop/src/preload.ts` — esponi SOLO questi metodi via `contextBridge`:
```typescript
electronAPI: {
  getToken: () => ipcRenderer.invoke('get-token'),
  setToken: (token: string) => ipcRenderer.invoke('set-token', token),
  clearToken: () => ipcRenderer.invoke('clear-token'),
  platform: process.platform
}
```

---

## DOCKER COMPOSE

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment: { POSTGRES_DB: appdb, POSTGRES_USER: app, POSTGRES_PASSWORD: secret }
    volumes: [pgdata:/var/lib/postgresql/data]
    ports: ["5432:5432"]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment: { MINIO_ROOT_USER: minioadmin, MINIO_ROOT_PASSWORD: minioadmin }
    volumes: [miniodata:/data]
    ports: ["9000:9000", "9001:9001"]

  api:
    build: { context: ., dockerfile: apps/api/Dockerfile }
    environment:
      DATABASE_URL: postgresql://app:secret@postgres:5432/appdb
      JWT_SECRET: change_me_in_production
      JWT_REFRESH_SECRET: change_me_in_production_too
    depends_on: [postgres, redis, minio]
    ports: ["3000:3000"]

  web:
    build: { context: ., dockerfile: apps/web/Dockerfile }
    environment: { NEXT_PUBLIC_API_URL: http://api:3000 }
    depends_on: [api]
    ports: ["3001:3000"]

volumes: { pgdata: {}, miniodata: {} }
```

---

## GITHUB ACTIONS — CI/CD

### `.github/workflows/ci.yml` (su ogni PR)
- `pnpm install`
- `pnpm typecheck` (tutti i package)
- `pnpm lint`
- `pnpm test` (se esistono test)

### `.github/workflows/build.yml` (su push main)
- **Job 1**: Docker build + push → deploy API e Web
- **Job 2**: Matrix `[ubuntu-latest, macos-latest, windows-latest]` → build Electron
- **Job 3**: `ubuntu-latest` → build Android APK
- **Job 4**: `macos-latest` → build iOS IPA

---

## ROOT package.json — SCRIPTS OBBLIGATORI

```json
{
  "scripts": {
    "dev:api":     "pnpm --filter api dev",
    "dev:web":     "pnpm --filter web dev",
    "dev:desktop": "pnpm --filter desktop dev",
    "dev:all":     "concurrently \"pnpm dev:api\" \"pnpm dev:web\" \"pnpm dev:desktop\"",
    "build:all":   "pnpm -r build",
    "typecheck":   "pnpm -r typecheck",
    "lint":        "pnpm -r lint",
    "db:migrate":  "pnpm --filter api prisma migrate dev",
    "db:studio":   "pnpm --filter api prisma studio",
    "docker:up":   "docker-compose up -d",
    "docker:down": "docker-compose down"
  }
}
```

---

## .env.example — DA INCLUDERE NEL REPO

```env
# Database
DATABASE_URL=postgresql://app:secret@localhost:5432/appdb

# JWT
JWT_SECRET=cambia_questo_in_produzione_minimo_32_caratteri
JWT_REFRESH_SECRET=anche_questo_cambialo_minimo_32_caratteri

# MinIO / S3
S3_ENDPOINT=http://localhost:9000
S3_KEY=minioadmin
S3_SECRET=minioadmin
S3_BUCKET=app-files

# App
NEXT_PUBLIC_API_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000
```

---

## README.md — CONTENUTO MINIMO

Il README deve includere:
1. Prerequisiti (Node 20+, pnpm 9+, Docker, Xcode per iOS, Android Studio per Android)
2. Setup in 5 comandi (`git clone`, `pnpm install`, `cp .env.example .env`, `pnpm docker:up`, `pnpm db:migrate`)
3. Comandi di sviluppo (`pnpm dev:all`, `pnpm dev:desktop`, ecc.)
4. Struttura directory con spiegazione di ogni cartella
5. Come aggiungere un nuovo dominio applicativo (nuova entità Prisma + store Zustand + route API + componenti UI)
6. Come aggiungere una nuova lingua

---

## VINCOLI ASSOLUTI

1. **Zero hardcoded text** nei componenti — tutto passa per i18n
2. **Zero import diretti** di API Capacitor/Electron nei componenti React — solo via adapter
3. **Zero `localStorage`** — solo adapter storage
4. **Zero `any`** in TypeScript — tutto tipizzato
5. **Tailwind only** — nessun file `.css` custom a parte `globals.css`
6. **`contextIsolation: true`** in Electron — mai disabilitarlo
7. **Soft delete** su tutte le entità con `deletedAt: DateTime?`
8. **Ogni errore API** deve avere `statusCode` + `message` tipizzati

---

## OUTPUT ATTESO

Al termine, il repo deve:
- ✅ Avviarsi con `pnpm docker:up && pnpm dev:all` senza errori
- ✅ Mostrare login funzionante su browser (web), Electron (desktop) e Capacitor (mobile)
- ✅ Permettere registrazione, login, logout con token gestiti correttamente per piattaforma
- ✅ Avere TypeScript senza errori su tutti i package (`pnpm typecheck` verde)
- ✅ Essere pronto per aggiungere nuovi domini applicativi senza modificare il core

---

*Questo boilerplate implementa l'architettura descritta nel documento "Cross-Platform App Blueprint". Ogni progetto futuro si crea clonando questo repo e aggiungendo solo il dominio specifico (entità Prisma, store Zustand, route API, componenti UI).*
