import LoginForm from "@/components/auth/LoginForm";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";

export default function LoginPage() {
  return (
    <RedirectIfAuthenticated redirectTo="/admin">
      <LoginForm />
    </RedirectIfAuthenticated>
  );
}
