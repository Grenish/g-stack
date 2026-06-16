
# Build g-stack v1

You are building a production-quality project scaffolding CLI called **g-stack**.

## Goal

Create a modern full-stack application generator that can be installed and executed via:

```bash
npm create g-stack@latest
```

The CLI should scaffold a complete application based on user selections.

This is version 1 of the project.

---

## Core Philosophy

g-stack should be:

* Opinionated
* Developer-friendly
* Type-safe
* Fast to scaffold
* Easy to extend in future versions
* Modular internally

The architecture must be designed so that additional frameworks, databases, authentication providers, ORMs, and tooling can be added later without major refactoring.

Do not hardcode everything into one giant template.

Use a composable template system.

---

## Supported Features (v1)

### Framework

Only support:

* Next.js
* App Router

No Pages Router support.

No React Vite support yet.

---

### Authentication

Prompt the user to choose:

* Better Auth
* Auth.js
* Skip Authentication

Authentication should be scaffolded and configured automatically.

---

### Database

Prompt the user to choose:

* PostgreSQL
* Skip Database

---

### ORM

If PostgreSQL is selected:

Use Prisma ORM.

Generate:

* Prisma schema
* Database client setup
* Environment variable placeholders

---

### Validation

Prompt the user:

* Zod
* Skip

If Zod is selected:

Generate a validation directory and example schema.

---

## CLI Flow

When executed:

```bash
npm create g-stack@latest
```

Display a welcome screen.

---

### Project Location

Ask:

```text
Where should we create your project?
```

Examples:

```text
my-app
```

or

```text
.
```

Rules:

If the user enters:

```text
.
```

Scaffold into the current directory.

If the user enters a project name:

```text
my-app
```

Create the directory and scaffold inside it.

---

### Authentication Prompt

Ask:

```text
Select authentication provider
```

Options:

* Better Auth
* Auth.js
* Skip

---

### Database Prompt

Ask:

```text
Select database
```

Options:

* PostgreSQL
* Skip

---

### Validation Prompt

Ask:

```text
Validation library
```

Options:

* Zod
* Skip

---

## Generated Project Structure

Base project should be organized and production-ready.

Example:

```text
src/
  app/
  components/
  lib/
  server/

prisma/

public/
```

Additional files should be generated based on selected features.

---

## Template Architecture

Design the generator around composable templates.

Example concept:

```text
templates/
  base/
  auth/
    better-auth/
    authjs/
  db/
    postgres/
  validation/
    zod/
```

The generator should:

1. Apply the base template.
2. Apply selected feature templates.
3. Merge configuration.
4. Generate dependencies.
5. Generate environment variables.
6. Produce a runnable project.

Future additions must be easy.

---

## Dependency Resolution

Features may depend on other features.

The generator must validate combinations before generation.

Example:

* Prisma requires PostgreSQL.
* PostgreSQL requires Prisma in v1.

Invalid combinations should be prevented.

---

## Package Manager Detection

Automatically detect:

* npm
* pnpm
* yarn
* bun

Generate commands and instructions accordingly.

---

## Generated Environment Variables

Generate a `.env.example`.

Only include variables required by selected features.

Examples:

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
AUTH_SECRET=
```

Do not generate unnecessary variables.

---

## Post Generation

After scaffolding:

1. Install dependencies.
2. Generate Prisma client if applicable.
3. Display next steps.

Example:

```bash
cd my-app
npm run dev
```

---

## Code Quality Requirements

Generated code must:

* Use TypeScript
* Be strongly typed
* Follow modern Next.js App Router patterns
* Avoid dead code
* Avoid placeholder TODOs
* Be runnable immediately after setup

---

## Future-Proofing

Design the internal architecture so future versions can add:

* React + Vite
* MongoDB
* Drizzle ORM
* tRPC
* Tailwind CSS presets
* Testing presets
* Monorepo generation

without redesigning the generator.

The implementation should prioritize maintainability and extensibility over shortcuts.

---

## Success Criteria

A user should be able to run:

```bash
npm create g-stack@latest
```

answer a few prompts,

and receive a working Next.js App Router project configured with their selected authentication, database, and validation options.

The generated application should start successfully with minimal additional setup.
