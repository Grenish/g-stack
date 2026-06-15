import { select } from "@inquirer/prompts";
import pc from "picocolors";
import path from "node:path";

/**
 * Custom spinner animation for clean and professional console output.
 */
async function showSpinner(text: string, durationMs: number) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r${pc.magenta(frames[i])} ${text}`);
    i = (i + 1) % frames.length;
  }, 80);

  await new Promise((resolve) => setTimeout(resolve, durationMs));
  clearInterval(interval);
  process.stdout.write(`\r${pc.green("")} ${text} ${pc.dim("(Done)")}\n`);
}

/**
 * Helper to strip ANSI codes to calculate actual visual length of formatted strings.
 */
function stripAnsi(str: string): string {
  return str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}

/**
 * Renders a highly polished configuration box containing selections and status.
 */
function renderSummary(
  framework: string,
  auth: string,
  db: string,
  validation: string,
  configSaved: boolean,
) {
  const width = 58;
  const border = pc.magenta;

  const getLine = (content: string) => {
    const visualLength = stripAnsi(content).length;
    // Account for border character and margins: width - visualLength - (2 borders + 4 spaces padding)
    const paddingSize = Math.max(0, width - visualLength - 6);
    const padding = " ".repeat(paddingSize);
    return `${border("│")}  ${content}${padding}  ${border("│")}`;
  };

  const lineSeparator = border("├" + "─".repeat(width - 2) + "┤");

  // Pretty value mapping for display
  const displayValues = {
    framework: framework === "nextjs" ? "Next.js" : "React + Vite",
    auth: auth === "better-auth" ? "Better Auth" : "Clerk",
    db:
      db === "postgresql"
        ? "PostgreSQL"
        : db === "prisma"
          ? "Prisma ORM"
          : "MongoDB",
    validation: validation === "zod" ? "Zod Validation" : "None (Skipped)",
  };

  console.log("");
  console.log(border("┌" + "─".repeat(width - 2) + "┐"));
  console.log(getLine(pc.bold(pc.white("Selected Configurations"))));
  console.log(getLine(""));
  console.log(
    getLine(
      `${pc.dim("Framework:".padEnd(14))} ${pc.cyan(displayValues.framework)}`,
    ),
  );
  console.log(
    getLine(`${pc.dim("Auth:".padEnd(14))} ${pc.yellow(displayValues.auth)}`),
  );
  console.log(
    getLine(`${pc.dim("Database:".padEnd(14))} ${pc.blue(displayValues.db)}`),
  );
  console.log(
    getLine(
      `${pc.dim("Validation:".padEnd(14))} ${pc.magenta(displayValues.validation)}`,
    ),
  );

  if (configSaved) {
    console.log(getLine(""));
    console.log(
      getLine(
        `${pc.green("")} ${pc.dim("Saved workspace config to gstack.config.json")}`,
      ),
    );
  }

  console.log(getLine(""));
  console.log(lineSeparator);
  console.log(getLine(""));
  console.log(
    getLine(
      `${pc.yellow("●")}  ${pc.yellow(pc.bold("The work is still in progress."))}`,
    ),
  );
  console.log(
    getLine(pc.dim("   Check back soon for the full generation features!")),
  );
  console.log(getLine(""));
  console.log(border("└" + "─".repeat(width - 2) + "┘"));
  console.log("");
}

async function main() {
  // Clear the screen to give a clean, dedicated CLI experience
  console.clear();

  // Detect runtime and system details
  const runtime =
    typeof Bun !== "undefined"
      ? `Bun v${Bun.version}`
      : `Node ${process.version}`;
  const platform = `${process.platform}-${process.arch}`;

  // Simple, clean header logo
  console.log("");
  console.log(
    `  ${pc.bold(pc.magenta("g-stack"))} ${pc.dim("•")} ${pc.cyan(runtime)} ${pc.dim("•")} ${pc.green(platform)}`,
  );
  console.log(
    `  ${pc.dim("Interactive project generator for modern fullstack apps")}`,
  );
  console.log("");

  // Common inquirer theme to style prefixes, highlight colors and messaging
  const inquirerTheme = {
    prefix: pc.magenta("❯"),
    style: {
      message: (text: string) => pc.bold(pc.white(text)),
      answer: (text: string) => pc.cyan(text),
      highlight: (text: string) => pc.magenta(pc.bold(text)),
    },
  };

  try {
    // 1. Framework Selection
    const framework = await select({
      message: "Pick a framework for your app",
      choices: [
        {
          value: "nextjs",
          name: "Next.js (Recommended)",
          description: "App Router, Server Components & Actions",
        },
        {
          value: "react+vite",
          name: "React + Vite",
          description: "Single Page App with client-side routing",
        },
      ],
      theme: inquirerTheme,
    });

    // 2. Auth Selection
    const auth = await select({
      message: "Choose an authentication provider",
      choices: [
        {
          value: "better-auth",
          name: "Better Auth",
          description: "Modern, secure, framework-agnostic auth",
        },
        {
          value: "clerk",
          name: "Clerk",
          description: "Managed authentication, user profiles & webhooks",
        },
      ],
      theme: inquirerTheme,
    });

    // 3. Database Selection
    const db = await select({
      message: "Select a database / ORM setup",
      choices: [
        {
          value: "postgresql",
          name: "PostgreSQL",
          description: "Robust SQL relational database",
        },
        {
          value: "prisma",
          name: "Prisma ORM",
          description: "Next-generation Node.js & TypeScript ORM",
        },
        {
          value: "mongodb",
          name: "MongoDB",
          description: "Flexible document-based NoSQL database",
        },
      ],
      theme: inquirerTheme,
    });

    // 4. Schema Validation Selection
    const validation = await select({
      message: "Add schema validation library?",
      choices: [
        {
          value: "zod",
          name: "Zod",
          description: "TypeScript-first schema validation",
        },
        {
          value: "skip",
          name: "Skip validation",
          description: "Proceed without Zod",
        },
      ],
      theme: inquirerTheme,
    });

    // Simulated installation steps
    console.log("");
    await showSpinner("Scaffolding project structure...", 1200);
    await showSpinner("Installing dependencies (bun)...", 1500);
    await showSpinner(
      `Configuring ${framework} with ${auth}, ${db}, and ${validation === "zod" ? "Zod" : "no validation"}...`,
      1200,
    );

    // Save choices to a local configuration file for true persistence
    let configSaved = false;
    try {
      const configPath = path.join(process.cwd(), "gstack.config.json");
      const configData = {
        framework,
        auth,
        database: db,
        validation,
        timestamp: new Date().toISOString(),
      };
      await Bun.write(configPath, JSON.stringify(configData, null, 2));
      configSaved = true;
      console.log(
        `${pc.green("")} Saved workspace configuration to gstack.config.json`,
      );
    } catch (e) {
      // Ignore write errors if permission-restricted in certain test containers
    }

    // Render summary card
    renderSummary(framework, auth, db, validation, configSaved);
  } catch (error) {
    // Graceful cancellation handling (Ctrl+C / Interruption)
    console.log(
      `\n${pc.red("✖")} ${pc.dim("Setup aborted. No changes were made.")}\n`,
    );
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("An error occurred:", err);
  process.exit(1);
});
