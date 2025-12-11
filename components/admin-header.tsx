"use client"

import { useState } from "react"
import { Menu, Search, Calendar, Bell, User, ChevronDown, Settings, LogOut } from "lucide-react"

export function AdminHeader({
  title = "Dashboard",
  onMenuClick,
}: {
  title?: string
  onMenuClick?: () => void
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showDateMenu, setShowDateMenu] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState("This Month")

  const notifications = [
    { id: 1, message: "Low stock alert: Paracetamol 500mg", unread: true },
    { id: 2, message: "New order received #12345", unread: true },
    { id: 3, message: "Vendor payment due tomorrow", unread: false },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 bg-white border-b border-gray-200 z-40 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Left Section: Hamburger + Breadcrumb */}
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-[#1F2121]" />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-400">/</span>
            <span className="font-semibold text-[#1F2121]">{title}</span>
          </div>
        </div>

        {/* Middle Section: Title */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold text-[#1F2121]">{title}</h1>
        </div>

        {/* Right Section: Search, Date, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 w-48 lg:w-64 h-9 bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm outline-none focus:border-[#208C8A] focus:ring-2 focus:ring-[#208C8A]/20 transition-all"
            />
          </div>

          {/* Date Range Selector - Hidden on mobile */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setShowDateMenu(!showDateMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#1F2121]" />
              <span className="text-sm text-[#1F2121]">{selectedDateRange}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showDateMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                {["Today", "This Week", "This Month", "Custom"].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedDateRange(range)
                      setShowDateMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#1F2121] hover:bg-gray-50 transition-colors"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-[#1F2121]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-semibold text-[#1F2121]">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-start gap-2">
                        {notification.unread && (
                          <span className="w-2 h-2 bg-[#208C8A] rounded-full mt-1.5 flex-shrink-0" />
                        )}
                        <p className="text-sm text-[#1F2121]">{notification.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-[#208C8A] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-[#1F2121]">Admin User</p>
                  <p className="text-xs text-gray-500">admin@ausadhi.com</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-[#1F2121] hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-[#1F2121] hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors flex items-center gap-2 border-t border-gray-200">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
