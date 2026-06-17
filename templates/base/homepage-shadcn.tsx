import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd } from "@/components/ui/kbd";
import { KeyRound, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-dvh">
      <div className="w-xl min-h-dvh mx-auto flex flex-col items-start justify-center gap-2">
        <div className="mb-5">
          <h2 className="text-3xl font-black mb-2">g-stack</h2>
          <p className="text-primary/70">
            NextJs 16, BetterAuth, Docker, PostgreSQL, shadcn/ui
          </p>
        </div>
        <p>
          A production-ready Next.js starter with end-to-end type safety, modern
          tooling, and batteries included.
        </p>
        <div className="w-full space-y-2 mb-3">
          <h2 className="font-medium">Explore added routes</h2>
          <Item variant={"outline"} size={"sm"}>
            <ItemMedia variant="icon">
              <LogIn />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Sign in route</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Link href={"/signin"}>
                <Button variant={"outline"} size={"xs"}>
                  /signin
                </Button>
              </Link>
            </ItemActions>
          </Item>
          <Item variant={"outline"} size={"sm"}>
            <ItemMedia variant="icon">
              <UserPlus />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Sign up route</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Link href={"/signup"}>
                <Button variant={"outline"} size={"xs"}>
                  /signup
                </Button>
              </Link>
            </ItemActions>
          </Item>
          <Item variant={"outline"} size={"sm"}>
            <ItemMedia variant="icon">
              <KeyRound />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Reset password route</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Link href={"/reset-password"}>
                <Button variant={"outline"} size={"xs"}>
                  /reset-password
                </Button>
              </Link>
            </ItemActions>
          </Item>
        </div>
        <p>
          To get started, edit the <Kbd>page.tsx</Kbd> file
        </p>
        <div className="mt-3">
          <Link href={"https://nextjs.org/docs"} target="_blank">
            <Button>Read docs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
