<p align="center">
  <h1 align="center">g-stack</h1>
  <p align="center">Scaffold a modern full-stack TypeScript app in seconds.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/create-g-stack"><img src="https://img.shields.io/npm/v/create-g-stack?color=magenta&label=npm" alt="npm version" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
</p>

---

## Usage

```bash
npx create-g-stack@latest
```

or with your preferred package manager:

```bash
# npm
npm create g-stack@latest

# pnpm
pnpm create g-stack@latest

# yarn
yarn create g-stack

# bun
bun create g-stack
```

The CLI walks you through a few choices and generates a ready-to-run project:

```
  g-stack • Bun v1.x • linux-x64
  Interactive project generator for modern fullstack apps

❯ Where should we create your project?   my-app
❯ Select authentication provider         Better Auth / Auth.js / Skip
❯ Select database                        PostgreSQL / Skip
❯ Validation library                     Zod / Skip
❯ Configure Shadcn UI?                   Yes / No
```

Once complete, `cd` into your project and run `npm run dev`.

---

## What you get

Every generated project ships with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4** out of the box. The rest is up to you:

| Layer | Options | What gets configured |
| --- | --- | --- |
| **Auth** | Better Auth · Auth.js · Skip | Route handlers, auth config, env secrets, Prisma schema models |
| **Database** | PostgreSQL + Prisma · Skip | `prisma/schema.prisma`, client singleton, `db:push` / `db:studio` scripts |
| **Validation** | Zod · Skip | Schema utilities |
| **UI** | Shadcn UI · Skip | `components.json`, component primitives, CSS theme variables, `cn()` utility |

Selecting **Better Auth** automatically enables PostgreSQL — it needs a database to store sessions and accounts.

---

## Generated project structure

```
my-app/
├── app/
│   ├── (auth)/
│   │   ├── signin/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forget-password/page.tsx
│   ├── api/auth/                    # Auth route handler
│   ├── globals.css                  # Tailwind + theme variables
│   ├── layout.tsx                   # Root layout, Geist font, dark mode
│   └── page.tsx                     # Homepage
├── components/
│   ├── ui/                          # Shadcn primitives (if selected)
│   ├── google-button.tsx
│   ├── x-button.tsx
│   └── view-password.tsx
├── lib/
│   ├── auth.ts                      # Auth configuration
│   ├── prisma.ts                    # Prisma client singleton
│   └── utils.ts                     # cn() helper
├── prisma/
│   └── schema.prisma
├── .env
├── .env.example
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

> Files and directories only appear when their corresponding option is selected. A project with no auth, no database, and no Shadcn will be a minimal Next.js + Tailwind setup.

---

## Environment variables

The CLI generates a `.env` with sensible defaults and a `.env.example` for collaborators. Update these before running in production:

| Variable | When present | Description |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL selected | Prisma connection string |
| `BETTER_AUTH_SECRET` | Better Auth selected | Randomly generated session secret |
| `BETTER_AUTH_URL` | Better Auth selected | App base URL (`http://localhost:3000`) |
| `AUTH_SECRET` | Auth.js selected | Randomly generated session secret |
| `GITHUB_CLIENT_ID` | Auth.js selected | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | Auth.js selected | GitHub OAuth app client secret |

---

## Available scripts

Every generated project includes these scripts:

```bash
npm run dev        # Start dev server (Turbopack is the default in Next.js 16)
npm run build      # Production build
npm run start      # Run production server
npm run lint       # ESLint
```

With PostgreSQL:

```bash
npm run db:generate   # Regenerate Prisma Client
npm run db:push       # Push schema to database
npm run db:studio     # Open Prisma Studio
```

---

## Tech stack

- [Next.js 16](https://nextjs.org) — App Router, React Server Components, Turbopack
- [React 19](https://react.dev) — Latest stable React
- [TypeScript 5](https://www.typescriptlang.org) — Strict mode enabled
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first CSS with `@tailwindcss/postcss`
- [Better Auth](https://www.better-auth.com) — Modern TypeScript-first authentication
- [Auth.js](https://authjs.dev) — Flexible authentication for Next.js
- [Prisma](https://www.prisma.io) — Type-safe ORM for PostgreSQL
- [Zod](https://zod.dev) — TypeScript-first schema validation
- [Shadcn UI](https://ui.shadcn.com) — Re-usable Radix-based components

---

## Contributing

```bash
# Clone the repo
git clone https://github.com/Grenish/g-stack.git
cd g-stack

# Install dependencies
bun install

# Run the CLI in development
bun run dev
```

### Source layout

```
src/
├── index.ts                  # CLI entry point and prompt flow
├── types.ts                  # Shared TypeScript interfaces
├── utils/
│   ├── project-generator.ts  # Template staging, merging, file writing
│   ├── fs-helpers.ts         # File system utilities
│   └── package-manager.ts    # Detects npm / pnpm / yarn / bun
└── templates/
    ├── base.ts               # Next.js base files
    ├── auth.ts               # Better Auth and Auth.js configs
    ├── auth-pages.ts         # Sign-in, sign-up, reset password pages
    ├── db.ts                 # Prisma schema and client
    ├── shadcn.ts             # Component primitives and theme
    └── validation.ts         # Zod utilities
```

---

## License

[MIT](LICENSE)
