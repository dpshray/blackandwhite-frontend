import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";

export default function LoginPage() {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <div className="w-full max-w-md">
          {/* <LoginForm /> */}
        </div>
      </div>
    </RedirectIfAuthenticated>
  )
}
