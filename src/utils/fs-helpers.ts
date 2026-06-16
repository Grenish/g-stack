import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

/**
 * Ensures that a directory and all its parent directories exist.
 */
export function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Checks if a directory is empty (ignores common system/git files).
 */
export function isDirEmpty(dirPath: string): boolean {
  if (!fs.existsSync(dirPath)) {
    return true;
  }
  const files = fs.readdirSync(dirPath);
  return files.filter((f) => f !== ".git" && f !== ".gitignore" && f !== ".DS_Store").length === 0;
}

/**
 * Writes content to a file, ensuring the parent directories are created first.
 */
export async function writeFile(filePath: string, content: string) {
  const dir = path.dirname(filePath);
  ensureDir(dir);
  await Bun.write(filePath, content);
}

/**
 * Generates a cryptographically secure 32-byte secret encoded as a hex string.
 */
export function generateRandomSecret(): string {
  return crypto.randomBytes(32).toString("hex");
}
