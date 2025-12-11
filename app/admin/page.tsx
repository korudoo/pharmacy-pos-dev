"use client"

import { useState } from "react"
import { LayoutDashboard, Package, BarChart3, Truck, Settings, LogOut, Search, Bell, User } from "lucide-react"

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
          <button
            onClick={() => setActiveMenu("Dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeMenu === "Dashboard" ? "bg-[#208C8A] text-white" : "text-[#1F2121] hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveMenu("Inventory")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeMenu === "Inventory" ? "bg-[#208C8A] text-white" : "text-[#1F2121] hover:bg-gray-100"
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="font-medium text-sm">Inventory</span>
          </button>

          <button
            onClick={() => setActiveMenu("Sales Reports")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeMenu === "Sales Reports" ? "bg-[#208C8A] text-white" : "text-[#1F2121] hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium text-sm">Sales Reports</span>
          </button>

          <button
            onClick={() => setActiveMenu("Vendors")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeMenu === "Vendors" ? "bg-[#208C8A] text-white" : "text-[#1F2121] hover:bg-gray-100"
            }`}
          >
            <Truck className="w-5 h-5" />
            <span className="font-medium text-sm">Vendors</span>
          </button>

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
              <User className="w-5 h-5 text-white" />
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

        {/* Page Content */}
        <main className="pt-16 p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1F2121] mb-2">Welcome to AusadhiPOS</h1>
              <p className="text-gray-600">Manage your pharmacy operations efficiently</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#208C8A] to-[#1a6f6d] p-6 rounded-lg shadow-sm text-white">
                <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
                <p className="text-3xl font-bold">₹45,230</p>
                <p className="text-sm opacity-90 mt-1">+12% from last month</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-[#1F2121] mb-2">Inventory Items</h2>
                <p className="text-3xl font-bold text-[#208C8A]">1,234</p>
                <p className="text-sm text-gray-600 mt-1">5 items low stock</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-[#1F2121] mb-2">Today Orders</h2>
                <p className="text-3xl font-bold text-[#208C8A]">87</p>
                <p className="text-sm text-gray-600 mt-1">23 pending</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-[#1F2121] mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">New order #12345 received</span>
                  <span className="text-xs text-gray-400">2 mins ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Inventory updated: Paracetamol 500mg</span>
                  <span className="text-xs text-gray-400">15 mins ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Payment received from Order #12340</span>
                  <span className="text-xs text-gray-400">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
