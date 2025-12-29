"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Truck,
  Settings,
  LogOut,
  Menu,
  Calendar,
  Bell,
  User,
  ChevronDown,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  ChevronUp,
} from "lucide-react"
import SalesTrendChart from "@/components/sales-trend-chart"
import AIInsights from "@/components/ai-insights"
import ProductsExpirySection from "@/components/products-expiry-section"
import RecentTransactions from "@/components/recent-transactions"

interface AdminDashboardProps {
  onNavigate?: (page: string) => void
  onLogout?: () => void
}

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activePage, setActivePage] = useState("Dashboard")
  const [dateRange, setDateRange] = useState("This Week")
  const [refreshing, setRefreshing] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Package, label: "Inventory", active: false },
    { icon: BarChart3, label: "Sales Reports", active: false },
    { icon: Truck, label: "Vendors", active: false },
    { icon: Settings, label: "Settings", active: false },
  ]

  const statsCards = [
    {
      title: "Revenue",
      value: "Rs. 45,280",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-[#208C8A] to-[#1a6f6d]",
    },
    {
      title: "Expenses",
      value: "Rs. 28,150",
      change: "+5%",
      trend: "up",
      icon: TrendingDown,
      gradient: "from-orange-500 to-orange-600",
    },
    {
      title: "Profit Margin",
      value: "37.8%",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Low Stock Items",
      value: "8",
      change: "Critical",
      trend: "down",
      icon: AlertTriangle,
      gradient: "from-red-500 to-red-600",
    },
  ]

  const handleRefresh = () => {
    setRefreshing(true)
    console.log("Refreshing dashboard")
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleMenuClick = (label: string) => {
    setActivePage(label)
    if (onNavigate) {
      onNavigate(label)
    }
    console.log("Navigate to:", label)
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    console.log("Logout clicked")
  }

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-64"
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            {!sidebarCollapsed && <span className="text-xl font-bold text-[#1F2121]">Ausadhi POS</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleMenuClick(item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      item.active
                        ? "bg-[#208C8A] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-[#1F2121]">{activePage}</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Date Range Selector */}
              <div className="relative hidden md:block">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#208C8A]/20 appearance-none"
                >
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Custom</option>
                </select>
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-[#208C8A] text-white rounded-lg hover:bg-[#1a6f6d] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-5 h-5 text-gray-600" />
                <span className="hidden md:inline text-sm font-medium text-gray-700">Admin User</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {refreshing ? (
            // Loading Skeletons
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, index) => {
                  const Icon = card.icon
                  return (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        if (card.title === "Low Stock Items") {
                          console.log("View low stock items")
                        }
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${card.gradient} text-white`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            card.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {card.change}
                        </span>
                      </div>
                      <h3 className="text-sm text-gray-600 mb-1">{card.title}</h3>
                      <p className="text-2xl font-bold text-[#1F2121]">{card.value}</p>
                    </div>
                  )
                })}
              </div>

              {/* Sales Trend Chart */}
              <div>
                <button
                  onClick={() => toggleSection("chart")}
                  className="w-full flex items-center justify-between mb-2 text-left"
                >
                  <h2 className="text-lg font-semibold text-[#1F2121]">Sales Trend</h2>
                  {collapsedSections["chart"] ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {!collapsedSections["chart"] && (
                  <div className="transition-all duration-300">
                    <SalesTrendChart onFilterChange={(filter) => console.log("Filter changed:", filter)} />
                  </div>
                )}
              </div>

              {/* AI Insights */}
              <div>
                <button
                  onClick={() => toggleSection("insights")}
                  className="w-full flex items-center justify-between mb-2 text-left"
                >
                  <h2 className="text-lg font-semibold text-[#1F2121]">AI Insights & Alerts</h2>
                  {collapsedSections["insights"] ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {!collapsedSections["insights"] && (
                  <div className="transition-all duration-300">
                    <AIInsights onAction={(id, action) => console.log("AI Action:", id, action)} />
                  </div>
                )}
              </div>

              {/* Products & Expiry Section */}
              <div>
                <button
                  onClick={() => toggleSection("products")}
                  className="w-full flex items-center justify-between mb-2 text-left"
                >
                  <h2 className="text-lg font-semibold text-[#1F2121]">Products & Expiry Alerts</h2>
                  {collapsedSections["products"] ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {!collapsedSections["products"] && (
                  <div className="transition-all duration-300">
                    <ProductsExpirySection
                      onViewDetails={(product) => console.log("View product:", product)}
                      onApplyDiscount={(id) => console.log("Apply discount:", id)}
                    />
                  </div>
                )}
              </div>

              {/* Recent Transactions */}
              <div>
                <button
                  onClick={() => toggleSection("transactions")}
                  className="w-full flex items-center justify-between mb-2 text-left"
                >
                  <h2 className="text-lg font-semibold text-[#1F2121]">Recent Transactions</h2>
                  {collapsedSections["transactions"] ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {!collapsedSections["transactions"] && (
                  <div className="transition-all duration-300">
                    <RecentTransactions
                      onViewReceipt={(id) => console.log("View receipt:", id)}
                      onReprintReceipt={(id) => console.log("Reprint receipt:", id)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
