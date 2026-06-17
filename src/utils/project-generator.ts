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
  clerkTemplate,
  auth0Template,
  clerkLayoutTemplate,
  auth0LayoutTemplate,
} from "../templates/auth";
import { validationTemplate } from "../templates/validation";
import { shadcnTemplate, shadcnCssThemeSnippet } from "../templates/shadcn";
import { authPagesTemplateWithShadcn, authPagesTemplateWithoutShadcn } from "../templates/auth-pages";
import { resendTemplate } from "../templates/email";
import { getDockerTemplate } from "../templates/docker";
import { ensureDir, writeFile, generateRandomSecret } from "./fs-helpers";
import { detectPackageManager, getInstallCommand } from "./package-manager";

const execAsync = promisify(exec);

/**
 * Staging representation of the project in memory.
 */
export interface StagedProject {
  files: Map<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

/**
 * Stages all template files, package.json dependencies, and configs in-memory.
 */
export function stageProject(options: GeneratorOptions): StagedProject {
  const files = new Map<string, string>();
  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};
  const scripts: Record<string, string> = {};
  const envVars: Record<string, string> = {};
  const envExampleVars: Record<string, string> = {};

  // 1. Stage Base Template
  for (const file of baseTemplate) {
    files.set(file.path, file.content);
  }


  // Stage home page according to Shadcn UI selection
  let homepage = options.shadcn ? shadcnHomepage : plainHomepage;
  if (options.auth === "auth0") {
    homepage = homepage.replace(/href="\/signin"/g, 'href="/api/auth/login"');
  }
  files.set("app/page.tsx", homepage);

  // Stage auth signin and signup pages only if we are using Better Auth or Auth.js (which we build custom pages for).
  // For Clerk, it renders its own routes inside signin/[[...signin]] and signup/[[...signup]].
  // For Auth0, it redirects to the Auth0 hosted pages.
  if (options.auth === "better-auth" || options.auth === "authjs") {
    const authPages = options.shadcn ? authPagesTemplateWithShadcn : authPagesTemplateWithoutShadcn;
    for (const file of authPages) {
      files.set(file.path, file.content);
    }
  }

  // Parse base package.json to start merging dependencies
  const basePackageJson = JSON.parse(files.get("package.json") || "{}");
  Object.assign(dependencies, basePackageJson.dependencies);
  Object.assign(devDependencies, basePackageJson.devDependencies);
  Object.assign(scripts, basePackageJson.scripts);

  // Stage Shadcn configuration, components, and CSS theme if selected
  if (options.shadcn) {
    for (const file of shadcnTemplate) {
      files.set(file.path, file.content);
    }
    
    // Append Shadcn CSS theme variables block to app/globals.css
    const baseCss = files.get("app/globals.css") || "";
    files.set("app/globals.css", baseCss + "\n" + shadcnCssThemeSnippet);

    // Add shadcn UI dependencies
    dependencies["class-variance-authority"] = "^0.7.1";
    dependencies["clsx"] = "^2.1.1";
    dependencies["tailwind-merge"] = "^3.6.0";
    dependencies["radix-ui"] = "^1.6.0";
    dependencies["shadcn"] = "^4.11.0";
    dependencies["tw-animate-css"] = "^1.4.0";
    dependencies["@phosphor-icons/react"] = "^2.1.7";
    dependencies["lucide-react"] = "^0.468.0";
  }

  // 3. Stage Database/ORM templates
  if (options.db === "postgresql") {
    for (const file of dbTemplate) {
      files.set(file.path, file.content);
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
    for (const file of betterAuthTemplate) {
      files.set(file.path, file.content);
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
      const baseSchema = files.get("prisma/schema.prisma") || "";
      files.set("prisma/schema.prisma", baseSchema + betterAuthSchemaSnippet);
    }
  } else if (options.auth === "authjs") {
    const authJsFiles = options.db === "postgresql" ? authJsTemplateWithDb : authJsTemplateWithoutDb;
    for (const file of authJsFiles) {
      files.set(file.path, file.content);
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
      const baseSchema = files.get("prisma/schema.prisma") || "";
      files.set("prisma/schema.prisma", baseSchema + authJsSchemaSnippet);
    }
  } else if (options.auth === "clerk") {
    // Stage Clerk views/proxy
    for (const file of clerkTemplate) {
      files.set(file.path, file.content);
    }
    // Override layout.tsx
    files.set("app/layout.tsx", clerkLayoutTemplate);

    dependencies["@clerk/nextjs"] = "^6.0.0";
    
    envVars["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"] = "";
    envVars["CLERK_SECRET_KEY"] = "";
    envVars["NEXT_PUBLIC_CLERK_SIGN_IN_URL"] = "/signin";
    envVars["NEXT_PUBLIC_CLERK_SIGN_UP_URL"] = "/signup";
    envExampleVars["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"] = "";
    envExampleVars["CLERK_SECRET_KEY"] = "";
    envExampleVars["NEXT_PUBLIC_CLERK_SIGN_IN_URL"] = "/signin";
    envExampleVars["NEXT_PUBLIC_CLERK_SIGN_UP_URL"] = "/signup";
  } else if (options.auth === "auth0") {
    // Stage Auth0 routes
    for (const file of auth0Template) {
      files.set(file.path, file.content);
    }
    // Override layout.tsx
    files.set("app/layout.tsx", auth0LayoutTemplate);

    dependencies["@auth0/nextjs-auth0"] = "^3.5.0";

    const secret = generateRandomSecret();
    envVars["AUTH0_SECRET"] = secret;
    envVars["AUTH0_BASE_URL"] = "http://localhost:3000";
    envVars["AUTH0_ISSUER_BASE_URL"] = "";
    envVars["AUTH0_CLIENT_ID"] = "";
    envVars["AUTH0_CLIENT_SECRET"] = "";
    envExampleVars["AUTH0_SECRET"] = "";
    envExampleVars["AUTH0_BASE_URL"] = "http://localhost:3000";
    envExampleVars["AUTH0_ISSUER_BASE_URL"] = "";
    envExampleVars["AUTH0_CLIENT_ID"] = "";
    envExampleVars["AUTH0_CLIENT_SECRET"] = "";
  }

  // 5. Stage Validation templates
  if (options.validation === "zod") {
    for (const file of validationTemplate) {
      files.set(file.path, file.content);
    }
    dependencies["zod"] = "^3.22.4";
  }

  // 6. Stage Resend email templates
  if (options.email === "resend") {
    for (const file of resendTemplate) {
      files.set(file.path, file.content);
    }
    dependencies["resend"] = "^4.0.0";
    envVars["RESEND_API_KEY"] = "";
    envExampleVars["RESEND_API_KEY"] = "";
  }

  // 7. Stage Docker templates
  if (options.docker) {
    const dockerFiles = getDockerTemplate(options.db === "postgresql");
    for (const file of dockerFiles) {
      files.set(file.path, file.content);
    }
  }

  // 8. Compile & update package.json
  const finalPackageJson = {
    ...basePackageJson,
    name: options.projectName,
    scripts,
    dependencies: Object.fromEntries(Object.entries(dependencies).sort()),
    devDependencies: Object.fromEntries(Object.entries(devDependencies).sort()),
  };
  files.set("package.json", JSON.stringify(finalPackageJson, null, 2));

  // 9. Compile environment variables
  if (Object.keys(envVars).length > 0) {
    const envContent = Object.entries(envVars)
      .map(([key, val]) => `${key}="${val}"`)
      .join("\n") + "\n";
    const envExampleContent = Object.entries(envExampleVars)
      .map(([key, val]) => `${key}="${val}"`)
      .join("\n") + "\n";

    files.set(".env", envContent);
    files.set(".env.example", envExampleContent);
  }

  // 10. Stage dynamic README
  files.set("README.md", generateReadme(options));

  // Post-process layout.tsx if shadcn is enabled to use preset fonts (Instrument Sans and Figtree)
  if (options.shadcn) {
    let layoutContent = files.get("app/layout.tsx") || "";
    if (layoutContent) {
      layoutContent = layoutContent
        .replace(
          'import { Geist, Geist_Mono } from "next/font/google";',
          'import { Instrument_Sans, Figtree } from "next/font/google";'
        )
        .replace(
          /const geistSans = Geist\(\{[\s\S]*?\}\);/g,
          `const fontSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});`
        )
        .replace(
          /const geistMono = Geist_Mono\(\{[\s\S]*?\}\);/g,
          `const fontHeading = Figtree({
  variable: "--font-heading",
  subsets: ["latin"],
});`
        )
        .replace(
          /\${geistSans\.variable}\s+\${geistMono\.variable}/g,
          "${fontSans.variable} ${fontHeading.variable}"
        );
      files.set("app/layout.tsx", layoutContent);
    }
  }

  return {
    files,
    dependencies,
    devDependencies,
  };
}

/**
 * Writes staged files to disk and triggers installation steps.
 */
export async function writeStagedProject(
  options: GeneratorOptions,
  staged: StagedProject,
  onProgress: (step: string) => void
) {
  const targetDir = options.projectPath;

  // 1. Write staged files to disk
  onProgress("Scaffolding project files...");
  ensureDir(targetDir);

  for (const [relPath, content] of staged.files.entries()) {
    const fullPath = path.join(targetDir, relPath);
    await writeFile(fullPath, content);
  }

  // 2. Run Installation if not skipped
  const pm = detectPackageManager();
  if (!options.skipInstall) {
    onProgress(`Installing dependencies using ${pm}...`);
    const installCmd = getInstallCommand(pm);
    
    try {
      await execAsync(installCmd, { cwd: targetDir });
    } catch (error: any) {
      throw new Error(`Failed to install dependencies: ${error.message}`);
    }

    // 3. Run database client generator if applicable
    if (options.db === "postgresql") {
      onProgress("Generating Prisma Client...");
      try {
        const pmPrefix = pm === "npm" ? "npx" : pm === "pnpm" ? "pnpm dlx" : pm === "yarn" ? "yarn dlx" : "bunx";
        await execAsync(`${pmPrefix} prisma generate`, { cwd: targetDir });
      } catch (error: any) {
        throw new Error(`Failed to generate Prisma client: ${error.message}`);
      }
    }
  } else {
    onProgress("Skipped dependency installation (run installation command manually).");
  }
}

/**
 * Legacy orchestrator for scaffolding the project directly (stages and writes).
 */
export async function generateProject(
  options: GeneratorOptions,
  onProgress: (step: string) => void
) {
  const staged = stageProject(options);
  await writeStagedProject(options, staged, onProgress);
}

/**
 * Generates a project-specific README.md based on the selected options.
 */
function generateReadme(options: GeneratorOptions): string {
  const { projectName, auth, db, validation, shadcn, docker, email } = options;

  const stackItems: string[] = ["Next.js 16", "TypeScript", "Tailwind CSS v4"];
  if (shadcn) stackItems.push("Shadcn UI");
  if (auth === "better-auth") stackItems.push("Better Auth");
  else if (auth === "authjs") stackItems.push("Auth.js");
  else if (auth === "clerk") stackItems.push("Clerk");
  else if (auth === "auth0") stackItems.push("Auth0");
  if (db === "postgresql") stackItems.push("PostgreSQL", "Prisma ORM");
  if (validation === "zod") stackItems.push("Zod");
  if (email === "resend") stackItems.push("Resend Email");
  if (docker) stackItems.push("Docker Containerization");

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
  if (email === "resend") {
    steps.push("Set your `RESEND_API_KEY` in `.env`.");
  }
  steps.push("Start the dev server:\n\n```bash\nnpm run dev\n```");
  steps.push("Open [http://localhost:3000](http://localhost:3000) in your browser.");

  if (docker) {
    steps.push("Alternatively, build and run the application via Docker:\n\n```bash\ndocker-compose up --build\n```");
  }

  const numberedSteps = steps.map((s, i) => `${i + 1}. ${s}`).join("\n\n");

  // Project structure
  const structureLines: string[] = [
    `${projectName}/`,
    "├── app/",
    "│   ├── globals.css",
    "│   ├── layout.tsx",
    "│   ├── page.tsx",
  ];

  if (auth === "better-auth" || auth === "authjs") {
    structureLines.push(
      "│   └── (auth)/",
      "│       ├── signin/page.tsx",
      "│       ├── signup/page.tsx",
      "│       └── forget-password/page.tsx"
    );
  } else if (auth === "clerk") {
    structureLines.push(
      "│   └── (auth)/",
      "│       ├── signin/[[...signin]]/page.tsx",
      "│       └── signup/[[...signup]]/page.tsx",
      "├── proxy.ts"
    );
  } else if (auth === "auth0") {
    structureLines.push(
      "│   └── api/auth/[auth0]/route.ts"
    );
  }

  if (shadcn && (auth === "better-auth" || auth === "authjs")) {
    structureLines.push(
      "├── components/",
      "│   ├── ui/                  # shadcn primitives",
      "│   ├── google-button.tsx",
      "│   ├── x-button.tsx",
      "│   └── view-password.tsx",
      "├── lib/",
      "│   └── utils.ts             # cn() utility"
    );
  } else if (shadcn) {
    structureLines.push(
      "├── components/",
      "│   └── ui/                  # shadcn primitives",
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
      "│   └── auth.ts              # Better Auth config"
    );
  } else if (auth === "authjs") {
    structureLines.push(
      "├── lib/",
      "│   └── auth.ts              # Auth.js config"
    );
  }

  if (email === "resend") {
    structureLines.push(
      "├── lib/",
      "│   └── resend.ts            # Resend client helper"
    );
  }

  if (docker) {
    structureLines.push(
      "├── Dockerfile",
      "├── docker-compose.yml",
      "├── .dockerignore"
    );
  }

  structureLines.push(
    "├── .env",
    "├── .env.example",
    "├── next.config.ts",
    "├── postcss.config.mjs",
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

A full-stack TypeScript application scaffolded with [g-stack](https://github.com/Grenish/g-stack).

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

- [Next.js Documentation](https://nextjs.org/docs)${auth === "better-auth" ? "\n- [Better Auth Documentation](https://www.better-auth.com/docs)" : ""}${auth === "authjs" ? "\n- [Auth.js Documentation](https://authjs.dev)" : ""}${auth === "clerk" ? "\n- [Clerk Documentation](https://clerk.com/docs)" : ""}${auth === "auth0" ? "\n- [Auth0 Documentation](https://auth0.com/docs)" : ""}${db === "postgresql" ? "\n- [Prisma Documentation](https://www.prisma.io/docs)" : ""}${validation === "zod" ? "\n- [Zod Documentation](https://zod.dev)" : ""}${shadcn ? "\n- [Shadcn UI Documentation](https://ui.shadcn.com)" : ""}

Scaffolded with create-g-stack.
`;
}

