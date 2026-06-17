export default function SignUpPage() {
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
