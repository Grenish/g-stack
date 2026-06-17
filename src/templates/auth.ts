import type { TemplateFile } from "../types";

export const betterAuthTemplate: TemplateFile[] = [
  {
    path: "lib/auth.ts",
    content: `import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
`
  },
  {
    path: "app/api/auth/[...all]/route.ts",
    content: `import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

export const { GET, POST } = toNextJsHandler(auth);
`
  }
];

export const betterAuthSchemaSnippet = `
model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique
  emailVerified Boolean
  image         String?
  createdAt     DateTime
  updatedAt     DateTime
  sessions      Session[]
  accounts      Account[]

  @@map("user")
}

model Session {
  id        String   @id @default(uuid())
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime
  updatedAt DateTime
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("session")
}

model Account {
  id                    String    @id @default(uuid())
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime
  updatedAt             DateTime

  @@map("account")
}

model Verification {
  id         String   @id @default(uuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?

  @@map("verification")
}
`;

export const authJsTemplateWithDb: TemplateFile[] = [
  {
    path: "lib/auth.ts",
    content: `import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
`
  },
  {
    path: "app/api/auth/[...nextauth]/route.ts",
    content: `import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers;
`
  }
];

export const authJsTemplateWithoutDb: TemplateFile[] = [
  {
    path: "lib/auth.ts",
    content: `import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
`
  },
  {
    path: "app/api/auth/[...nextauth]/route.ts",
    content: `import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers;
`
  }
];

export const authJsSchemaSnippet = `
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]

  @@map("users")
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
`;

export const clerkTemplate: TemplateFile[] = [
  {
    path: "app/(auth)/signin/[[...signin]]/page.tsx",
    content: `import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <SignIn />
    </div>
  );
}
`
  },
  {
    path: "app/(auth)/signup/[[...signup]]/page.tsx",
    content: `import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
      <SignUp />
    </div>
  );
}
`
  },
  {
    path: "proxy.ts",
    content: `import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
};
`
  }
];

export const clerkLayoutTemplate = `import type { Metadata } from "next";
import { Instrument_Sans, Figtree } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const fontSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHeading = Figtree({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "g-stack Scaffolder App",
  description: "Generated by g-stack CLI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={\`\${fontSans.variable} \${fontHeading.variable} antialiased bg-background text-foreground\`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
`;

export const auth0Template: TemplateFile[] = [
  {
    path: "app/api/auth/[auth0]/route.ts",
    content: `import { handleAuth } from "@auth0/nextjs-auth0";

export const GET = handleAuth();
`
  }
];

export const auth0LayoutTemplate = `import type { Metadata } from "next";
import { Instrument_Sans, Figtree } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";

const fontSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHeading = Figtree({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "g-stack Scaffolder App",
  description: "Generated by g-stack CLI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={\`\${fontSans.variable} \${fontHeading.variable} antialiased bg-background text-foreground\`}>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
`;
