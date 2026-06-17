import type { TemplateFile } from "../types";

export const authPagesTemplateWithShadcn: TemplateFile[] = [
  {
    path: "app/(auth)/signin/page.tsx",
    content: `import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LockKeyhole, User2 } from "lucide-react";
import Link from "next/link";

export default function SigninPage() {
  return (
    <div className="min-h-dvh">
      <div className="max-w-md min-h-dvh mx-auto flex items-center justify-center">
        <form className="w-full">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Acme</FieldLegend>
              <FieldDescription>Sign in to your account.</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <User2 />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Username" required />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <LockKeyhole />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </InputGroup>
                  <FieldDescription>
                    <Link href="/reset-password">Forgot your password?</Link>
                  </FieldDescription>
                </Field>
                <Field orientation={"horizontal"}>
                  <Button size={"sm"}>Signin</Button>
                  <Link href={"/signup"}>
                    <Button size={"sm"} variant={"outline"}>
                      Don&apos;t have an account?
                    </Button>
                  </Link>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldGroup>
                <Field orientation={"horizontal"}>
                  <FieldLabel>Or continue with</FieldLabel>
                  <Button size={"icon"}>
                    <GoogleLogo />
                  </Button>
                  <Button size={"icon"}>
                    <XLogo />
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

const XLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
    </svg>
  );
};

const GoogleLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
    </svg>
  );
};
`
  },
  {
    path: "app/(auth)/signup/page.tsx",
    content: `import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LockKeyhole, Mail, PersonStanding, User2 } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-dvh">
      <div className="max-w-md mx-auto flex items-center justify-center min-h-dvh">
        <form className="w-full">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Acme</FieldLegend>
              <FieldDescription>Sign up to create an account.</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <PersonStanding />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="First Name" required />
                    <InputGroupInput placeholder="Last Name" required />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <FieldDescription>
                    Choose a unique username to identify yourself
                  </FieldDescription>
                  <InputGroup>
                    <InputGroupAddon>
                      <User2 />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Username" required />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <FieldDescription>
                    Choose a strong password to protect your account.
                  </FieldDescription>
                  <InputGroup>
                    <InputGroupAddon>
                      <LockKeyhole />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </InputGroup>
                </Field>
                <Field orientation={"horizontal"}>
                  <Button size={"sm"}>Signup</Button>
                  <Link href="/signin">
                    <Button size={"sm"} variant={"outline"}>
                      Have an account?
                    </Button>
                  </Link>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldGroup>
                <Field orientation={"horizontal"}>
                  <FieldLabel>Or continue with</FieldLabel>
                  <Button size={"icon"}>
                    <GoogleLogo />
                  </Button>
                  <Button size={"icon"}>
                    <XLogo />
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

const XLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
    </svg>
  );
};

const GoogleLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
    </svg>
  );
};
`
  },
  {
    path: "app/(auth)/reset-password/page.tsx",
    content: `import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-dvh">
      <div className="max-w-md min-h-dvh mx-auto flex items-center justify-center">
        <form className="w-full">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Acme</FieldLegend>
              <FieldDescription>Reset your password.</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>New Password</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <LockKeyhole />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="password"
                      placeholder="New Password"
                      required
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <LockKeyhole />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                  </InputGroup>
                </Field>
                <Field orientation={"horizontal"}>
                  <Button size={"sm"}>Reset Password</Button>
                  <Link href={"/signin"}>
                    <Button size={"sm"} variant={"outline"}>
                      Back to Sign In
                    </Button>
                  </Link>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
`
  }
];

export const authPagesTemplateWithoutShadcn: TemplateFile[] = [
  {
    path: "app/(auth)/signin/page.tsx",
    content: `export default function SignInPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Sign in
          </h1>
          <p className="text-sm text-zinc-400">
            Enter your credentials to continue
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-300"
              >
                Password
              </label>
              <a
                href="/forget-password"
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
          </div>
        </div>

        <button className="h-9 w-full rounded-md bg-white text-sm font-medium text-zinc-950 hover:bg-zinc-200 transition-colors">
          Sign in
        </button>

        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-zinc-300 underline underline-offset-4 hover:text-white"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
`
  },
  {
    path: "app/(auth)/signup/page.tsx",
    content: `export default function SignUpPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4 py-8">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Create an account
          </h1>
          <p className="text-sm text-zinc-400">
            Enter your details to get started
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="first-name"
                className="text-sm font-medium text-zinc-300"
              >
                First name
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="John"
                className="flex h-9 w-full rounded-md border border-zinc-800 bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="last-name"
                className="text-sm font-medium text-zinc-300"
              >
                Last name
              </label>
              <input
                id="last-name"
                type="text"
                placeholder="Doe"
                className="flex h-9 w-full rounded-md border border-zinc-800 bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-zinc-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="johndoe"
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
            <p className="text-xs text-zinc-500">Choose a unique username</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
            <p className="text-xs text-zinc-500">
              Must be at least 8 characters
            </p>
          </div>
        </div>

        <button className="h-9 w-full rounded-md bg-white text-sm font-medium text-zinc-950 hover:bg-zinc-200 transition-colors">
          Create account
        </button>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-zinc-300 underline underline-offset-4 hover:text-white"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
`
  },
  {
    path: "app/(auth)/forget-password/page.tsx",
    content: `export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Reset password
          </h1>
          <p className="text-sm text-zinc-400">
            Enter a new password for your account
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="new-password"
              className="text-sm font-medium text-zinc-300"
            >
              New password
            </label>
            <input
              id="new-password"
              type="password"
              placeholder="••••••••"
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
            <p className="text-xs text-zinc-500">
              Must be at least 8 characters
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-zinc-300"
            >
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              className="flex h-9 w-full rounded-md border border-zinc-800 bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
          </div>
        </div>

        <button className="h-9 w-full rounded-md bg-white text-sm font-medium text-zinc-950 hover:bg-zinc-200 transition-colors">
          Reset password
        </button>

        <p className="text-center text-sm text-zinc-500">
          <a
            href="/signin"
            className="text-zinc-300 underline underline-offset-4 hover:text-white"
          >
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  );
}
`
  }
];
