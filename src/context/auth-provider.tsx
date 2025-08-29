"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const token = Cookies.get("auth-token")
    const userData = Cookies.get("user-data")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Error parsing user data:", error)
        Cookies.remove("auth-token")
        Cookies.remove("user-data")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call with random success/failure
      const isSuccess = Math.random() > 0.3 // 70% success rate

      if (!isSuccess) {
        return { success: false, error: "Invalid credentials" }
      }

      // Determine user role based on email domain
      const isAdmin = email.includes("admin") || email.endsWith("@admin.com")

      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        role: isAdmin ? "admin" : "user",
      }

      const token = "mock-jwt-token-" + Math.random().toString(36).substr(2, 9)

      Cookies.set("auth-token", token, { expires: 7 })
      Cookies.set("user-data", JSON.stringify(userData), { expires: 7 })
      setUser(userData)

      return { success: true }
    } catch {
      return { success: false, error: "Login failed" }
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Simulate API call with random success/failure
      const isSuccess = Math.random() > 0.2 // 80% success rate

      if (!isSuccess) {
        return { success: false, error: "Email already exists" }
      }

      const isAdmin = email.includes("admin") || email.endsWith("@admin.com")

      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: isAdmin ? "admin" : "user",
      }

      const token = "mock-jwt-token-" + Math.random().toString(36).substr(2, 9)

      Cookies.set("auth-token", token, { expires: 7 })
      Cookies.set("user-data", JSON.stringify(userData), { expires: 7 })
      setUser(userData)

      return { success: true }
    } catch {
      return { success: false, error: "Signup failed" }
    }
  }

  const logout = () => {
    Cookies.remove("auth-token")
    Cookies.remove("user-data")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
