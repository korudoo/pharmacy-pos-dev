"use client"

import { DollarSign, TrendingDown, Target, AlertCircle } from "lucide-react"

interface StatsData {
  revenue: number
  expenses: number
  margin: number
  lowStockItems: number
}

interface StatsCardsProps {
  stats?: StatsData
  onViewLowStock?: () => void
}

export default function StatsCards({
  stats = { revenue: 5200, expenses: 1800, margin: 65.4, lowStockItems: 12 },
  onViewLowStock = () => console.log("View low stock"),
}: StatsCardsProps) {
  const revenueChange = 12
  const expenseChange = -5
  const marginChange = 8

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1: Total Revenue */}
      <div className="bg-gradient-to-br from-[#208C8A] to-[#1a6f6d] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-[#1a6f6d]">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-sm font-medium text-white/90 mb-2">Total Revenue (Today)</h3>
        <p className="text-[28px] font-bold text-white mb-1">Rs. {stats.revenue.toLocaleString()}</p>
        <p className="text-xs text-white/80 flex items-center gap-1">
          <span className="text-green-300">↑ {revenueChange}%</span>
          <span>from yesterday</span>
        </p>
      </div>

      {/* Card 2: Total Expenses */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-sm font-medium text-white/90 mb-2">Total Expenses (Today)</h3>
        <p className="text-[28px] font-bold text-white mb-1">Rs. {stats.expenses.toLocaleString()}</p>
        <p className="text-xs text-white/80 flex items-center gap-1">
          <span className="text-green-300">↓ {Math.abs(expenseChange)}%</span>
          <span>from yesterday</span>
        </p>
      </div>

      {/* Card 3: Profit Margin */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-sm font-medium text-white/90 mb-2">Profit Margin</h3>
        <p className="text-[28px] font-bold text-white mb-1">{stats.margin}%</p>
        <p className="text-xs text-white/80 flex items-center gap-1">
          <span className="text-green-200">↑ {marginChange}%</span>
          <span>from yesterday</span>
        </p>
      </div>

      {/* Card 4: Low Stock Items (Clickable) */}
      <div
        onClick={onViewLowStock}
        className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-sm font-medium text-white/90 mb-2">Low Stock Items</h3>
        <p className="text-[28px] font-bold text-white mb-1">{stats.lowStockItems} items</p>
        <p className="text-xs text-white/80 flex items-center gap-1">
          <span>⚠️ Needs attention</span>
        </p>
      </div>
    </div>
  )
}
