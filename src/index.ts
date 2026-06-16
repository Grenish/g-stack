#!/usr/bin/env bun
import { select, input, confirm } from "@inquirer/prompts";
import pc from "picocolors";
import path from "node:path";
import fs from "node:fs";
import { isDirEmpty } from "./utils/fs-helpers";
import { detectPackageManager } from "./utils/package-manager";
import { generateProject } from "./utils/project-generator";

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
    // Clear line and print success for the previous step
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
function renderSummary(
  framework: string,
  auth: string,
  db: string,
  validation: string,
  shadcn: boolean,
  projectName: string,
  targetPath: string
) {
  const width = 58;
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
    framework: framework === "nextjs" ? "Next.js" : "React + Vite",
    auth: auth === "better-auth" ? "Better Auth" : auth === "authjs" ? "Auth.js" : "None (Skipped)",
    db: db === "postgresql" ? "PostgreSQL (Prisma)" : "None (Skipped)",
    validation: validation === "zod" ? "Zod Validation" : "None (Skipped)",
    shadcn: shadcn ? "Yes (Shadcn UI)" : "None (Skipped)",
  };

  const pm = detectPackageManager();
  const relPath = path.relative(process.cwd(), targetPath);
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
  console.log(getLine(""));
  console.log(lineSeparator);
  console.log(getLine(""));
  console.log(getLine(pc.bold(pc.green("🚀 Project scaffolded successfully!"))));
  console.log(getLine(""));
  console.log(getLine(pc.white("Next steps:")));
  
  if (cdCmd) {
    console.log(getLine(`  1. ${pc.cyan(cdCmd)}`));
  }
  
  const stepIndex = cdCmd ? 2 : 1;
  
  if (db === "postgresql") {
    console.log(getLine(`  ${stepIndex}. Configure ${pc.yellow("DATABASE_URL")} in .env`));
    console.log(getLine(`  ${stepIndex + 1}. Run migrations: ${pc.cyan(pm === "npm" ? "npx prisma db push" : `${pm}x prisma db push`)}`));
    console.log(getLine(`  ${stepIndex + 2}. Run dev server: ${pc.cyan(pm === "npm" ? "npm run dev" : `${pm} dev`)}`));
  } else {
    console.log(getLine(`  ${stepIndex}. Run dev server: ${pc.cyan(pm === "npm" ? "npm run dev" : `${pm} dev`)}`));
  }

  console.log(getLine(""));
  console.log(lineSeparator);
  console.log(getLine(""));
  console.log(getLine(`${pc.yellow("●")}  ${pc.yellow(pc.bold("The work is still in progress."))}`));
  console.log(getLine(pc.dim("   Check back soon for the full generation features!")));
  console.log(getLine(""));
  console.log(border("└" + "─".repeat(width - 2) + "┘"));
  console.log("");
}

async function main() {
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
    const rawLocation = await input({
      message: "Where should we create your project?",
      default: ".",
      theme: inquirerTheme,
      validate: (input) => {
        if (!input.trim()) return "Project location cannot be empty";
        return true;
      }
    });

    const projectLocation = rawLocation.trim();
    const targetPath = projectLocation === "." ? process.cwd() : path.resolve(process.cwd(), projectLocation);
    const projectName = projectLocation === "." ? path.basename(process.cwd()) : path.basename(projectLocation);

    // Safety check: is directory empty?
    if (!isDirEmpty(targetPath)) {
      const proceed = await confirm({
        message: "Target directory is not empty. Proceed and potentially overwrite files?",
        default: false,
        theme: inquirerTheme
      });
      if (!proceed) {
        console.log(pc.yellow("\nSetup aborted."));
        process.exit(0);
      }
    }

    // 2. Auth Selection
    const auth = await select({
      message: "Select authentication provider",
      choices: [
        { value: "better-auth", name: "Better Auth", description: "Modern, secure, framework-agnostic auth (requires DB)" },
        { value: "authjs", name: "Auth.js", description: "Flexible authentication library for Next.js" },
        { value: "skip", name: "Skip", description: "No authentication setup" }
      ],
      theme: inquirerTheme,
    });

    // 3. Database Selection (dependency checking)
    let db: "postgresql" | "skip" = "skip";
    if (auth === "better-auth") {
      db = "postgresql";
      console.log(`  ${pc.cyan("ℹ")} PostgreSQL automatically selected (required by Better Auth)`);
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

    // 4. Validation Selection
    const validation = await select({
      message: "Validation library",
      choices: [
        { value: "zod", name: "Zod", description: "TypeScript-first schema validation" },
        { value: "skip", name: "Skip", description: "No validation library" }
      ],
      theme: inquirerTheme,
    });

    // 5. Shadcn Selection
    const shadcn = await confirm({
      message: "Configure Shadcn UI?",
      default: true,
      theme: inquirerTheme,
    });

    console.log("");

    // Run Scaffolder
    await generateProject(
      {
        projectName,
        projectPath: targetPath,
        framework: "nextjs",
        auth,
        db,
        validation,
        shadcn,
      },
      handleStepChange
    );

    stopProgress(true);

    // Final receipt
    renderSummary("nextjs", auth, db, validation, shadcn, projectName, targetPath);

  } catch (error: any) {
    stopProgress(false);
    // Graceful cancellation handling
    console.log(`\n${pc.red("✖")} ${pc.dim("Setup aborted. No changes were made.")}\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  stopProgress(false);
  console.error("An error occurred:", err);
  process.exit(1);
});
