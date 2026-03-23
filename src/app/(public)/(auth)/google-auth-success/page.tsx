import { Suspense } from "react"
import GoogleCallback from "./GoogleCallback" // your existing component

export default function GoogleAuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium">Logging you in with Google...</p>
      </div>
    }>
      <GoogleCallback />
    </Suspense>
  )
}