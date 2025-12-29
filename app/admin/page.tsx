"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Truck,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  DollarSign,
  TrendingDown,
  Target,
  AlertCircle,
} from "lucide-react"

export default function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("Dashboard")

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#208C8A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
            <span className="font-semibold text-[#1F2121] text-lg">Ausadhi POS</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: Package, label: "Inventory" },
            { icon: BarChart3, label: "Sales Reports" },
            { icon: Truck, label: "Vendors" },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={() => setActiveMenu(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  activeMenu === item.label ? "bg-[#208C8A] text-white" : "text-[#1F2121] hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            )
          })}

          <div className="py-2">
            <div className="border-t border-gray-200" />
          </div>

          <button
            onClick={() => setActiveMenu("Settings")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeMenu === "Settings" ? "bg-[#208C8A] text-white" : "text-[#1F2121] hover:bg-gray-100"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-[#1F2121] hover:bg-gray-100 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </nav>

        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="w-8 h-8 bg-[#208C8A] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1F2121]">Admin User</p>
              <span className="inline-block bg-[#208C8A] text-white text-xs px-2 py-0.5 rounded-md mt-1">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="fixed top-0 right-0 left-64 bg-white border-b border-gray-200 z-40 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Home</span>
              <span className="text-gray-400">/</span>
              <span className="font-semibold text-[#1F2121]">Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#208C8A]/20 focus:border-[#208C8A]"
                />
              </div>

              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-[#1F2121]" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>

              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-[#208C8A] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="pt-16 p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1F2121] mb-2">Welcome to AusadhiPOS</h1>
              <p className="text-gray-600">Manage your pharmacy operations efficiently</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-[#208C8A] to-[#1a6f6d] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-[#1a6f6d]">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white/90 mb-2">Total Revenue (Today)</h3>
                <p className="text-[28px] font-bold text-white mb-1">Rs. 5,200</p>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="text-green-300">↑ 12%</span>
                  <span>from yesterday</span>
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white/90 mb-2">Total Expenses (Today)</h3>
                <p className="text-[28px] font-bold text-white mb-1">Rs. 1,800</p>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="text-green-300">↓ 5%</span>
                  <span>from yesterday</span>
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white/90 mb-2">Profit Margin</h3>
                <p className="text-[28px] font-bold text-white mb-1">65.4%</p>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="text-green-200">↑ 8%</span>
                  <span>from yesterday</span>
                </p>
              </div>

              <div
                onClick={() => setActiveMenu("Inventory")}
                className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white/90 mb-2">Low Stock Items</h3>
                <p className="text-[28px] font-bold text-white mb-1">12 items</p>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span>⚠️ Needs attention</span>
                </p>
              </div>
            </div>

            {/* Placeholder for components - will add back one by one */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-[#1F2121] mb-4">Dashboard Content</h2>
              <p className="text-gray-600">
                Testing minimal admin page - if this loads without errors, we can add components back one by one.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
