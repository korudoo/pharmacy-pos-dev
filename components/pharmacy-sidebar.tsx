"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Truck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Inventory", icon: Package },
  { name: "Sales Reports", icon: BarChart3 },
  { name: "Vendors", icon: Truck },
]

const settingsItems = [
  { name: "Settings", icon: Settings },
  { name: "Logout", icon: LogOut },
]

export function PharmacySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#F5F5F5] border-r border-gray-200 transition-all duration-300 z-50 flex flex-col ${
        isCollapsed ? "w-16 md:w-20" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#208C8A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
            <span className="font-semibold text-[#1F2121] text-lg">Ausadhi POS</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-[#208C8A] rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">AP</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-[#1F2121]" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-[#1F2121]" />
        )}
      </button>

      {/* Main Menu Items */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.name
          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive ? "bg-[#208C8A] text-white" : "text-[#1F2121] hover:bg-gray-200"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium text-sm">{item.name}</span>}
            </button>
          )
        })}

        {/* Separator */}
        <div className="py-2">
          <div className="border-t border-gray-200" />
        </div>

        {/* Settings Items */}
        {settingsItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.name
          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive ? "bg-[#208C8A] text-white" : "text-[#1F2121] hover:bg-gray-200"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium text-sm">{item.name}</span>}
            </button>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-3 border-t border-gray-200">
        <div className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 bg-[#208C8A] rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1F2121]">Admin User</p>
              <span className="inline-block bg-[#208C8A] text-white text-xs px-2 py-0.5 rounded-md mt-1 font-medium">
                Administrator
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
