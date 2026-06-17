import { LockKeyhole, Mail, PersonStanding, User2 } from "lucide-react";
import Link from "next/link";

const XLogo = () => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
    </svg>
  );
};

const GoogleLogo = () => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z" />
    </svg>
  );
};

export default function SignupPage() {
  return (
    <main className="min-h-dvh bg-white text-zinc-950">
      <div className="mx-auto flex min-h-dvh w-full max-w-sm items-center justify-center px-6 py-12">
        <form className="w-full" aria-labelledby="signup-heading">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <h1
                id="signup-heading"
                className="text-sm font-semibold tracking-tight"
              >
                Acme
              </h1>
              <p className="text-sm text-zinc-500">
                Sign up to create an account.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold text-zinc-800"
                >
                  Name
                </label>
                <div className="relative flex h-8 items-center rounded-full bg-zinc-100 transition focus-within:bg-zinc-50 focus-within:ring-2 focus-within:ring-zinc-300">
                  <PersonStanding
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                    strokeWidth={2.25}
                  />
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First Name"
                    required
                    className="h-full min-w-0 flex-1 rounded-l-full bg-transparent pl-9 pr-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                  />
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    required
                    aria-label="Last Name"
                    className="h-full min-w-0 flex-1 rounded-r-full bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-zinc-800"
                  >
                    Username
                  </label>
                  <p className="text-sm text-zinc-500">
                    Choose a unique username to identify yourself
                  </p>
                </div>
                <div className="relative">
                  <User2
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                    strokeWidth={2.25}
                  />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    required
                    className="h-8 w-full rounded-full bg-zinc-100 pl-9 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:bg-zinc-50 focus:ring-2 focus:ring-zinc-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-zinc-800"
                  >
                    Email
                  </label>
                  <p className="text-sm leading-5 text-zinc-500">
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </p>
                </div>
                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                    strokeWidth={2.25}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    className="h-8 w-full rounded-full bg-zinc-100 pl-9 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:bg-zinc-50 focus:ring-2 focus:ring-zinc-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-zinc-800"
                  >
                    Password
                  </label>
                  <p className="text-sm text-zinc-500">
                    Choose a strong password to protect your account.
                  </p>
                </div>
                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                    strokeWidth={2.25}
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    required
                    className="h-8 w-full rounded-full bg-zinc-100 pl-9 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:bg-zinc-50 focus:ring-2 focus:ring-zinc-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex h-7 items-center justify-center rounded-full bg-zinc-950 px-4 text-sm text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
              >
                Signup
              </button>
              <Link
                href="/signin"
                className="inline-flex h-7 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 text-sm  text-zinc-800 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
              >
                Have an account?
              </Link>
            </div>

            <div className="h-px w-full bg-zinc-200" />

            <div className="flex items-center gap-3">
              <p className="mr-auto text-sm font-semibold text-zinc-800">
                Or continue with
              </p>
              <button
                type="button"
                aria-label="Continue with Google"
                className="inline-flex size-8 items-center justify-center rounded-full bg-zinc-950 text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
              >
                <GoogleLogo />
              </button>
              <button
                type="button"
                aria-label="Continue with X"
                className="inline-flex size-8 items-center justify-center rounded-full bg-zinc-950 text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
              >
                <XLogo />
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
