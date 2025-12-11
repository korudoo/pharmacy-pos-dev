"use client"

import { useState, type ReactNode, Component, type ErrorInfo } from "react"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import { AdminHeader } from "@/components/admin-header"

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[v0] Dashboard Layout Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
          <div className="bg-white rounded-xl border shadow-sm p-6 max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">An error occurred while loading the dashboard.</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-[#208C8A] text-white rounded-lg hover:bg-[#1a6f6d] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

interface DashboardLayoutProps {
  children: ReactNode
  currentPage: string
  pageTitle: string
}

export function DashboardLayout({ children, currentPage, pageTitle }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen bg-[#F5F5F5]">
        {/* Sidebar */}
        <PharmacySidebar />

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:ml-64">
          {/* Header */}
          <AdminHeader title={pageTitle} onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

          {/* Content Area */}
          <main className="flex-1 mt-16 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="bg-white rounded-xl border shadow-sm min-h-[calc(100vh-8rem)]">
              <div className="p-6">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}
