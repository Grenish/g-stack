export interface TemplateFile {
  path: string;
  content: string;
}

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export interface GeneratorOptions {
  projectName: string;
  projectPath: string;
  framework: string;
  auth: "better-auth" | "authjs" | "skip";
  db: "postgresql" | "skip";
  validation: "zod" | "skip";
  shadcn: boolean;
}
