import type { PackageManager } from "../types";

/**
 * Detects the package manager used to run the CLI based on user-agent headers.
 * Defaults to 'npm'.
 */
export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || "";

  if (userAgent.includes("bun")) {
    return "bun";
  }
  if (userAgent.includes("pnpm")) {
    return "pnpm";
  }
  if (userAgent.includes("yarn")) {
    return "yarn";
  }
  return "npm";
}

/**
 * Returns the install command corresponding to the detected package manager.
 */
export function getInstallCommand(pm: PackageManager): string {
  switch (pm) {
    case "bun":
      return "bun install";
    case "pnpm":
      return "pnpm install";
    case "yarn":
      return "yarn install";
    default:
      return "npm install";
  }
}

/**
 * Returns the run/execute command (npx/bunx/pnpm dlx) corresponding to the detected package manager.
 */
export function getExecuteCommand(pm: PackageManager, command: string): string {
  switch (pm) {
    case "bun":
      return `bunx ${command}`;
    case "pnpm":
      return `pnpm dlx ${command}`;
    case "yarn":
      return `yarn dlx ${command}`;
    default:
      return `npx ${command}`;
  }
}
