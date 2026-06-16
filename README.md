# g-stack

An opinionated CLI scaffolder for modern full-stack TypeScript applications. One command, a few choices, and you get a production-ready project with authentication, database, validation, and UI — all wired together.

## Why g-stack

Starting a full-stack app means stitching together a framework, auth, database, ORM, validation, and UI library — then making sure they actually talk to each other. g-stack does that wiring for you in under a minute, so you can start building features instead of configuring boilerplate.

## Features

- **Interactive CLI** — guided prompts with no config files to learn
- **Next.js 15** with App Router, Server Components, and Turbopack
- **Authentication** — Better Auth or Auth.js, pre-configured with routes and API handlers
- **Database** — PostgreSQL with Prisma ORM, schema ready to extend
- **Validation** — Zod schemas and a utility layer
- **Shadcn UI** — optional component library with Field, InputGroup, Button, Card, Tooltip, and theme tokens
- **Dark mode by default** — Geist font, zinc palette, CSS variable theming
- **Zero src directory** — follows the Next.js default of keeping `app/`, `components/`, and `lib/` at the project root

## Quick Start

```bash
# Clone and install
git clone https://github.com/Grenish/create-fullstack-app.git g-stack
cd g-stack
bun install

# Run the scaffolder
bun run dev
```

The CLI will walk you through:

```
❯ Where should we create your project?  my-app
❯ Select authentication provider       Better Auth / Auth.js / Skip
❯ Select database                      PostgreSQL / Skip
❯ Validation library                   Zod / Skip
❯ Configure Shadcn UI?                 Yes / No
```

## Generated Project Structure

After scaffolding, the generated project looks like this:

```
my-app/
├── app/
│   ├── globals.css            # Tailwind + optional shadcn theme tokens
│   ├── layout.tsx             # Root layout (Geist font, dark mode)
│   ├── page.tsx               # Homepage
│   └── (auth)/
│       ├── signin/page.tsx    # Sign in page
│       ├── signup/page.tsx    # Sign up page
│       └── forget-password/page.tsx
├── components/                # Shared components
│   ├── ui/                    # shadcn primitives (if selected)
│   ├── google-button.tsx      # OAuth buttons (if shadcn + auth)
│   └── view-password.tsx      # Password toggle (if shadcn)
├── lib/
│   ├── utils.ts               # cn() utility (if shadcn)
│   ├── auth.ts                # Auth config (if auth selected)
│   └── prisma.ts              # Prisma client singleton (if db selected)
├── prisma/
│   └── schema.prisma          # Database schema (if db selected)
├── .env                       # Environment variables
├── .env.example               # Template for collaborators
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Stack Options

| Category       | Options                        | Notes                                       |
| -------------- | ------------------------------ | ------------------------------------------- |
| Framework      | Next.js 15                     | App Router, RSC, Turbopack                  |
| Authentication | Better Auth, Auth.js, Skip     | Better Auth auto-selects PostgreSQL         |
| Database       | PostgreSQL + Prisma, Skip      | Schema includes auth models when applicable |
| Validation     | Zod, Skip                      | Shared schema utilities                     |
| UI             | Shadcn UI, Skip                | Button, Card, Field, InputGroup, Tooltip    |

## Development

```bash
# Run the CLI locally
bun run dev

# Build (for distribution)
bun build src/index.ts --outdir dist --target bun
```

The scaffolder source lives in `src/`:

- `index.ts` — interactive prompt flow and progress display
- `types.ts` — shared interfaces
- `utils/project-generator.ts` — orchestrates template staging, merging, and file writing
- `utils/fs-helpers.ts` — file system utilities
- `utils/package-manager.ts` — detects bun/pnpm/yarn/npm
- `templates/` — all template definitions (base, auth, db, shadcn, validation, auth-pages)

## License

MIT
