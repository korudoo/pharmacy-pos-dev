"use client"

import { useState, FormEvent } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (!result?.ok) {
        setError(result?.error || "Login failed")
        setIsLoading(false)
        return
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard")
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Dark navy background with branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a2e] flex-col justify-between p-12">
        {/* Logo and brand name */}
        <div className="flex items-center gap-3">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#b794f6]"
          >
            {/* Store icon */}
            <rect x="8" y="16" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M8 16L12 8L20 8L24 16" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="16" cy="26" r="2" fill="currentColor" />
            <rect x="11" y="30" width="10" height="6" fill="currentColor" />

            {/* Calculator icon */}
            <rect x="28" y="12" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="30" y1="16" x2="38" y2="16" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="31.5" cy="19" r="0.75" fill="currentColor" />
            <circle cx="34" cy="19" r="0.75" fill="currentColor" />
            <circle cx="36.5" cy="19" r="0.75" fill="currentColor" />
            <circle cx="31.5" cy="21.5" r="0.75" fill="currentColor" />
            <circle cx="34" cy="21.5" r="0.75" fill="currentColor" />
            <circle cx="36.5" cy="21.5" r="0.75" fill="currentColor" />
            <circle cx="31.5" cy="24" r="0.75" fill="currentColor" />
            <circle cx="34" cy="24" r="0.75" fill="currentColor" />
            <circle cx="36.5" cy="24" r="0.75" fill="currentColor" />
          </svg>
          <span className="text-3xl font-medium text-[#b794f6]">AusadhiPOS</span>
        </div>
        {/* Tagline */}
        <div>
          <h1 className="text-5xl font-medium text-[#b794f6] leading-tight max-w-lg">
            Stay on top of your pharmacy operations
          </h1>
        </div>
        <div></div> {/* Spacer for layout */}
      </div>

      {/* Right side - Light gray background with login form */}
      <div className="flex-1 flex items-center justify-center bg-[#d4d4dc] p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-semibold text-[#1a1a2e] mb-12">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="bg-[#c8c8d4] rounded-2xl p-8 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue=""
                className="w-full px-4 py-3 bg-white rounded-lg text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#b794f6]"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue=""
                className="w-full px-4 py-3 bg-white rounded-lg text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#b794f6]"
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-12 py-3 bg-[#1a1a2e] text-white rounded-lg font-medium hover:bg-[#2a2a3e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
