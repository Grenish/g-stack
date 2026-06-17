import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-6 py-12">
      <div className="flex max-w-md w-full flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-400">
            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
            404 Error
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="text-base leading-relaxed text-zinc-400">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-md bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
