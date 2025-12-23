"use client"

import { useState, useEffect } from "react"
import {
  DollarSign,
  ShoppingCart,
  Wallet,
  Package,
  FileText,
  Receipt,
  LogOut,
  Wifi,
  WifiOff,
  Clock,
} from "lucide-react"

interface CashierDashboardProps {
  onStartSale: () => void
  onCheckInventory: () => void
  onViewMySales: () => void
  onLogout: () => void
}

const mockProducts = [
  { name: "Paracetamol", sku: "MED001", stock: 120 },
  { name: "Cough Syrup", sku: "MED002", stock: 45 },
  { name: "Vitamin C", sku: "MED003", stock: 5 },
  { name: "Multivitamin", sku: "MED004", stock: 0 },
  { name: "Aspirin", sku: "MED005", stock: 78 },
]

export default function CashierDashboard({
  onStartSale,
  onCheckInventory,
  onViewMySales,
  onLogout,
}: CashierDashboardProps) {
  const [quickSearchQuery, setQuickSearchQuery] = useState("")
  const [quickSearchResult, setQuickSearchResult] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [onlineStatus] = useState("online")

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle quick inventory search
  useEffect(() => {
    if (quickSearchQuery.trim().length < 2) {
      setQuickSearchResult(null)
      return
    }

    const product = mockProducts.find(
      (p) =>
        p.name.toLowerCase().includes(quickSearchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(quickSearchQuery.toLowerCase()),
    )

    if (!product) {
      setQuickSearchResult("Product not found")
    } else if (product.stock === 0) {
      setQuickSearchResult("Out of Stock")
    } else if (product.stock < 10) {
      setQuickSearchResult(`Low Stock: ${product.stock} units`)
    } else {
      setQuickSearchResult(`In Stock: ${product.stock} units`)
    }
  }, [quickSearchQuery])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2121]">Cashier Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">{formatDate(currentTime)}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Time Display */}
          <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm">
            <Clock className="h-5 w-5 text-[#208C8A]" />
            <span className="text-xl font-semibold text-[#1F2121]">{formatTime(currentTime)}</span>
          </div>
          {/* Connection Status */}
          <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm">
            {onlineStatus === "online" ? (
              <>
                <Wifi className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-600">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md border-l-4 border-[#208C8A]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Sales</p>
              <p className="mt-2 text-3xl font-bold text-[#1F2121]">Rs. 12,500</p>
            </div>
            <div className="rounded-full bg-[#208C8A] bg-opacity-10 p-4">
              <DollarSign className="h-8 w-8 text-[#208C8A]" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="mt-2 text-3xl font-bold text-[#1F2121]">35</p>
            </div>
            <div className="rounded-full bg-blue-500 bg-opacity-10 p-4">
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cash in Register</p>
              <p className="mt-2 text-3xl font-bold text-[#1F2121]">Rs. 5,200</p>
            </div>
            <div className="rounded-full bg-green-600 bg-opacity-10 p-4">
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <button
          onClick={() => {
            onStartSale()
            console.log("Start new sale")
          }}
          className="flex h-32 items-center justify-center gap-3 rounded-lg bg-[#208C8A] text-white shadow-lg transition-all active:scale-95"
        >
          <ShoppingCart className="h-10 w-10" />
          <span className="text-2xl font-bold">New Sale</span>
        </button>

        <button
          onClick={() => {
            onCheckInventory()
            console.log("Check inventory")
          }}
          className="flex h-32 items-center justify-center gap-3 rounded-lg bg-blue-600 text-white shadow-lg transition-all active:scale-95"
        >
          <Package className="h-10 w-10" />
          <span className="text-2xl font-bold">Quick Inventory</span>
        </button>

        <button
          onClick={() => {
            onViewMySales()
            console.log("View my sales")
          }}
          className="flex h-32 items-center justify-center gap-3 rounded-lg bg-purple-600 text-white shadow-lg transition-all active:scale-95"
        >
          <FileText className="h-10 w-10" />
          <span className="text-2xl font-bold">My Sales Today</span>
        </button>

        <button
          onClick={() => {
            console.log("Print receipt")
          }}
          className="flex h-32 items-center justify-center gap-3 rounded-lg bg-orange-600 text-white shadow-lg transition-all active:scale-95"
        >
          <Receipt className="h-10 w-10" />
          <span className="text-2xl font-bold">Print Receipt</span>
        </button>
      </div>

      {/* Quick Inventory Search & Mini Widgets */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {/* Quick Inventory Search */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-bold text-[#1F2121]">Quick Inventory Check</h3>
          <input
            type="text"
            value={quickSearchQuery}
            onChange={(e) => setQuickSearchQuery(e.target.value)}
            placeholder="Enter product name or SKU..."
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-[#208C8A] focus:outline-none"
          />
          {quickSearchResult && (
            <div
              className={`mt-3 rounded-lg px-4 py-3 text-center text-lg font-semibold ${
                quickSearchResult.includes("Out of Stock")
                  ? "bg-red-100 text-red-700"
                  : quickSearchResult.includes("Low Stock")
                    ? "bg-yellow-100 text-yellow-700"
                    : quickSearchResult.includes("In Stock")
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
              }`}
            >
              {quickSearchResult}
            </div>
          )}
        </div>

        {/* Recent Items */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-bold text-[#1F2121]">Recent Items Scanned</h3>
          <div className="space-y-2">
            {["Paracetamol", "Cough Syrup", "Vitamin C", "Multivitamin"].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
              >
                <span className="font-medium text-[#1F2121]">{item}</span>
                <button className="text-sm text-[#208C8A] font-medium">Add to Sale</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Bills Widget */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-lg font-bold text-[#1F2121]">Pending Bills</h3>
        <p className="text-gray-600">No pending bills at the moment.</p>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            onLogout()
            console.log("Logout")
          }}
          className="flex h-16 items-center gap-3 rounded-lg bg-red-600 px-8 text-white shadow-lg transition-all active:scale-95"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-xl font-bold">Logout</span>
        </button>
      </div>
    </div>
  )
}
