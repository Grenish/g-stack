import type { TemplateFile } from "../types";

export const dbTemplate: TemplateFile[] = [
  {
    path: "prisma/schema.prisma",
    content: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`
  },
  {
    path: "lib/db.ts",
    content: `import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
`
  }
];
