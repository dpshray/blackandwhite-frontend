import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated"
import RegisterForm from "@/components/auth/RegisterForm"

export default function SignUpPage() {

  return (
    <RedirectIfAuthenticated>
      <RegisterForm />
    </RedirectIfAuthenticated>
  )
}
