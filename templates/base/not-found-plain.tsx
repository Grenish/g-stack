import Link from "next/link";

const LostIcon = () => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="size-8"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M176,140a12,12,0,1,1-12-12A12,12,0,0,1,176,140ZM128,92a12,12,0,1,0-12,12A12,12,0,0,0,128,92Zm73-38A104,104,0,0,0,50.48,197.33,8,8,0,1,0,62.4,186.66a88,88,0,1,1,131.19,0,8,8,0,0,0,11.93,10.67A104,104,0,0,0,201,54ZM152,168H136c-21.74,0-48-17.84-48-40a41.33,41.33,0,0,1,.55-6.68,8,8,0,1,0-15.78-2.64A56.9,56.9,0,0,0,72,128c0,14.88,7.46,29.13,21,40.15C105.4,178.22,121.07,184,136,184h16a8,8,0,0,1,0,16H96a24,24,0,0,0,0,48,8,8,0,0,0,0-16,8,8,0,0,1,0-16h56a24,24,0,0,0,0-48Z" />
    </svg>
  );
};

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-white text-zinc-950">
      <div className="mx-auto flex min-h-dvh w-full max-w-sm items-center justify-center px-6">
        <section
          aria-labelledby="not-found-heading"
          className="w-full text-center"
        >
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
            <LostIcon />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-500">404</p>
            <h1
              id="not-found-heading"
              className="text-lg font-semibold tracking-tight text-zinc-950"
            >
              Looks Like You&apos;re Lost
            </h1>
            <p className="mx-auto max-w-xs text-sm leading-6 text-zinc-500">
              The page you&apos;re trying to access doesn&apos;t exist or is no
              longer available.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-7 items-center justify-center rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
            >
              Go home
            </Link>
            <Link
              href="/signin"
              className="inline-flex h-7 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
            >
              Sign in
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
