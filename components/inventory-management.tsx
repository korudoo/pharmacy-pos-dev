"use client"

import { useState } from "react"
import { Search, Edit2, Trash2, ShoppingCart, Plus, ChevronUp, ChevronDown } from "lucide-react"

interface Product {
  id: number
  sku: string
  name: string
  category: string
  quantity: number
  unit: string
  reorderLevel: number
  price: number
  expiryDate: string
  status: "In Stock" | "Low Stock" | "Critical" | "Expired"
}

const mockProducts: Product[] = [
  {
    id: 1,
    sku: "PARA-001",
    name: "Paracetamol 500mg",
    category: "Painkillers",
    quantity: 45,
    unit: "strips",
    reorderLevel: 20,
    price: 50,
    expiryDate: "Jan 15, 2025",
    status: "In Stock",
  },
  {
    id: 2,
    sku: "VITE-001",
    name: "Vitamin C 500mg",
    category: "Vitamins",
    quantity: 15,
    unit: "bottles",
    reorderLevel: 25,
    price: 80,
    expiryDate: "Feb 10, 2025",
    status: "Low Stock",
  },
  {
    id: 3,
    sku: "COUGH-001",
    name: "Cough Syrup 100ml",
    category: "Cough/Cold",
    quantity: 8,
    unit: "bottles",
    reorderLevel: 15,
    price: 120,
    expiryDate: "Jan 12, 2025",
    status: "Critical",
  },
  {
    id: 4,
    sku: "MULTI-001",
    name: "Multivitamin Caps",
    category: "Vitamins",
    quantity: 32,
    unit: "bottles",
    reorderLevel: 20,
    price: 250,
    expiryDate: "Mar 5, 2025",
    status: "In Stock",
  },
  {
    id: 5,
    sku: "ASPI-001",
    name: "Aspirin 75mg",
    category: "Painkillers",
    quantity: 18,
    unit: "strips",
    reorderLevel: 10,
    price: 35,
    expiryDate: "Feb 20, 2025",
    status: "In Stock",
  },
  {
    id: 6,
    sku: "ANTI-001",
    name: "Antibiotics 500mg",
    category: "Antibiotics",
    quantity: 5,
    unit: "strips",
    reorderLevel: 30,
    price: 150,
    expiryDate: "Dec 31, 2024",
    status: "Critical",
  },
  {
    id: 7,
    sku: "IRON-001",
    name: "Iron Supplements",
    category: "Vitamins",
    quantity: 22,
    unit: "bottles",
    reorderLevel: 15,
    price: 120,
    expiryDate: "Feb 28, 2025",
    status: "In Stock",
  },
  {
    id: 8,
    sku: "MINT-001",
    name: "Mint Mouth Wash",
    category: "Oral Care",
    quantity: 12,
    unit: "bottles",
    reorderLevel: 10,
    price: 200,
    expiryDate: "Mar 15, 2025",
    status: "In Stock",
  },
  {
    id: 9,
    sku: "SALT-001",
    name: "Saline Nasal Spray",
    category: "ENT",
    quantity: 6,
    unit: "bottles",
    reorderLevel: 8,
    price: 180,
    expiryDate: "Jan 20, 2025",
    status: "Low Stock",
  },
  {
    id: 10,
    sku: "CALC-001",
    name: "Calcium Tablets",
    category: "Vitamins",
    quantity: 28,
    unit: "bottles",
    reorderLevel: 20,
    price: 120,
    expiryDate: "Apr 10, 2025",
    status: "In Stock",
  },
]

interface InventoryManagementProps {
  onAddProduct: () => void
  onEditProduct: (productId: number) => void
  onDeleteProduct: (productId: number) => void
  onReorder: (productId: number) => void
}

export default function InventoryManagement({
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onReorder,
}: InventoryManagementProps) {
  const [products] = useState<Product[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortColumn, setSortColumn] = useState<keyof Product | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  const itemsPerPage = 10

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]
  const statuses = ["All", "In Stock", "Low Stock", "Critical", "Expired"]

  // Filter and search
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = filterCategory === "All" || product.category === filterCategory
    const matchesStatus = filterStatus === "All" || product.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortColumn) return 0

    const aVal = a[sortColumn]
    const bVal = b[sortColumn]

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Paginate
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (column: keyof Product) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedProducts.map((p) => p.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    }
  }

  const handleDelete = (id: number) => {
    setDeleteConfirm(null)
    onDeleteProduct(id)
    console.log("Delete:", id)
  }

  const handleBulkDelete = () => {
    if (selectedRows.length > 0 && confirm(`Delete ${selectedRows.length} selected items?`)) {
      selectedRows.forEach((id) => onDeleteProduct(id))
      console.log("Bulk delete:", selectedRows)
      setSelectedRows([])
    }
  }

  const handleBulkReorder = () => {
    if (selectedRows.length > 0) {
      selectedRows.forEach((id) => onReorder(id))
      console.log("Bulk reorder:", selectedRows)
      setSelectedRows([])
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Low Stock":
        return "bg-yellow-50"
      case "Critical":
        return "bg-red-50"
      case "Expired":
        return "bg-gray-100"
      default:
        return ""
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <span className="text-green-600">In Stock</span>
      case "Low Stock":
        return <span className="text-yellow-600">Low Stock ⚠️</span>
      case "Critical":
        return <span className="text-red-600">Critical 🔴</span>
      case "Expired":
        return <span className="text-gray-600">Expired</span>
      default:
        return status
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button
          onClick={() => {
            onAddProduct()
            console.log("Add product")
          }}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by SKU or Product Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status === "All" ? "All Status" : status}
            </option>
          ))}
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-4 bg-teal-50 p-4 rounded-lg">
          <span className="text-sm text-gray-700">{selectedRows.length} items selected</span>
          <button
            onClick={handleBulkReorder}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Bulk Reorder
          </button>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Bulk Delete
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={paginatedProducts.length > 0 && selectedRows.length === paginatedProducts.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                  />
                </th>
                <th
                  onClick={() => handleSort("sku")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    SKU
                    {sortColumn === "sku" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      ))}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Product Name
                    {sortColumn === "name" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th
                  onClick={() => handleSort("quantity")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Quantity
                    {sortColumn === "quantity" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Reorder Level
                </th>
                <th
                  onClick={() => handleSort("price")}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    Price
                    {sortColumn === "price" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`group hover:bg-gray-50 transition-colors ${getStatusBgColor(product.status)}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(product.id)}
                      onChange={(e) => handleSelectRow(product.id, e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.sku}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{product.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.unit}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.reorderLevel}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">Rs. {product.price}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.expiryDate}</td>
                  <td className="px-4 py-3 text-sm font-medium">{getStatusBadge(product.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          onEditProduct(product.id)
                          console.log("Edit:", product.id)
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onReorder(product.id)
                          console.log("Reorder:", product.id)
                        }}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Quick Reorder"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Delete Confirmation Dialog */}
                    {deleteConfirm === product.id && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md shadow-xl">
                          <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
                          <p className="text-gray-600 mb-4">
                            Are you sure you want to delete {product.name}? This action cannot be undone.
                          </p>
                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedProducts.length)} of{" "}
          {sortedProducts.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 rounded text-sm ${
                currentPage === page ? "bg-teal-600 text-white" : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
