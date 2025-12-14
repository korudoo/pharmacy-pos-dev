"use client"

import { useState } from "react"
import { BarChart3 } from "lucide-react"

const mockWeekData = [
  { day: "Mon", revenue: 300 },
  { day: "Tue", revenue: 450 },
  { day: "Wed", revenue: 320 },
  { day: "Thu", revenue: 520 },
  { day: "Fri", revenue: 680 },
  { day: "Sat", revenue: 750 },
  { day: "Sun", revenue: 580 },
]

const mockTodayData = [
  { day: "12 AM", revenue: 50 },
  { day: "3 AM", revenue: 20 },
  { day: "6 AM", revenue: 80 },
  { day: "9 AM", revenue: 250 },
  { day: "12 PM", revenue: 450 },
  { day: "3 PM", revenue: 380 },
  { day: "6 PM", revenue: 520 },
]

const mockMonthData = [
  { day: "Week 1", revenue: 2800 },
  { day: "Week 2", revenue: 3200 },
  { day: "Week 3", revenue: 2900 },
  { day: "Week 4", revenue: 3500 },
]

interface SalesTrendChartProps {
  onFilterChange?: (filter: string) => void
}

export default function SalesTrendChart({ onFilterChange }: SalesTrendChartProps) {
  const [selectedFilter, setSelectedFilter] = useState<"today" | "week" | "month">("week")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleFilterChange = (filter: "today" | "week" | "month") => {
    setSelectedFilter(filter)
    if (onFilterChange) {
      onFilterChange(filter)
    }
    console.log("Filter changed to:", filter)
  }

  const getChartData = () => {
    switch (selectedFilter) {
      case "today":
        return mockTodayData
      case "month":
        return mockMonthData
      default:
        return mockWeekData
    }
  }

  const chartData = getChartData()
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue))

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#208C8A]" />
          <h2 className="text-lg font-semibold text-[#1F2121]">Sales Trend</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange("today")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedFilter === "today" ? "bg-[#208C8A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => handleFilterChange("week")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedFilter === "week" ? "bg-[#208C8A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => handleFilterChange("month")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedFilter === "month" ? "bg-[#208C8A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Custom Chart */}
      <div className="relative h-80 border border-gray-200 rounded-lg p-6 bg-gray-50">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-12 w-16 flex flex-col justify-between text-xs text-gray-500">
          <span>Rs {maxRevenue}</span>
          <span>Rs {Math.round(maxRevenue * 0.75)}</span>
          <span>Rs {Math.round(maxRevenue * 0.5)}</span>
          <span>Rs {Math.round(maxRevenue * 0.25)}</span>
          <span>Rs 0</span>
        </div>

        {/* Chart area */}
        <div className="ml-16 h-full flex items-end justify-around gap-2 pb-12">
          {chartData.map((item, index) => {
            const heightPercent = (item.revenue / maxRevenue) * 100
            const isHovered = hoveredIndex === index

            return (
              <div key={index} className="flex-1 flex flex-col items-center justify-end group relative">
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full mb-2 bg-[#1F2121] text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg z-10">
                    <div className="font-semibold">{item.day}</div>
                    <div>Revenue: Rs {item.revenue}</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#1F2121]" />
                  </div>
                )}

                {/* Bar */}
                <div
                  className="w-full bg-gradient-to-t from-[#208C8A] to-[#2ab5b2] rounded-t-lg transition-all duration-300 cursor-pointer relative"
                  style={{ height: `${heightPercent}%` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Data point circle */}
                  <div
                    className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#208C8A] rounded-full border-2 border-white transition-all ${
                      isHovered ? "scale-150" : "scale-100"
                    }`}
                  />
                </div>

                {/* X-axis label */}
                <span className="text-xs text-gray-600 mt-2 font-medium">{item.day}</span>
              </div>
            )
          })}
        </div>

        {/* Grid lines */}
        <div className="absolute left-16 right-0 top-6 bottom-12 pointer-events-none">
          {[0, 25, 50, 75, 100].map((percent) => (
            <div
              key={percent}
              className="absolute left-0 right-0 border-t border-gray-300 border-dashed"
              style={{ bottom: `${percent}%` }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#208C8A]" />
          <span className="text-sm text-gray-600">Revenue (Rs)</span>
        </div>
      </div>
    </div>
  )
}
