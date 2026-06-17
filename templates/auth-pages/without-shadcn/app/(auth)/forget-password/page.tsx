export default function ResetPasswordPage() {
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
