"use client"

import { useState } from "react"
import { BarChart3, Download, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface SalesReportsProps {
  onExport: (tabName: string) => void
  onDateRangeChange: (range: string) => void
}

export default function SalesReports({ onExport, onDateRangeChange }: SalesReportsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "product" | "cashier" | "payment">("overview")
  const [dateRange, setDateRange] = useState("This Week")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null)
  const [expandedCashier, setExpandedCashier] = useState<string | null>(null)

  const dateRanges = ["Today", "This Week", "This Month", "This Quarter", "This Year", "Custom"]
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "product", label: "By Product" },
    { id: "cashier", label: "By Cashier" },
    { id: "payment", label: "By Payment Method" },
  ]

  // Mock data
  const overviewData = {
    totalSales: 45000,
    itemsSold: 320,
    transactions: 125,
    avgValue: 360,
    bestHour: "12:00 PM",
    comparison: { sales: 12, items: 8, transactions: 5, avg: 3 },
  }

  const hourlyData = [
    { hour: "9 AM", sales: 2500 },
    { hour: "10 AM", sales: 3200 },
    { hour: "11 AM", sales: 4100 },
    { hour: "12 PM", sales: 5800 },
    { hour: "1 PM", sales: 4500 },
    { hour: "2 PM", sales: 3800 },
    { hour: "3 PM", sales: 4200 },
    { hour: "4 PM", sales: 5100 },
    { hour: "5 PM", sales: 6200 },
    { hour: "6 PM", sales: 4800 },
  ]

  const categoryData = [
    { name: "Painkillers", value: 35, color: "#208C8A" },
    { name: "Vitamins", value: 25, color: "#4ECDC4" },
    { name: "Cough/Cold", value: 20, color: "#95E1D3" },
    { name: "Antibiotics", value: 12, color: "#F38181" },
    { name: "Others", value: 8, color: "#AA96DA" },
  ]

  const productData = [
    { rank: 1, name: "Paracetamol 500mg", units: 150, revenue: 7500, margin: 2250, marginPct: 30 },
    { rank: 2, name: "Vitamin C 1000mg", units: 120, revenue: 6000, margin: 2100, marginPct: 35 },
    { rank: 3, name: "Cough Syrup", units: 95, revenue: 5700, margin: 1710, marginPct: 30 },
    { rank: 4, name: "Amoxicillin 500mg", units: 80, revenue: 4800, margin: 1200, marginPct: 25 },
    { rank: 5, name: "Ibuprofen 400mg", units: 75, revenue: 3750, margin: 1125, marginPct: 30 },
    { rank: 6, name: "Multivitamin", units: 70, revenue: 4200, margin: 1470, marginPct: 35 },
    { rank: 7, name: "Cetirizine 10mg", units: 65, revenue: 3250, margin: 975, marginPct: 30 },
    { rank: 8, name: "Omeprazole 20mg", units: 60, revenue: 3600, margin: 900, marginPct: 25 },
    { rank: 9, name: "Aspirin 100mg", units: 55, revenue: 2200, margin: 660, marginPct: 30 },
    { rank: 10, name: "Cough Drops", units: 50, revenue: 1500, margin: 525, marginPct: 35 },
    { rank: 11, name: "Hand Sanitizer", units: 48, revenue: 2400, margin: 720, marginPct: 30 },
    { rank: 12, name: "Face Masks (Box)", units: 45, revenue: 2250, margin: 675, marginPct: 30 },
    { rank: 13, name: "Thermometer", units: 40, revenue: 2000, margin: 600, marginPct: 30 },
    { rank: 14, name: "Band-Aid (Pack)", units: 38, revenue: 1140, margin: 399, marginPct: 35 },
    { rank: 15, name: "Cotton Swabs", units: 35, revenue: 1050, margin: 315, marginPct: 30 },
  ]

  const cashierData = [
    { name: "Ramesh Kumar", transactions: 45, sales: 16200, avgPerTransaction: 360, change: 8, status: "Active" },
    { name: "Sita Devi", transactions: 38, sales: 13680, avgPerTransaction: 360, change: 5, status: "Active" },
    { name: "Prakash Thapa", transactions: 25, sales: 9000, avgPerTransaction: 360, change: -3, status: "Active" },
    { name: "Anjali Sharma", transactions: 17, sales: 6120, avgPerTransaction: 360, change: 12, status: "Active" },
  ]

  const paymentMethodData = [
    { method: "Cash", count: 56, amount: 20160, percentage: 45, color: "#208C8A" },
    { method: "QR Code", count: 44, amount: 15840, percentage: 35, color: "#4ECDC4" },
    { method: "Khalti", count: 15, amount: 5400, percentage: 12, color: "#95E1D3" },
    { method: "eSewa", count: 10, amount: 3600, percentage: 8, color: "#F38181" },
  ]

  const handleDateRangeChange = (range: string) => {
    setDateRange(range)
    onDateRangeChange(range)
    console.log("Date range:", range)
  }

  const handleExport = () => {
    const tabNames = {
      overview: "Overview",
      product: "By Product",
      cashier: "By Cashier",
      payment: "By Payment Method",
    }
    onExport(tabNames[activeTab])
    console.log("Export:", tabNames[activeTab])
  }

  const maxSales = Math.max(...hourlyData.map((d) => d.sales))

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#208C8A] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#1F2121]">Sales Reports</h1>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#208C8A] text-white rounded-lg hover:bg-[#1a7270] transition-colors"
          >
            <Download className="w-4 h-4" />
            Export to Excel
          </button>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {dateRanges.map((range) => (
            <button
              key={range}
              onClick={() => handleDateRangeChange(range)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                dateRange === range ? "bg-[#208C8A] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[#208C8A] border-b-2 border-[#208C8A]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Total Sales</div>
                <div className="text-2xl font-bold text-[#1F2121]">Rs. {overviewData.totalSales.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                  <TrendingUp className="w-4 h-4" />
                  {overviewData.comparison.sales}% vs previous
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Total Items Sold</div>
                <div className="text-2xl font-bold text-[#1F2121]">{overviewData.itemsSold}</div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                  <TrendingUp className="w-4 h-4" />
                  {overviewData.comparison.items}% vs previous
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Total Transactions</div>
                <div className="text-2xl font-bold text-[#1F2121]">{overviewData.transactions}</div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                  <TrendingUp className="w-4 h-4" />
                  {overviewData.comparison.transactions}% vs previous
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Avg Transaction</div>
                <div className="text-2xl font-bold text-[#1F2121]">Rs. {overviewData.avgValue}</div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                  <TrendingUp className="w-4 h-4" />
                  {overviewData.comparison.avg}% vs previous
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Best Hour</div>
                <div className="text-2xl font-bold text-[#208C8A]">{overviewData.bestHour}</div>
                <div className="text-sm text-gray-500 mt-2">Peak sales time</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1F2121] mb-4">Sales by Hour</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {hourlyData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: "200px" }}>
                        <div
                          className="absolute bottom-0 w-full bg-gradient-to-t from-[#208C8A] to-[#4ECDC4] rounded-t-lg transition-all hover:opacity-80 group"
                          style={{ height: `${(item.sales / maxSales) * 100}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Rs. {item.sales.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">{item.hour}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1F2121] mb-4">Sales by Category</h3>
                <div className="flex items-center justify-center gap-8">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      {categoryData.reduce((acc, item, index) => {
                        const prevTotal = categoryData.slice(0, index).reduce((sum, i) => sum + i.value, 0)
                        const startAngle = (prevTotal / 100) * 360
                        const endAngle = ((prevTotal + item.value) / 100) * 360
                        const largeArc = item.value > 50 ? 1 : 0

                        const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                        const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                        const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                        const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

                        return [
                          ...acc,
                          <path
                            key={index}
                            d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                            fill={item.color}
                            className="hover:opacity-80 transition-opacity"
                          />,
                        ]
                      }, [] as JSX.Element[])}
                    </svg>
                  </div>
                  <div className="space-y-2">
                    {categoryData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                        <div className="text-sm text-gray-700">{item.name}</div>
                        <div className="text-sm font-semibold text-[#1F2121]">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* By Product Tab */}
        {activeTab === "product" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#208C8A]"
              >
                <option>All Categories</option>
                <option>Painkillers</option>
                <option>Vitamins</option>
                <option>Cough/Cold</option>
                <option>Antibiotics</option>
              </select>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Units Sold</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Revenue</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Margin</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Margin %</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productData.map((product) => (
                    <>
                      <tr key={product.rank} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="w-8 h-8 rounded-full bg-[#208C8A] text-white flex items-center justify-center text-sm font-bold">
                            {product.rank}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-[#1F2121]">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-right text-gray-700">{product.units}</td>
                        <td className="px-6 py-4 text-sm text-right font-semibold text-[#1F2121]">
                          Rs. {product.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-700">
                          Rs. {product.margin.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-green-600 font-medium">
                          {product.marginPct}%
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => setExpandedProduct(expandedProduct === product.rank ? null : product.rank)}
                            className="text-[#208C8A] hover:text-[#1a7270]"
                          >
                            {expandedProduct === product.rank ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedProduct === product.rank && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 bg-gray-50">
                            <div className="text-sm text-gray-700 font-medium mb-2">Daily Breakdown:</div>
                            <div className="grid grid-cols-7 gap-2">
                              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                                <div key={day} className="text-center">
                                  <div className="text-xs text-gray-500 mb-1">{day}</div>
                                  <div className="text-sm font-semibold text-[#1F2121]">
                                    {Math.floor(product.units / 7) + (index === 0 ? product.units % 7 : 0)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* By Cashier Tab */}
        {activeTab === "cashier" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cashier Name</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Transactions</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Sales</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Avg per Transaction
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Performance</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cashierData.map((cashier) => (
                  <>
                    <tr key={cashier.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setExpandedCashier(expandedCashier === cashier.name ? null : cashier.name)}
                          className="text-sm font-medium text-[#208C8A] hover:underline"
                        >
                          {cashier.name}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">{cashier.transactions}</td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-[#1F2121]">
                        Rs. {cashier.sales.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">Rs. {cashier.avgPerTransaction}</td>
                      <td className="px-6 py-4 text-center">
                        <div
                          className={`inline-flex items-center gap-1 text-sm ${cashier.change >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {cashier.change >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {Math.abs(cashier.change)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {cashier.status}
                        </span>
                      </td>
                    </tr>
                    {expandedCashier === cashier.name && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div className="text-sm text-gray-700 font-medium mb-2">Recent Transactions:</div>
                          <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-gray-600">Transaction #{1000 + i}</span>
                                <span className="font-medium">Rs. {(Math.random() * 500 + 100).toFixed(0)}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* By Payment Method Tab */}
        {activeTab === "payment" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#1F2121] mb-6">Payment Method Distribution</h3>
              <div className="flex items-center justify-center gap-8">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {paymentMethodData.reduce((acc, item, index) => {
                      const prevTotal = paymentMethodData.slice(0, index).reduce((sum, i) => sum + i.percentage, 0)
                      const startAngle = (prevTotal / 100) * 360
                      const endAngle = ((prevTotal + item.percentage) / 100) * 360
                      const largeArc = item.percentage > 50 ? 1 : 0

                      const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                      const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                      const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                      const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

                      return [
                        ...acc,
                        <path
                          key={index}
                          d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                          fill={item.color}
                          className="hover:opacity-80 transition-opacity"
                        />,
                      ]
                    }, [] as JSX.Element[])}
                  </svg>
                </div>
                <div className="space-y-2">
                  {paymentMethodData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                      <div className="text-sm text-gray-700">{item.method}</div>
                      <div className="text-sm font-semibold text-[#1F2121]">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Method</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Count</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">% of Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paymentMethodData.map((method, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: method.color }}></div>
                          <span className="text-sm font-medium text-[#1F2121]">{method.method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">{method.count}</td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-[#1F2121]">
                        Rs. {method.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-[#208C8A] font-medium">{method.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
