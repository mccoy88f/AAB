# AAB — Anywhere App Boilerplate

> Monorepo production-ready per costruire app su **Desktop**, **Mobile** e **Web SaaS** dalla stessa codebase.

## Stack

| Layer | Tecnologia |
|---|---|
| Frontend condiviso | React 18 + TypeScript 5 + Tailwind CSS + shadcn/ui |
| Desktop | Electron 31 (Win / macOS / Linux) |
| Mobile | Capacitor 6 (iOS / Android) |
| Web SaaS | Next.js 14 App Router |
| API Backend | Fastify 4 + Prisma 5 + PostgreSQL |
| Infrastruttura | Docker Compose (postgres, redis, minio) |
| i18n | Italiano + Inglese (estendibile) |

## Prerequisiti

- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)
- Docker + Docker Compose
- Xcode (solo iOS, richiede macOS)
- Android Studio + NDK (solo Android)

## Setup in 5 comandi

```bash
git clone https://github.com/TUO_USERNAME/aab.git
cd aab
pnpm install
cp .env.example .env
pnpm docker:up && pnpm db:migrate
```

```bash
pnpm dev:all        # API + Web + Desktop
pnpm dev:api        # solo API (porta 3000)
pnpm dev:web        # solo Web (porta 3001)
pnpm dev:desktop    # solo Electron
```

## Aggiungere un nuovo dominio

1. **Schema** — aggiungi modello in `apps/api/prisma/schema.prisma` → `pnpm db:migrate`
2. **Types** — aggiungi interfacce in `packages/types/src/index.ts`
3. **API** — crea `apps/api/src/routes/[dominio].ts` e registrala in `server.ts`
4. **Store** — crea `packages/core/src/store/[dominio].store.ts`
5. **UI** — crea componenti in `packages/ui/src/components/[dominio]/`
6. **Pagine** — aggiungi pagine in `apps/web/app/[locale]/[dominio]/`

## Aggiungere una lingua

1. Crea `packages/i18n/locales/[codice]/common.json` e `auth.json`
2. Aggiungi il codice in `packages/i18n/config.ts`

## Comandi utili

```bash
pnpm typecheck        # TypeScript check su tutto
pnpm lint             # ESLint su tutto
pnpm build:all        # Build produzione
pnpm docker:up        # Avvia Docker
pnpm docker:down      # Ferma Docker
pnpm docker:logs      # Log in tempo reale
pnpm db:migrate       # Migrazioni Prisma
pnpm db:studio        # Prisma Studio GUI
```

## Principi

- Zero text hardcodato — tutto via i18n
- Zero import diretti Capacitor/Electron nei componenti — solo adapter
- Zero localStorage — solo adapter storage (keychain/cookie)
- Zero `any` in TypeScript
- Soft delete su tutte le entità (`deletedAt`)
- Tailwind only — nessun CSS custom
