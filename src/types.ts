export interface TemplateFile {
  path: string;
  content: string;
}

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export interface GeneratorOptions {
  projectName: string;
  projectPath: string;
  framework: string;
  auth: "better-auth" | "authjs" | "clerk" | "auth0" | "skip";
  db: "postgresql" | "skip";
  validation: "zod" | "skip";
  shadcn: boolean;
  docker: boolean;
  email: "resend" | "skip";
  skipInstall: boolean;
}
