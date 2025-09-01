import axiosInstance from "@/lib/axios"

export interface SignUpPayload {
  name: string
  mobile_number: string
  email: string
  password: string
  password_confirmation: string
}

export interface SignInPayload {
  email: string
  password: string
}

export const authService = {
  signUp: (payload: SignUpPayload) =>
    axiosInstance.post("/register", payload).then((res: any) => res.data),

  signIn: (payload: SignInPayload) =>
    axiosInstance.post("/login", payload).then((res: any) => res.data),
}
