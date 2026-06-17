import fs from "node:fs";
import path from "node:path";

function readDirRecursive(dir: string, baseDir: string = dir): { path: string; content: string }[] {
  const results: { path: string; content: string }[] = [];
  if (!fs.existsSync(dir)) return results;
  
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...readDirRecursive(filePath, baseDir));
    } else {
      const relativePath = path.relative(baseDir, filePath);
      const content = fs.readFileSync(filePath, "utf-8");
      results.push({ path: relativePath, content });
    }
  }
  return results;
}

function escapeStringLiteral(content: string): string {
  return content
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\${/g, "\\${");
}

async function main() {
  console.log("Compiling templates from templates/ into src/templates/...");

  // 1. Base templates
  const baseFiles = readDirRecursive("templates/base");
  const baseTemplateFiles = baseFiles.filter(
    f => f.path !== "homepage-plain.tsx" && 
         f.path !== "homepage-shadcn.tsx" && 
         f.path !== "not-found-plain.tsx" && 
         f.path !== "not-found-shadcn.tsx"
  );
  const plainHomepage = baseFiles.find(f => f.path === "homepage-plain.tsx")?.content || "";
  const shadcnHomepage = baseFiles.find(f => f.path === "homepage-shadcn.tsx")?.content || "";
  const plainNotFound = baseFiles.find(f => f.path === "not-found-plain.tsx")?.content || "";
  const shadcnNotFound = baseFiles.find(f => f.path === "not-found-shadcn.tsx")?.content || "";

  const baseTsContent = `import type { TemplateFile } from "../types";

export const baseTemplate: TemplateFile[] = [
${baseTemplateFiles.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];

export const plainHomepage = \`${escapeStringLiteral(plainHomepage)}\`;

export const shadcnHomepage = \`${escapeStringLiteral(shadcnHomepage)}\`;

export const plainNotFound = \`${escapeStringLiteral(plainNotFound)}\`;

export const shadcnNotFound = \`${escapeStringLiteral(shadcnNotFound)}\`;
`;
  fs.writeFileSync("src/templates/base.ts", baseTsContent, "utf-8");
  console.log("✓ Compiled src/templates/base.ts");

  // 2. Auth templates
  const betterAuthFiles = readDirRecursive("templates/auth/better-auth").filter(f => f.path !== "schema.prisma.snippet");
  const betterAuthSchema = fs.readFileSync("templates/auth/better-auth/schema.prisma.snippet", "utf-8");

  const authJsDbFiles = readDirRecursive("templates/auth/authjs/db");
  const authJsNoDbFiles = readDirRecursive("templates/auth/authjs/nodb");
  const authJsSchema = fs.readFileSync("templates/auth/authjs/schema.prisma.snippet", "utf-8");

  const clerkFiles = readDirRecursive("templates/auth/clerk").filter(f => f.path !== "layout.tsx");
  const clerkLayout = fs.readFileSync("templates/auth/clerk/layout.tsx", "utf-8");

  const auth0Files = readDirRecursive("templates/auth/auth0").filter(f => f.path !== "layout.tsx");
  const auth0Layout = fs.readFileSync("templates/auth/auth0/layout.tsx", "utf-8");

  const authTsContent = `import type { TemplateFile } from "../types";

export const betterAuthTemplate: TemplateFile[] = [
${betterAuthFiles.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];

export const betterAuthSchemaSnippet = \`${escapeStringLiteral(betterAuthSchema)}\`;

export const authJsTemplateWithDb: TemplateFile[] = [
${authJsDbFiles.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];

export const authJsTemplateWithoutDb: TemplateFile[] = [
${authJsNoDbFiles.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];

export const authJsSchemaSnippet = \`${escapeStringLiteral(authJsSchema)}\`;

export const clerkTemplate: TemplateFile[] = [
${clerkFiles.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];

export const clerkLayoutTemplate = \`${escapeStringLiteral(clerkLayout)}\`;

export const auth0Template: TemplateFile[] = [
${auth0Files.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];

export const auth0LayoutTemplate = \`${escapeStringLiteral(auth0Layout)}\`;
`;
  fs.writeFileSync("src/templates/auth.ts", authTsContent, "utf-8");
  console.log("✓ Compiled src/templates/auth.ts");

  // 3. Auth Pages templates
  const authPagesWithShadcn = readDirRecursive("templates/auth-pages/with-shadcn");
  const authPagesWithoutShadcn = readDirRecursive("templates/auth-pages/without-shadcn");

  const authPagesTsContent = `import type { TemplateFile } from "../types";

export const authPagesTemplateWithShadcn: TemplateFile[] = [
${authPagesWithShadcn.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];

export const authPagesTemplateWithoutShadcn: TemplateFile[] = [
${authPagesWithoutShadcn.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];
`;
  fs.writeFileSync("src/templates/auth-pages.ts", authPagesTsContent, "utf-8");
  console.log("✓ Compiled src/templates/auth-pages.ts");

  // 4. DB templates
  const dbFiles = readDirRecursive("templates/db");
  const dbTsContent = `import type { TemplateFile } from "../types";

export const dbTemplate: TemplateFile[] = [
${dbFiles.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];
`;
  fs.writeFileSync("src/templates/db.ts", dbTsContent, "utf-8");
  console.log("✓ Compiled src/templates/db.ts");

  // 5. Email templates
  const emailFiles = readDirRecursive("templates/email");
  const emailTsContent = `import type { TemplateFile } from "../types";

export const resendTemplate: TemplateFile[] = [
${emailFiles.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];
`;
  fs.writeFileSync("src/templates/email.ts", emailTsContent, "utf-8");
  console.log("✓ Compiled src/templates/email.ts");

  // 6. Shadcn templates
  const shadcnFiles = readDirRecursive("templates/shadcn").filter(f => f.path !== "globals-theme.css.snippet");
  const shadcnTheme = fs.readFileSync("templates/shadcn/globals-theme.css.snippet", "utf-8");

  const shadcnTsContent = `import type { TemplateFile } from "../types";

export const shadcnTemplate: TemplateFile[] = [
${shadcnFiles.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];

export const shadcnCssThemeSnippet = \`${escapeStringLiteral(shadcnTheme)}\`;
`;
  fs.writeFileSync("src/templates/shadcn.ts", shadcnTsContent, "utf-8");
  console.log("✓ Compiled src/templates/shadcn.ts");

  // 7. Validation templates
  const validationFiles = readDirRecursive("templates/validation");
  const validationTsContent = `import type { TemplateFile } from "../types";

export const validationTemplate: TemplateFile[] = [
${validationFiles.map(f => `  {
    path: "${f.path}",
    content: \`${escapeStringLiteral(f.content)}\`
  }`).join(",\n")}
];
`;
  fs.writeFileSync("src/templates/validation.ts", validationTsContent, "utf-8");
  console.log("✓ Compiled src/templates/validation.ts");

  // 8. Docker templates
  const dockerfile = fs.readFileSync("templates/docker/Dockerfile", "utf-8");
  const dockerignore = fs.readFileSync("templates/docker/.dockerignore", "utf-8");
  const composeNoDb = fs.readFileSync("templates/docker/docker-compose.yml", "utf-8");
  const composeDb = fs.readFileSync("templates/docker/docker-compose-db.yml", "utf-8");

  const dockerTsContent = `import type { TemplateFile } from "../types";

export function getDockerTemplate(hasDb: boolean): TemplateFile[] {
  const dockerfile = \`${escapeStringLiteral(dockerfile)}\`;
  const dockerignore = \`${escapeStringLiteral(dockerignore)}\`;
  const compose = hasDb 
    ? \`${escapeStringLiteral(composeDb)}\`
    : \`${escapeStringLiteral(composeNoDb)}\`;

  return [
    { path: "Dockerfile", content: dockerfile },
    { path: "docker-compose.yml", content: compose },
    { path: ".dockerignore", content: dockerignore }
  ];
}
`;
  fs.writeFileSync("src/templates/docker.ts", dockerTsContent, "utf-8");
  console.log("✓ Compiled src/templates/docker.ts");

  console.log("All templates compiled successfully!");
}

main().catch(console.error);
