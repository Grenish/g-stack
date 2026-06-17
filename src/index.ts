#!/usr/bin/env bun
import { select, confirm, input } from "@inquirer/prompts";
import pc from "picocolors";
import path from "node:path";
import { isDirEmpty } from "./utils/fs-helpers";
import { detectPackageManager } from "./utils/package-manager";
import { stageProject, writeStagedProject } from "./utils/project-generator";
import { parseArgs, printHelp } from "./utils/args";
import type { GeneratorOptions } from "./types";

let activeSpinnerInterval: any = null;
let activeStepText = "";
const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
let frameIndex = 0;

/**
 * Animated step-by-step console progress indicator.
 */
function handleStepChange(stepText: string) {
  if (activeSpinnerInterval) {
    clearInterval(activeSpinnerInterval);
    process.stdout.write(`\r\x1b[K${pc.green("✔")} ${activeStepText}\n`);
  }
  
  activeStepText = stepText;
  activeSpinnerInterval = setInterval(() => {
    process.stdout.write(`\r\x1b[K${pc.magenta(frames[frameIndex])} ${activeStepText}`);
    frameIndex = (frameIndex + 1) % frames.length;
  }, 80);
}

function stopProgress(success = true) {
  if (activeSpinnerInterval) {
    clearInterval(activeSpinnerInterval);
    process.stdout.write(`\r\x1b[K${success ? pc.green("✔") : pc.red("✖")} ${activeStepText}\n`);
    activeSpinnerInterval = null;
  }
}

/**
 * Helper to strip ANSI codes to calculate actual visual length of formatted strings.
 */
function stripAnsi(str: string): string {
  return str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ""
  );
}

/**
 * Renders the final status card.
 */
function renderSummary(options: GeneratorOptions) {
  const width = 60;
  const border = pc.magenta;

  const getLine = (content: string) => {
    const visualLength = stripAnsi(content).length;
    const paddingSize = Math.max(0, width - visualLength - 6);
    const padding = " ".repeat(paddingSize);
    return `${border("│")}  ${content}${padding}  ${border("│")}`;
  };

  const lineSeparator = border("├" + "─".repeat(width - 2) + "┤");

  // Pretty value mapping for display
  const displayValues = {
    framework: options.framework === "nextjs" ? "Next.js 16" : "React + Vite",
    auth: options.auth === "better-auth" ? "Better Auth" : 
          options.auth === "authjs" ? "Auth.js" : 
          options.auth === "clerk" ? "Clerk" : 
          options.auth === "auth0" ? "Auth0" : "None (Skipped)",
    db: options.db === "postgresql" ? "PostgreSQL (Prisma)" : "None (Skipped)",
    validation: options.validation === "zod" ? "Zod Validation" : "None (Skipped)",
    shadcn: options.shadcn ? "Yes (Shadcn UI)" : "None (Skipped)",
    email: options.email === "resend" ? "Yes (Resend)" : "None (Skipped)",
    docker: options.docker ? "Yes (Configured)" : "None (Skipped)",
    install: options.skipInstall ? pc.yellow("Skipped (Auto-install off)") : pc.green("Completed"),
  };

  const pm = detectPackageManager();
  const relPath = path.relative(process.cwd(), options.projectPath);
  const cdCmd = relPath && relPath !== "." ? `cd ${relPath}` : "";

  console.log("");
  console.log(border("┌" + "─".repeat(width - 2) + "┐"));
  console.log(getLine(pc.bold(pc.white("Selected Configurations"))));
  console.log(getLine(""));
  console.log(getLine(`${pc.dim("Framework:".padEnd(14))} ${pc.cyan(displayValues.framework)}`));
  console.log(getLine(`${pc.dim("Auth:".padEnd(14))} ${pc.yellow(displayValues.auth)}`));
  console.log(getLine(`${pc.dim("Database:".padEnd(14))} ${pc.blue(displayValues.db)}`));
  console.log(getLine(`${pc.dim("Validation:".padEnd(14))} ${pc.magenta(displayValues.validation)}`));
  console.log(getLine(`${pc.dim("Shadcn UI:".padEnd(14))} ${pc.green(displayValues.shadcn)}`));
  console.log(getLine(`${pc.dim("Resend Email:".padEnd(14))} ${pc.cyan(displayValues.email)}`));
  console.log(getLine(`${pc.dim("Docker:".padEnd(14))} ${pc.blue(displayValues.docker)}`));
  console.log(getLine(`${pc.dim("Installation:".padEnd(14))} ${displayValues.install}`));
  console.log(getLine(""));
  console.log(lineSeparator);
  console.log(getLine(""));
  console.log(getLine(pc.bold(pc.green("🚀 Project scaffolded successfully!"))));
  console.log(getLine(""));
  console.log(getLine(pc.white("Next steps:")));
  
  let step = 1;
  if (cdCmd) {
    console.log(getLine(`  ${step++}. ${pc.cyan(cdCmd)}`));
  }
  
  if (options.skipInstall) {
    console.log(getLine(`  ${step++}. Install dependencies: ${pc.cyan(pm === "npm" ? "npm install" : `${pm} install`)}`));
  }

  if (options.db === "postgresql") {
    console.log(getLine(`  ${step++}. Configure ${pc.yellow("DATABASE_URL")} in .env`));
    console.log(getLine(`  ${step++}. Run migrations: ${pc.cyan(pm === "npm" ? "npx prisma db push" : `${pm}x prisma db push`)}`));
  }
  
  if (options.email === "resend") {
    console.log(getLine(`  ${step++}. Configure ${pc.yellow("RESEND_API_KEY")} in .env`));
  }

  if (options.auth === "clerk") {
    console.log(getLine(`  ${step++}. Configure ${pc.yellow("CLERK keys")} in .env`));
  } else if (options.auth === "auth0") {
    console.log(getLine(`  ${step++}. Configure ${pc.yellow("AUTH0 keys")} in .env`));
  }

  console.log(getLine(`  ${step++}. Run dev server: ${pc.cyan(pm === "npm" ? "npm run dev" : `${pm} dev`)}`));

  console.log(getLine(""));
  console.log(lineSeparator);
  console.log(getLine(""));
  console.log(getLine(`${pc.yellow("●")}  ${pc.yellow(pc.bold("Ready for development."))}`));
  console.log(getLine(pc.dim("   Check package.json to view all configured dependencies!")));
  console.log(getLine(""));
  console.log(border("└" + "─".repeat(width - 2) + "┘"));
  console.log("");
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  // Clear the screen to give a clean, dedicated CLI experience
  console.clear();

  // Detect runtime and system details
  const runtime = typeof Bun !== "undefined" ? `Bun v${Bun.version}` : `Node ${process.version}`;
  const platform = `${process.platform}-${process.arch}`;

  // Print header
  console.log("");
  console.log(`  ${pc.bold(pc.magenta("g-stack"))} ${pc.dim("•")} ${pc.cyan(runtime)} ${pc.dim("•")} ${pc.green(platform)}`);
  console.log(`  ${pc.dim("Interactive project generator for modern fullstack apps")}`);
  console.log("");

  // Common inquirer theme
  const inquirerTheme = {
    prefix: pc.magenta("❯"),
    style: {
      message: (text: string) => pc.bold(pc.white(text)),
      answer: (text: string) => pc.cyan(text),
      highlight: (text: string) => pc.magenta(pc.bold(text)),
    }
  };

  try {
    // 1. Project Location
    let projectLocation = args.dir || "";
    if (!projectLocation) {
      const rawLocation = await input({
        message: "Where should we create your project?",
        default: ".",
        theme: inquirerTheme,
        validate: (input) => {
          if (!input.trim()) return "Project location cannot be empty";
          return true;
        }
      });
      projectLocation = rawLocation.trim();
    }

    const targetPath = projectLocation === "." ? process.cwd() : path.resolve(process.cwd(), projectLocation);
    const projectName = projectLocation === "." ? path.basename(process.cwd()) : path.basename(projectLocation);

    // Safety check: is directory empty?
    if (!isDirEmpty(targetPath)) {
      let proceed = true;
      if (!args.yes) {
        proceed = await confirm({
          message: "Target directory is not empty. Proceed and potentially overwrite files?",
          default: false,
          theme: inquirerTheme
        });
      }
      if (!proceed) {
        console.log(pc.yellow("\nSetup aborted."));
        process.exit(0);
      }
    }

    // 2. Auth Selection
    let auth = args.auth;
    if (!auth) {
      if (args.yes) {
        auth = "better-auth";
      } else {
        auth = await select({
          message: "Select authentication provider",
          choices: [
            { value: "better-auth", name: "Better Auth", description: "Modern, secure, framework-agnostic auth (requires DB)" },
            { value: "authjs", name: "Auth.js", description: "Flexible authentication library for Next.js" },
            { value: "clerk", name: "Clerk", description: "Complete user management and auth (hosted)" },
            { value: "auth0", name: "Auth0", description: "Enterprise-grade authentication and authorization (hosted)" },
            { value: "skip", name: "Skip", description: "No authentication setup" }
          ],
          theme: inquirerTheme,
        });
      }
    }

    // 3. Database Selection (dependency checking)
    let db = args.db;
    if (!db) {
      if (auth === "better-auth") {
        db = "postgresql";
        if (!args.yes) {
          console.log(`  ${pc.cyan("ℹ")} PostgreSQL automatically selected (required by Better Auth)`);
        }
      } else if (args.yes) {
        db = auth === "authjs" ? "postgresql" : "skip";
      } else {
        db = await select({
          message: "Select database",
          choices: [
            { value: "postgresql", name: "PostgreSQL", description: "PostgreSQL relational database with Prisma ORM" },
            { value: "skip", name: "Skip", description: "No database setup" }
          ],
          theme: inquirerTheme,
        });
      }
    }

    // 4. Validation Selection
    let validation: "zod" | "skip" = "skip";
    if (args.yes) {
      validation = "zod";
    } else {
      validation = await select({
        message: "Validation library",
        choices: [
          { value: "zod", name: "Zod", description: "TypeScript-first schema validation" },
          { value: "skip", name: "Skip", description: "No validation library" }
        ],
        theme: inquirerTheme,
      });
    }

    // 5. Shadcn Selection
    let shadcn = true;
    if (args.ui) {
      shadcn = args.ui === "shadcn";
    } else if (args.yes) {
      shadcn = true;
    } else {
      shadcn = await confirm({
        message: "Configure Shadcn UI?",
        default: true,
        theme: inquirerTheme,
      });
    }

    // 6. Resend Email Selection
    let email = args.email;
    if (!email) {
      if (args.yes) {
        email = "skip";
      } else {
        const wantsResend = await confirm({
          message: "Configure Resend email provider?",
          default: false,
          theme: inquirerTheme,
        });
        email = wantsResend ? "resend" : "skip";
      }
    }

    // 7. Docker Selection
    let docker = false;
    if (args.docker !== undefined) {
      docker = args.docker;
    } else if (args.yes) {
      docker = false;
    } else {
      docker = await confirm({
        message: "Initialize Docker configuration?",
        default: false,
        theme: inquirerTheme,
      });
    }

    console.log("");

    const generatorOptions: GeneratorOptions = {
      projectName,
      projectPath: targetPath,
      framework: "nextjs",
      auth,
      db,
      validation,
      shadcn,
      docker,
      email,
      skipInstall: args.install === false,
    };

    // Stage project templates in memory
    const staged = stageProject(generatorOptions);

    // Transparency Review Card Step
    let skipInstall = generatorOptions.skipInstall;
    if (!args.yes) {
      console.clear();
      console.log("");
      console.log(`  ${pc.bold(pc.magenta("g-stack Transparency Review"))}`);
      console.log(`  ${pc.dim("Review the staged changes before writing files to disk")}`);
      console.log("");

      const boxWidth = 64;
      const cardBorder = pc.magenta;
      const getReviewLine = (content: string) => {
        const visualLen = stripAnsi(content).length;
        const padding = " ".repeat(Math.max(0, boxWidth - visualLen - 6));
        return `${cardBorder("│")}  ${content}${padding}  ${cardBorder("│")}`;
      };

      console.log(cardBorder("┌" + "─".repeat(boxWidth - 2) + "┐"));
      console.log(getReviewLine(`${pc.bold("Target Folder:")} ${pc.cyan(targetPath)}`));
      console.log(getReviewLine(`${pc.bold("Project Name:")}  ${pc.cyan(projectName)}`));
      console.log(cardBorder("├" + "─".repeat(boxWidth - 2) + "┤"));
      
      console.log(getReviewLine(pc.bold(pc.white("Staged Files to Create:"))));
      const stagedFiles = Array.from(staged.files.keys());
      const maxShow = 6;
      stagedFiles.slice(0, maxShow).forEach(f => {
        console.log(getReviewLine(`  • ${f}`));
      });
      if (stagedFiles.length > maxShow) {
        console.log(getReviewLine(`  • ... and ${stagedFiles.length - maxShow} more files`));
      }

      console.log(cardBorder("├" + "─".repeat(boxWidth - 2) + "┤"));
      console.log(getReviewLine(pc.bold(pc.white("NPM Dependencies:"))));
      
      const prodDeps = Object.entries(staged.dependencies).map(([k, v]) => `${k}@${v}`);
      const devDeps = Object.entries(staged.devDependencies).map(([k, v]) => `${k}@${v}`);
      
      prodDeps.slice(0, 4).forEach(d => {
        console.log(getReviewLine(`  • ${pc.green(d)}`));
      });
      if (prodDeps.length > 4) {
        console.log(getReviewLine(`  • ... and ${prodDeps.length - 4} more prod dependencies`));
      }

      console.log(getReviewLine(pc.bold(pc.white("Dev Dependencies:"))));
      devDeps.slice(0, 4).forEach(d => {
        console.log(getReviewLine(`  • ${pc.blue(d)}`));
      });
      if (devDeps.length > 4) {
        console.log(getReviewLine(`  • ... and ${devDeps.length - 4} more dev dependencies`));
      }
      
      console.log(cardBorder("└" + "─".repeat(boxWidth - 2) + "┘"));
      console.log("");

      const action = await select({
        message: "Would you like to proceed?",
        choices: [
          { value: "install", name: "Yes, create files and install dependencies automatically" },
          { value: "skip-install", name: "Yes, create files only (skip dependency installation)" },
          { value: "abort", name: "Abort setup" }
        ],
        default: args.install === false ? "skip-install" : "install",
        theme: inquirerTheme,
      });

      if (action === "abort") {
        console.log(pc.yellow("\nSetup aborted. No changes were made."));
        process.exit(0);
      }
      
      skipInstall = action === "skip-install";
      generatorOptions.skipInstall = skipInstall;
    }

    console.log("");

    // Write staged files & run install
    await writeStagedProject(generatorOptions, staged, handleStepChange);

    stopProgress(true);

    // Final receipt
    renderSummary(generatorOptions);

  } catch (error: any) {
    stopProgress(false);
    console.log(`\n${pc.red("✖")} ${pc.dim(`Setup aborted: ${error.message}`)}\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  stopProgress(false);
  console.error("An error occurred:", err);
  process.exit(1);
});
