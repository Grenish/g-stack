import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
      <SignUp appearance={{
        variables: {
          colorPrimary: "#ffffff",
          colorBackground: "#09090b",
          colorInputBackground: "#09090b",
          colorText: "#ffffff",
          colorTextSecondary: "#a1a1aa",
          colorInputText: "#ffffff",
          colorBorder: "#27272a",
        },
        elements: {
          card: "border border-zinc-800 bg-zinc-950",
          headerTitle: "text-white",
          headerSubtitle: "text-zinc-400",
          socialButtonsBlockButton: "border-zinc-800 text-white hover:bg-zinc-900",
          formButtonPrimary: "bg-white text-black hover:bg-zinc-200",
          footerActionText: "text-zinc-400",
          footerActionLink: "text-white hover:text-zinc-300",
        }
      }} />
    </div>
  );
}
