export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-6 py-12">
      <div className="flex max-w-3xl w-full flex-col items-center gap-16 text-center">
        <div className="flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Scaffolded successfully
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Welcome to your g-stack app
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-zinc-400">
            A production-ready Next.js application with type safety, modern
            routing, and your selected stack.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
          <div className="flex flex-col gap-2 bg-zinc-950 p-6">
            <h2 className="text-sm font-semibold text-white">App Router</h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              Server Components, Server Actions, and file-based routing.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-zinc-950 p-6">
            <h2 className="text-sm font-semibold text-white">
              Authentication
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              Secure routes and API handlers with your chosen auth provider.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-zinc-950 p-6">
            <h2 className="text-sm font-semibold text-white">Database</h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              Type-safe data access powered by PostgreSQL and Prisma ORM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/signin"
            className="inline-flex h-10 items-center rounded-md bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
          >
            Get started
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-md border border-zinc-800 bg-transparent px-6 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900"
          >
            Documentation
          </a>
        </div>
      </div>
    </main>
  );
}
