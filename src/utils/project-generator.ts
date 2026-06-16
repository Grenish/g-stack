import path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { GeneratorOptions, TemplateFile } from "../types";
import { baseTemplate, plainHomepage, shadcnHomepage } from "../templates/base";
import { dbTemplate } from "../templates/db";
import {
  betterAuthTemplate,
  betterAuthSchemaSnippet,
  authJsTemplateWithDb,
  authJsTemplateWithoutDb,
  authJsSchemaSnippet,
} from "../templates/auth";
import { validationTemplate } from "../templates/validation";
import { shadcnTemplate, shadcnCssThemeSnippet } from "../templates/shadcn";
import { authPagesTemplateWithShadcn, authPagesTemplateWithoutShadcn } from "../templates/auth-pages";
import { ensureDir, writeFile, generateRandomSecret } from "./fs-helpers";
import { detectPackageManager, getInstallCommand } from "./package-manager";

const execAsync = promisify(exec);

/**
 * Main orchestrator for scaffolding the project.
 * Uses an in-memory virtual file map to stage, merge, and compile templates before writing them.
 */
export async function generateProject(
  options: GeneratorOptions,
  onProgress: (step: string) => void
) {
  const filesToWrite = new Map<string, string>();
  const targetDir = options.projectPath;

  // 1. Initialize dependencies lists
  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};
  const scripts: Record<string, string> = {};
  const envVars: Record<string, string> = {};
  const envExampleVars: Record<string, string> = {};

  // 2. Stage Base Template
  onProgress("Staging base template...");
  for (const file of baseTemplate) {
    filesToWrite.set(file.path, file.content);
  }

  // Stage home page according to Shadcn UI selection
  if (options.shadcn) {
    filesToWrite.set("app/page.tsx", shadcnHomepage);
  } else {
    filesToWrite.set("app/page.tsx", plainHomepage);
  }

  // Stage auth signin and signup pages
  const authPages = options.shadcn ? authPagesTemplateWithShadcn : authPagesTemplateWithoutShadcn;
  for (const file of authPages) {
    filesToWrite.set(file.path, file.content);
  }

  // Stage dynamic README
  filesToWrite.set("README.md", generateReadme(options));

  // Parse base package.json to start merging dependencies
  const basePackageJson = JSON.parse(filesToWrite.get("package.json") || "{}");
  Object.assign(dependencies, basePackageJson.dependencies);
  Object.assign(devDependencies, basePackageJson.devDependencies);
  Object.assign(scripts, basePackageJson.scripts);

  // Stage Shadcn configuration, components, and CSS theme if selected
  if (options.shadcn) {
    onProgress("Configuring Shadcn UI and component primitives...");
    for (const file of shadcnTemplate) {
      filesToWrite.set(file.path, file.content);
    }
    
    // Append Shadcn CSS theme variables block to app/globals.css
    const baseCss = filesToWrite.get("app/globals.css") || "";
    filesToWrite.set("app/globals.css", baseCss + "\n" + shadcnCssThemeSnippet);

    // Add shadcn UI dependencies
    dependencies["class-variance-authority"] = "^0.7.0";
    dependencies["clsx"] = "^2.1.0";
    dependencies["tailwind-merge"] = "^2.2.2";
    dependencies["@radix-ui/react-slot"] = "^1.0.2";
    dependencies["@radix-ui/react-label"] = "^2.0.2";
    dependencies["@radix-ui/react-tooltip"] = "^1.1.2";
    dependencies["@phosphor-icons/react"] = "^2.1.7";
    dependencies["lucide-react"] = "^0.468.0";
  }

  // 3. Stage Database/ORM templates
  if (options.db === "postgresql") {
    onProgress("Configuring PostgreSQL and Prisma ORM...");
    for (const file of dbTemplate) {
      filesToWrite.set(file.path, file.content);
    }
    dependencies["@prisma/client"] = "^5.10.0";
    devDependencies["prisma"] = "^5.10.0";
    scripts["db:generate"] = "prisma generate";
    scripts["db:push"] = "prisma db push";
    scripts["db:studio"] = "prisma studio";
    envVars["DATABASE_URL"] = "postgresql://postgres:postgres@localhost:5432/gstack?schema=public";
    envExampleVars["DATABASE_URL"] = "postgresql://postgres:postgres@localhost:5432/gstack?schema=public";
  }

  // 4. Stage Auth templates
  if (options.auth === "better-auth") {
    onProgress("Configuring Better Auth...");
    for (const file of betterAuthTemplate) {
      filesToWrite.set(file.path, file.content);
    }
    dependencies["better-auth"] = "^1.1.0";
    
    // Generate secrets
    const secret = generateRandomSecret();
    envVars["BETTER_AUTH_SECRET"] = secret;
    envVars["BETTER_AUTH_URL"] = "http://localhost:3000";
    envExampleVars["BETTER_AUTH_SECRET"] = "";
    envExampleVars["BETTER_AUTH_URL"] = "http://localhost:3000";

    // Merge prisma schema if database is active
    if (options.db === "postgresql") {
      const baseSchema = filesToWrite.get("prisma/schema.prisma") || "";
      filesToWrite.set("prisma/schema.prisma", baseSchema + betterAuthSchemaSnippet);
    }
  } else if (options.auth === "authjs") {
    onProgress("Configuring Auth.js...");
    const authJsFiles = options.db === "postgresql" ? authJsTemplateWithDb : authJsTemplateWithoutDb;
    for (const file of authJsFiles) {
      filesToWrite.set(file.path, file.content);
    }
    dependencies["next-auth"] = "^5.0.0-beta.25";
    
    const secret = generateRandomSecret();
    envVars["AUTH_SECRET"] = secret;
    envExampleVars["AUTH_SECRET"] = "";

    // GitHub OAuth variables
    envVars["GITHUB_CLIENT_ID"] = "";
    envVars["GITHUB_CLIENT_SECRET"] = "";
    envExampleVars["GITHUB_CLIENT_ID"] = "";
    envExampleVars["GITHUB_CLIENT_SECRET"] = "";

    if (options.db === "postgresql") {
      dependencies["@auth/prisma-adapter"] = "^2.0.0";
      const baseSchema = filesToWrite.get("prisma/schema.prisma") || "";
      filesToWrite.set("prisma/schema.prisma", baseSchema + authJsSchemaSnippet);
    }
  }

  // 5. Stage Validation templates
  if (options.validation === "zod") {
    onProgress("Configuring Zod validation...");
    for (const file of validationTemplate) {
      filesToWrite.set(file.path, file.content);
    }
    dependencies["zod"] = "^3.22.4";
  }

  // 6. Compile & update package.json
  const finalPackageJson = {
    ...basePackageJson,
    name: options.projectName,
    scripts,
    dependencies: Object.fromEntries(Object.entries(dependencies).sort()),
    devDependencies: Object.fromEntries(Object.entries(devDependencies).sort()),
  };
  filesToWrite.set("package.json", JSON.stringify(finalPackageJson, null, 2));

  // 7. Compile environment variables
  if (Object.keys(envVars).length > 0) {
    const envContent = Object.entries(envVars)
      .map(([key, val]) => `${key}="${val}"`)
      .join("\n") + "\n";
    const envExampleContent = Object.entries(envExampleVars)
      .map(([key, val]) => `${key}="${val}"`)
      .join("\n") + "\n";

    filesToWrite.set(".env", envContent);
    filesToWrite.set(".env.example", envExampleContent);
  }

  // 8. Write staged files to disk
  onProgress("Scaffolding project files...");
  ensureDir(targetDir);

  for (const [relPath, content] of filesToWrite.entries()) {
    const fullPath = path.join(targetDir, relPath);
    await writeFile(fullPath, content);
  }

  // 9. Run Installation
  const pm = detectPackageManager();
  onProgress(`Installing dependencies using ${pm}...`);
  const installCmd = getInstallCommand(pm);
  
  try {
    await execAsync(installCmd, { cwd: targetDir });
  } catch (error: any) {
    throw new Error(`Failed to install dependencies: ${error.message}`);
  }

  // 10. Run database client generator if applicable
  if (options.db === "postgresql") {
    onProgress("Generating Prisma Client...");
    try {
      const pmPrefix = pm === "npm" ? "npx" : pm === "pnpm" ? "pnpm dlx" : pm === "yarn" ? "yarn dlx" : "bunx";
      await execAsync(`${pmPrefix} prisma generate`, { cwd: targetDir });
    } catch (error: any) {
      throw new Error(`Failed to generate Prisma client: ${error.message}`);
    }
  }
}

/**
 * Generates a project-specific README.md based on the selected options.
 */
function generateReadme(options: GeneratorOptions): string {
  const { projectName, auth, db, validation, shadcn } = options;

  const stackItems: string[] = ["Next.js 15", "TypeScript", "Tailwind CSS v4"];
  if (shadcn) stackItems.push("Shadcn UI");
  if (auth === "better-auth") stackItems.push("Better Auth");
  else if (auth === "authjs") stackItems.push("Auth.js");
  if (db === "postgresql") stackItems.push("PostgreSQL", "Prisma ORM");
  if (validation === "zod") stackItems.push("Zod");

  const stackList = stackItems.map((s) => `- ${s}`).join("\n");

  // Getting started steps
  const steps: string[] = [];
  steps.push("Install dependencies:\n\n```bash\nnpm install\n```");
  if (db === "postgresql") {
    steps.push("Configure your database connection in `.env`:\n\n```\nDATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/gstack?schema=public\"\n```");
    steps.push("Push the database schema:\n\n```bash\nnpx prisma db push\n```");
  }
  if (auth !== "skip") {
    steps.push("Review and update auth-related environment variables in `.env`.");
  }
  steps.push("Start the dev server:\n\n```bash\nnpm run dev\n```");
  steps.push("Open [http://localhost:3000](http://localhost:3000) in your browser.");

  const numberedSteps = steps.map((s, i) => `${i + 1}. ${s}`).join("\n\n");

  // Project structure
  const structureLines: string[] = [
    `${projectName}/`,
    "├── app/",
    "│   ├── globals.css",
    "│   ├── layout.tsx",
    "│   ├── page.tsx",
    "│   └── (auth)/",
    "│       ├── signin/page.tsx",
    "│       ├── signup/page.tsx",
    "│       └── forget-password/page.tsx",
  ];

  if (shadcn) {
    structureLines.push(
      "├── components/",
      "│   ├── ui/                  # shadcn primitives",
      "│   ├── google-button.tsx",
      "│   ├── x-button.tsx",
      "│   └── view-password.tsx",
      "├── lib/",
      "│   └── utils.ts             # cn() utility"
    );
  }

  if (db === "postgresql") {
    structureLines.push(
      "├── lib/",
      "│   └── prisma.ts            # Prisma client singleton",
      "├── prisma/",
      "│   └── schema.prisma"
    );
  }

  if (auth === "better-auth") {
    structureLines.push(
      "├── lib/",
      "│   └── auth.ts              # Better Auth config",
      "├── app/api/auth/[...all]/route.ts"
    );
  } else if (auth === "authjs") {
    structureLines.push(
      "├── lib/",
      "│   └── auth.ts              # Auth.js config",
      "├── app/api/auth/[...nextauth]/route.ts"
    );
  }

  structureLines.push(
    "├── .env",
    "├── .env.example",
    "├── next.config.ts",
    "├── tailwind.config.ts",
    "├── tsconfig.json",
    "└── package.json"
  );

  const structure = structureLines.join("\n");

  // Scripts section
  const scripts = [
    "| `dev` | `next dev` | Start development server with Turbopack |",
    "| `build` | `next build` | Create production build |",
    "| `start` | `next start` | Run production server |",
    "| `lint` | `next lint` | Run ESLint |",
  ];

  if (db === "postgresql") {
    scripts.push(
      "| `db:generate` | `prisma generate` | Regenerate Prisma Client |",
      "| `db:push` | `prisma db push` | Push schema to database |",
      "| `db:studio` | `prisma studio` | Open Prisma Studio GUI |"
    );
  }

  const scriptsTable = `| Script | Command | Description |\n| --- | --- | --- |\n${scripts.join("\n")}`;

  return `# ${projectName}

A full-stack TypeScript application scaffolded with [g-stack](https://github.com/Grenish/create-fullstack-app).

## Stack

${stackList}

## Getting Started

${numberedSteps}

## Project Structure

\`\`\`
${structure}
\`\`\`

## Available Scripts

${scriptsTable}

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)${auth === "better-auth" ? "\n- [Better Auth Documentation](https://www.better-auth.com/docs)" : ""}${auth === "authjs" ? "\n- [Auth.js Documentation](https://authjs.dev)" : ""}${db === "postgresql" ? "\n- [Prisma Documentation](https://www.prisma.io/docs)" : ""}${validation === "zod" ? "\n- [Zod Documentation](https://zod.dev)" : ""}${shadcn ? "\n- [Shadcn UI Documentation](https://ui.shadcn.com)" : ""}

---

Scaffolded with g-stack.
`;
}
