import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-dvh bg-white text-zinc-950">
      <div className="mx-auto flex min-h-dvh w-full max-w-sm items-center justify-center px-6">
        <form className="w-full" aria-labelledby="reset-password-heading">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <h1
                id="reset-password-heading"
                className="text-sm font-semibold tracking-tight"
              >
                Acme
              </h1>
              <p className="text-sm text-zinc-500">Reset your password.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-semibold text-zinc-800"
                >
                  New Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                    strokeWidth={2.25}
                  />
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="New Password"
                    required
                    className="h-8 w-full rounded-full bg-zinc-100 pl-9 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:bg-zinc-50 focus:ring-2 focus:ring-zinc-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-semibold text-zinc-800"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                    strokeWidth={2.25}
                  />
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    required
                    className="h-8 w-full rounded-full bg-zinc-100 pl-9 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:bg-zinc-50 focus:ring-2 focus:ring-zinc-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex h-7 items-center justify-center rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
              >
                Reset Password
              </button>
              <Link
                href="/signin"
                className="inline-flex h-7 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
