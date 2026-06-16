import type { TemplateFile } from "../types";

export const validationTemplate: TemplateFile[] = [
  {
    path: "lib/validations/index.ts",
    content: `export * from "./example";
`
  },
  {
    path: "lib/validations/example.ts",
    content: `import { z } from "zod";

export const userSignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type UserSignUpInput = z.infer<typeof userSignUpSchema>;
`
  }
];
