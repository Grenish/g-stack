import { KeyRound, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Home() {
  const links = [
    { href: "/signin", label: "Sign in route", icon: LogIn },
    { href: "/signup", label: "Sign up route", icon: UserPlus },
    { href: "/reset-password", label: "Reset password route", icon: KeyRound },
  ];

  return (
    <div className="min-h-dvh">
      <div className="w-xl min-h-dvh mx-auto flex flex-col items-start justify-center gap-2">
        <div className="mb-5">
          <h2 className="text-3xl font-black mb-2">g-stack</h2>
          <p className="text-gray-500">
            NextJs 16, BetterAuth, Docker, PostgreSQL
          </p>
        </div>
        <p>
          A production-ready Next.js starter with end-to-end type safety, modern
          tooling, and batteries included.
        </p>
        <div className="w-full space-y-2 mb-3">
          <h2 className="font-medium">Explore added routes</h2>

          {links.map((link) => (
            <div
              key={link.href}
              className="w-full flex items-center text-sm justify-between border border-gray-200 rounded-xl p-2.5 px-3.5"
            >
              <div className="flex items-center gap-3.5">
                {link.icon && React.createElement(link.icon, { size: 16 })}
                <div>{link.label}</div>
              </div>
              <div>
                <Link href={link.href}>
                  <button className="h-7 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 border border-gray-200 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-transparent dark:hover:bg-input/30 rounded-lg">
                    {link.href}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p>
          To get started, edit the{" "}
          <kbd className="pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-lg bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none in-data-[slot=input-group]:bg-input in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3">
            page.tsx
          </kbd>{" "}
          file
        </p>
        <div className="mt-3">
          <Link href={"https://nextjs.org/docs"} target="_blank">
            <button className="h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 bg-gray-800 text-white hover:bg-gray-700/80 rounded-full text-sm">
              Read docs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
