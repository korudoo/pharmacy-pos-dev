"use client"

import { useState } from "react"
import { TrendingUp, Clock } from "lucide-react"

interface TopProduct {
  rank: number
  name: string
  units: number
  revenue: number
}

interface ExpiryAlert {
  id: number
  product: string
  batch: string
  expires: string
  days: number
  status: "safe" | "warning" | "danger" | "critical"
}

interface ProductsExpirySectionProps {
  onViewDetails?: (productName: string) => void
  onApplyDiscount?: (alertId: number) => void
}

export default function ProductsExpirySection({ onViewDetails, onApplyDiscount }: ProductsExpirySectionProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [hoveredAlert, setHoveredAlert] = useState<number | null>(null)

  const mockTopProducts: TopProduct[] = [
    { rank: 1, name: "Paracetamol 500mg", units: 45, revenue: 2250 },
    { rank: 2, name: "Vitamin C 500mg", units: 32, revenue: 1600 },
    { rank: 3, name: "Cough Syrup (100ml)", units: 28, revenue: 840 },
    { rank: 4, name: "Multivitamin Caps", units: 22, revenue: 1980 },
    { rank: 5, name: "Aspirin 75mg", units: 18, revenue: 360 },
  ]

  const mockExpiryAlerts: ExpiryAlert[] = [
    { id: 1, product: "Cough Syrup", batch: "C23", expires: "Jan 12, 2025", days: 15, status: "warning" },
    { id: 2, product: "Vitamin Tablet", batch: "V45", expires: "Jan 5, 2025", days: 8, status: "danger" },
    { id: 3, product: "Antibiotics", batch: "AB12", expires: "Dec 31, 2024", days: 2, status: "critical" },
    { id: 4, product: "Paracetamol", batch: "P67", expires: "Jan 20, 2025", days: 22, status: "warning" },
  ]

  const getStatusColor = (status: ExpiryAlert["status"]) => {
    switch (status) {
      case "safe":
        return "bg-green-100 text-green-700 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "danger":
        return "bg-red-100 text-red-700 border-red-200"
      case "critical":
        return "bg-red-200 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: ExpiryAlert["status"]) => {
    switch (status) {
      case "safe":
        return "✅"
      case "warning":
        return "⚠️"
      case "danger":
        return "🔴"
      case "critical":
        return "🔴"
      default:
        return "ℹ️"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Selling Products */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#208C8A]/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-[#208C8A]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2121]">Top Selling Products</h2>
        </div>

        <div className="space-y-2">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-3 pb-3 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Product Name</div>
            <div className="col-span-3 text-center">Units Sold</div>
            <div className="col-span-3 text-right">Revenue</div>
          </div>

          {/* Table Rows */}
          {mockTopProducts.map((product) => (
            <div
              key={product.rank}
              className={`grid grid-cols-12 gap-3 py-3 border-b border-gray-100 transition-all duration-200 ${
                hoveredProduct === product.rank ? "bg-[#208C8A]/5" : ""
              }`}
              onMouseEnter={() => setHoveredProduct(product.rank)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="col-span-1 flex items-center">
                <div className="w-7 h-7 bg-[#208C8A] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {product.rank}
                </div>
              </div>
              <div className="col-span-5 flex items-center">
                <span className="text-sm text-[#1F2121] font-medium">{product.name}</span>
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <span className="text-sm text-gray-600">{product.units}</span>
              </div>
              <div className="col-span-3 flex items-center justify-end gap-2">
                <span className="text-sm font-semibold text-[#1F2121]">Rs. {product.revenue.toLocaleString()}</span>
                {hoveredProduct === product.rank && (
                  <button
                    onClick={() => {
                      onViewDetails?.(product.name)
                      console.log("View product:", product.name)
                    }}
                    className="px-3 py-1 bg-[#208C8A] text-white text-xs rounded-md hover:bg-[#1a6f6d] transition-colors"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expiry Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 rounded-lg">
            <Clock className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-[#1F2121]">Expiry Alerts</h2>
        </div>

        <div className="space-y-2">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 pb-3 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-3">Product</div>
            <div className="col-span-2">Batch#</div>
            <div className="col-span-3">Expires</div>
            <div className="col-span-2 text-center">Days Left</div>
            <div className="col-span-2 text-center">Status</div>
          </div>

          {/* Table Rows */}
          {mockExpiryAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`grid grid-cols-12 gap-2 py-3 border-b border-gray-100 transition-all duration-200 cursor-pointer ${
                hoveredAlert === alert.id ? "bg-red-50" : ""
              }`}
              onMouseEnter={() => setHoveredAlert(alert.id)}
              onMouseLeave={() => setHoveredAlert(null)}
            >
              <div className="col-span-3 flex items-center">
                <span className="text-sm text-[#1F2121] font-medium">{alert.product}</span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-xs text-gray-600 font-mono">{alert.batch}</span>
              </div>
              <div className="col-span-3 flex items-center">
                <span className="text-xs text-gray-600">{alert.expires}</span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#1F2121]">{alert.days}</span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                {hoveredAlert === alert.id ? (
                  <button
                    onClick={() => {
                      onApplyDiscount?.(alert.id)
                      console.log("Apply discount:", alert.id)
                    }}
                    className="px-2 py-1 bg-[#208C8A] text-white text-xs rounded-md hover:bg-[#1a6f6d] transition-colors whitespace-nowrap"
                  >
                    Apply Discount
                  </button>
                ) : (
                  <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(alert.status)}`}>
                    {getStatusIcon(alert.status)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
