"use client"

import { useState, useMemo } from "react"
import { AlertCircle, Package, DollarSign, AlertTriangle, X, ChevronDown } from "lucide-react"

interface LowStockItem {
  id: number
  name: string
  category: string
  current: number
  reorderLevel: number
  supplier: string
  supplierContact: string
  lastOrdered: string
  costPerUnit: number
  status: "low" | "critical"
  image?: string
}

interface LowStockAlertsProps {
  onQuickReorder?: (productId: number, quantity: number, supplier: string) => void
  onCreatePO?: (productId: number) => void
  onViewDetails?: (productId: number) => void
}

export default function LowStockAlerts({
  onQuickReorder = (id, qty, sup) => console.log("Quick reorder:", id, qty, sup),
  onCreatePO = (id) => console.log("Create PO:", id),
  onViewDetails = (id) => console.log("View details:", id),
}: LowStockAlertsProps) {
  const mockLowStockItems: LowStockItem[] = [
    {
      id: 1,
      name: "Vitamin C 500mg",
      category: "Vitamins",
      current: 15,
      reorderLevel: 50,
      supplier: "HealthSupply Co.",
      supplierContact: "+1-555-0101",
      lastOrdered: "Dec 20, 2024",
      costPerUnit: 8.5,
      status: "low",
    },
    {
      id: 2,
      name: "Cough Syrup",
      category: "OTC Medications",
      current: 3,
      reorderLevel: 30,
      supplier: "MedPharm Distributors",
      supplierContact: "+1-555-0102",
      lastOrdered: "Dec 15, 2024",
      costPerUnit: 12.0,
      status: "critical",
    },
    {
      id: 3,
      name: "Saline Nasal Spray",
      category: "OTC Medications",
      current: 6,
      reorderLevel: 20,
      supplier: "WellCare Supplies",
      supplierContact: "+1-555-0103",
      lastOrdered: "Dec 18, 2024",
      costPerUnit: 5.75,
      status: "low",
    },
    {
      id: 4,
      name: "Paracetamol 500mg",
      category: "Prescription",
      current: 0,
      reorderLevel: 100,
      supplier: "PharmaSource Ltd.",
      supplierContact: "+1-555-0104",
      lastOrdered: "Dec 10, 2024",
      costPerUnit: 3.2,
      status: "critical",
    },
    {
      id: 5,
      name: "Ibuprofen 200mg",
      category: "Prescription",
      current: 25,
      reorderLevel: 80,
      supplier: "MedPharm Distributors",
      supplierContact: "+1-555-0102",
      lastOrdered: "Dec 22, 2024",
      costPerUnit: 4.5,
      status: "low",
    },
    {
      id: 6,
      name: "Antibiotic Cream",
      category: "First Aid",
      current: 2,
      reorderLevel: 15,
      supplier: "HealthSupply Co.",
      supplierContact: "+1-555-0101",
      lastOrdered: "Dec 12, 2024",
      costPerUnit: 9.25,
      status: "critical",
    },
    {
      id: 7,
      name: "Vitamin D3 1000IU",
      category: "Vitamins",
      current: 18,
      reorderLevel: 40,
      supplier: "WellCare Supplies",
      supplierContact: "+1-555-0103",
      lastOrdered: "Dec 19, 2024",
      costPerUnit: 10.0,
      status: "low",
    },
    {
      id: 8,
      name: "Hand Sanitizer 500ml",
      category: "Personal Care",
      current: 1,
      reorderLevel: 25,
      supplier: "CleanCare Products",
      supplierContact: "+1-555-0105",
      lastOrdered: "Dec 14, 2024",
      costPerUnit: 6.5,
      status: "critical",
    },
    {
      id: 9,
      name: "Bandages Assorted",
      category: "First Aid",
      current: 10,
      reorderLevel: 35,
      supplier: "MedSupply Central",
      supplierContact: "+1-555-0106",
      lastOrdered: "Dec 21, 2024",
      costPerUnit: 7.8,
      status: "low",
    },
    {
      id: 10,
      name: "Thermometer Digital",
      category: "Medical Devices",
      current: 4,
      reorderLevel: 12,
      supplier: "TechMed Solutions",
      supplierContact: "+1-555-0107",
      lastOrdered: "Dec 16, 2024",
      costPerUnit: 15.0,
      status: "low",
    },
  ]

  const [lowStockItems] = useState<LowStockItem[]>(mockLowStockItems)
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("status")
  const [showReorderModal, setShowReorderModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<LowStockItem | null>(null)
  const [reorderQuantity, setReorderQuantity] = useState(0)
  const [reorderNotes, setReorderNotes] = useState("")

  const categories = useMemo(() => {
    const cats = new Set(lowStockItems.map((item) => item.category))
    return ["all", ...Array.from(cats)]
  }, [lowStockItems])

  const filteredAndSortedItems = useMemo(() => {
    let items =
      filterCategory === "all" ? lowStockItems : lowStockItems.filter((item) => item.category === filterCategory)

    if (sortBy === "status") {
      items = [...items].sort((a, b) => {
        if (a.status === "critical" && b.status !== "critical") return -1
        if (a.status !== "critical" && b.status === "critical") return 1
        return 0
      })
    } else if (sortBy === "gap") {
      items = [...items].sort((a, b) => {
        const gapA = a.reorderLevel - a.current
        const gapB = b.reorderLevel - b.current
        return gapB - gapA
      })
    } else if (sortBy === "name") {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    }

    return items
  }, [lowStockItems, filterCategory, sortBy])

  const summary = useMemo(() => {
    const totalItems = filteredAndSortedItems.length
    const criticalCount = filteredAndSortedItems.filter(
      (item) => item.status === "critical" || item.current === 0,
    ).length
    const totalEstimatedValue = filteredAndSortedItems.reduce((sum, item) => {
      const gap = item.reorderLevel - item.current
      return sum + gap * item.costPerUnit
    }, 0)

    return { totalItems, criticalCount, totalEstimatedValue }
  }, [filteredAndSortedItems])

  const handleQuickReorder = (item: LowStockItem) => {
    setSelectedItem(item)
    setReorderQuantity(item.reorderLevel - item.current)
    setReorderNotes("")
    setShowReorderModal(true)
  }

  const handleConfirmReorder = () => {
    if (selectedItem) {
      onQuickReorder(selectedItem.id, reorderQuantity, selectedItem.supplier)
      setShowReorderModal(false)
      setSelectedItem(null)
    }
  }

  const estimatedCost = selectedItem ? reorderQuantity * selectedItem.costPerUnit : 0

  if (filteredAndSortedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Low Stock Alerts</h1>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">All Stocked Up!</h2>
            <p className="text-gray-600">No items are currently below their reorder level.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Low Stock Alerts</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalItems}</p>
              </div>
              <Package className="w-10 h-10 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Critical Items</p>
                <p className="text-2xl font-bold text-gray-900">{summary.criticalCount}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Est. Order Value</p>
                <p className="text-2xl font-bold text-gray-900">${summary.totalEstimatedValue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-10 h-10 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="status">Status (Critical First)</option>
                  <option value="gap">Gap (Highest First)</option>
                  <option value="name">Name (A-Z)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedItems.map((item) => {
            const gap = item.reorderLevel - item.current
            return (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === "critical" || item.current === 0
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.current === 0 ? "OUT OF STOCK" : item.status === "critical" ? "CRITICAL" : "LOW"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-3">{item.category}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Stock:</span>
                      <span className={`font-semibold ${item.current === 0 ? "text-red-600" : "text-gray-900"}`}>
                        {item.current}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reorder Level:</span>
                      <span className="font-semibold text-gray-900">{item.reorderLevel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gap (Need to Order):</span>
                      <span className="font-semibold text-orange-600">{gap}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        Supplier: <span className="font-medium text-gray-900">{item.supplier}</span>
                      </p>
                      <p className="text-xs text-gray-500">{item.supplierContact}</p>
                      <p className="text-xs text-gray-500 mt-1">Last ordered: {item.lastOrdered}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleQuickReorder(item)}
                      className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm"
                    >
                      Quick Reorder
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onCreatePO(item.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                      >
                        Create PO
                      </button>
                      <button
                        onClick={() => onViewDetails(item.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Reorder Modal */}
        {showReorderModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Quick Reorder</h2>
                <button onClick={() => setShowReorderModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Product</p>
                  <p className="font-semibold text-gray-900">{selectedItem.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Supplier</p>
                  <p className="font-medium text-gray-900">{selectedItem.supplier}</p>
                  <p className="text-xs text-gray-500">{selectedItem.supplierContact}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity to Order</label>
                  <input
                    type="number"
                    value={reorderQuantity}
                    onChange={(e) => setReorderQuantity(Number.parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    min="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Suggested: {selectedItem.reorderLevel - selectedItem.current} units to reach reorder level
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Cost Per Unit</p>
                  <p className="font-semibold text-gray-900">${selectedItem.costPerUnit.toFixed(2)}</p>
                </div>

                <div className="bg-teal-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Estimated Total Cost</p>
                  <p className="text-2xl font-bold text-teal-700">${estimatedCost.toFixed(2)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea
                    value={reorderNotes}
                    onChange={(e) => setReorderNotes(e.target.value)}
                    placeholder="Delivery date, special instructions..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowReorderModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReorder}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
