import type { TemplateFile } from "../types";

export const authPagesTemplateWithShadcn: TemplateFile[] = [
  {
    path: "app/(auth)/signin/page.tsx",
    content: `import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AtIcon, PasswordIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import ViewPasswordButton from "@/components/view-password";
import { GoogleButton } from "@/components/google-button";
import XButton from "@/components/x-button";

export default function SignIn() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <FieldSet>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <AtIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </InputGroup>
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/forget-password"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <InputGroup>
                <InputGroupAddon>
                  <PasswordIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  required
                />
                <ViewPasswordButton inputId="password" />
              </InputGroup>
            </Field>
          </FieldGroup>

          <Button className="w-full">Sign in</Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-foreground underline underline-offset-4 hover:text-foreground/80"
            >
              Sign up
            </Link>
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <GoogleButton size="icon" variant="outline" />
            <XButton size="icon" variant="outline" />
          </div>
        </FieldSet>
      </div>
    </div>
  );
}
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
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  AtIcon,
  PasswordIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import ViewPasswordButton from "@/components/view-password";
import { GoogleButton } from "@/components/google-button";
import XButton from "@/components/x-button";

export default function SignUp() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm">
        <FieldSet>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to get started
            </p>
          </div>

          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="first-name">First name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="first-name"
                    placeholder="John"
                    required
                  />
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="last-name"
                    placeholder="Doe"
                    required
                  />
                </InputGroup>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <UserIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="username"
                  placeholder="johndoe"
                  required
                />
              </InputGroup>
              <FieldDescription>Choose a unique username</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <AtIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <PasswordIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  required
                />
                <ViewPasswordButton inputId="password" />
              </InputGroup>
              <FieldDescription>Must be at least 8 characters</FieldDescription>
            </Field>
          </FieldGroup>

          <Button className="w-full">Create account</Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-foreground underline underline-offset-4 hover:text-foreground/80"
            >
              Sign in
            </Link>
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <GoogleButton size="icon" variant="outline" />
            <XButton size="icon" variant="outline" />
          </div>
        </FieldSet>
      </div>
    </div>
  );
}
`
  },
  {
    path: "app/(auth)/forget-password/page.tsx",
    content: `import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { PasswordIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import ViewPasswordButton from "@/components/view-password";

export default function ResetPassword() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <FieldSet>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter a new password for your account
            </p>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="new-password">New password</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <PasswordIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="new-password"
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  required
                />
                <ViewPasswordButton inputId="new-password" />
              </InputGroup>
              <FieldDescription>Must be at least 8 characters</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm password
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <PasswordIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="confirm-password"
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  required
                />
                <ViewPasswordButton inputId="confirm-password" />
              </InputGroup>
            </Field>
          </FieldGroup>

          <Button className="w-full">Reset password</Button>

          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/signin"
              className="text-foreground underline underline-offset-4 hover:text-foreground/80"
            >
              Back to sign in
            </Link>
          </p>
        </FieldSet>
      </div>
    </div>
  );
}
`
  },
  {
    path: "components/google-button.tsx",
    content: `"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";
import * as React from "react";

type GoogleButtonSize =
  | "sm"
  | "default"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon"
  | "icon-lg";

export interface GoogleButtonProps extends React.ComponentProps<typeof Button> {
  size?: GoogleButtonSize;
  tooltipText?: string;
}

const iconSizeClass: Record<GoogleButtonSize, string> = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-5",
  "icon-xs": "size-3",
  "icon-sm": "size-3.5",
  icon: "size-4",
  "icon-lg": "size-5",
};

const ICON_SIZES: GoogleButtonSize[] = [
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
];

export function GoogleButton({
  className,
  variant = "outline",
  size = "default",
  tooltipText = "Google",
  type = "button",
  children,
  ...props
}: GoogleButtonProps) {
  const isIcon = ICON_SIZES.includes(size);
  const iconClass = iconSizeClass[size];

  const button = (
    <Button
      variant={variant}
      size={size}
      type={type}
      className={cn(className)}
      {...props}
    >
      <GoogleLogoIcon
        weight="duotone"
        className={cn(iconClass, !isIcon && "mr-2")}
      />
      {!isIcon && (children ?? <span>Continue with Google</span>)}
    </Button>
  );

  if (!isIcon) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
`
  },
  {
    path: "components/x-button.tsx",
    content: `"use client";

import { XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import * as React from "react";

type XButtonSize =
  | "sm"
  | "default"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon"
  | "icon-lg";

export interface XButtonProps extends React.ComponentProps<typeof Button> {
  size?: XButtonSize;
  tooltipText?: string;
}

const iconSizeClass: Record<XButtonSize, string> = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-5",
  "icon-xs": "size-3",
  "icon-sm": "size-3.5",
  icon: "size-4",
  "icon-lg": "size-5",
};

const ICON_SIZES: XButtonSize[] = ["icon-xs", "icon-sm", "icon", "icon-lg"];

export default function XButton({
  className,
  variant = "outline",
  size = "default",
  tooltipText = "X",
  type = "button",
  children,
  ...props
}: XButtonProps) {
  const isIcon = ICON_SIZES.includes(size);
  const iconClass = iconSizeClass[size];

  const button = (
    <Button
      variant={variant}
      size={size}
      type={type}
      className={cn(className)}
      {...props}
    >
      <XLogoIcon
        weight="duotone"
        className={cn(iconClass, !isIcon && "mr-2")}
      />
      {!isIcon && (children ?? <span>Continue with X</span>)}
    </Button>
  );

  if (!isIcon) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
`
  },
  {
    path: "components/view-password.tsx",
    content: `"use client";

import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react/dist/ssr";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";

interface ViewPasswordButtonProps {
  inputId: string;
}

export default function ViewPasswordButton({
  inputId,
}: ViewPasswordButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      input.type = !isVisible ? "text" : "password";
      setIsVisible(!isVisible);
    }
  };

  return (
    <InputGroupAddon align={"inline-end"}>
      <InputGroupButton
        onClick={handleToggle}
        type="button"
        aria-label="Toggle password visibility"
      >
        {isVisible ? (
          <EyeIcon weight="bold" className="size-4" />
        ) : (
          <EyeClosedIcon weight="bold" className="size-4" />
        )}
      </InputGroupButton>
    </InputGroupAddon>
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
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
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
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
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
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
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
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
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
