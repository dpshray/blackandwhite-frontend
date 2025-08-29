"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/context/authContext"

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode
  redirectTo?: string
}

export function RedirectIfAuthenticated({ children, redirectTo = "/" }: RedirectIfAuthenticatedProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push(redirectTo)
    }
  }, [user, isLoading, redirectTo, router])

  if (isLoading) {
    return null
  }

  if (user) {
    return null
  }

  return <>{children}</>
}
