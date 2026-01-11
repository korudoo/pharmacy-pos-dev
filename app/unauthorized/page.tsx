"use client"

import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#d4d4dc] p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4v2m0 0a9 9 0 1018 0 9 9 0 00-18 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#1a1a2e] mb-2">Access Denied</h1>
          <p className="text-lg text-gray-600 mb-4">
            You are not authorized to access this page.
          </p>
          <p className="text-sm text-gray-500">
            Your current role does not have permission to view this content.
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-[#1a1a2e] text-white rounded-lg font-medium hover:bg-[#2a2a3e] transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}
