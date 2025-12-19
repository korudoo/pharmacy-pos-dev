"use client"

import { useState } from "react"
import { Truck, Eye, Edit2, ShoppingCart, ToggleRight, X, Plus, Search, ChevronDown, ChevronUp } from "lucide-react"

interface Vendor {
  id: number
  name: string
  contactPerson: string
  phone: string
  email: string
  productCategories: string[]
  lastOrderDate: string
  totalOrders: number
  status: "Active" | "Inactive"
  address?: string
  gstTaxId?: string
  paymentTerms?: string
  accountBalance?: number
  creditLimit?: number
  recentOrders?: Array<{
    id: string
    date: string
    amount: number
    items: number
  }>
}

const mockVendors: Vendor[] = [
  {
    id: 1,
    name: "Supplier A",
    contactPerson: "John Sharma",
    phone: "9841234567",
    email: "john@supplier-a.com",
    productCategories: ["Painkillers", "Vitamins"],
    lastOrderDate: "Dec 28, 2024",
    totalOrders: 45,
    status: "Active",
    address: "123 Medical Street, Kathmandu",
    gstTaxId: "GST123456789",
    paymentTerms: "Net 30",
    accountBalance: 15000,
    creditLimit: 50000,
    recentOrders: [
      { id: "PO-001", date: "Dec 28, 2024", amount: 12500, items: 15 },
      { id: "PO-002", date: "Dec 25, 2024", amount: 8900, items: 10 },
      { id: "PO-003", date: "Dec 20, 2024", amount: 15600, items: 20 },
      { id: "PO-004", date: "Dec 15, 2024", amount: 9800, items: 12 },
      { id: "PO-005", date: "Dec 10, 2024", amount: 11200, items: 14 },
    ],
  },
  {
    id: 2,
    name: "Supplier B",
    contactPerson: "Rani Paudel",
    phone: "9851234567",
    email: "rani@supplier-b.com",
    productCategories: ["Antibiotics", "Cough/Cold"],
    lastOrderDate: "Dec 27, 2024",
    totalOrders: 32,
    status: "Active",
    address: "456 Pharma Avenue, Lalitpur",
    gstTaxId: "GST987654321",
    paymentTerms: "Net 45",
    accountBalance: 8500,
    creditLimit: 40000,
    recentOrders: [
      { id: "PO-101", date: "Dec 27, 2024", amount: 9500, items: 12 },
      { id: "PO-102", date: "Dec 22, 2024", amount: 11300, items: 15 },
      { id: "PO-103", date: "Dec 18, 2024", amount: 7800, items: 9 },
      { id: "PO-104", date: "Dec 12, 2024", amount: 13200, items: 18 },
      { id: "PO-105", date: "Dec 8, 2024", amount: 10500, items: 13 },
    ],
  },
  {
    id: 3,
    name: "Supplier C",
    contactPerson: "Priya Singh",
    phone: "9861234567",
    email: "priya@supplier-c.com",
    productCategories: ["Vitamins", "Oral Care"],
    lastOrderDate: "Dec 20, 2024",
    totalOrders: 28,
    status: "Active",
    address: "789 Health Plaza, Bhaktapur",
    gstTaxId: "GST456789123",
    paymentTerms: "Net 30",
    accountBalance: 5200,
    creditLimit: 35000,
    recentOrders: [
      { id: "PO-201", date: "Dec 20, 2024", amount: 6800, items: 8 },
      { id: "PO-202", date: "Dec 14, 2024", amount: 9200, items: 11 },
      { id: "PO-203", date: "Dec 9, 2024", amount: 7500, items: 9 },
      { id: "PO-204", date: "Dec 3, 2024", amount: 8900, items: 10 },
      { id: "PO-205", date: "Nov 28, 2024", amount: 10100, items: 12 },
    ],
  },
  {
    id: 4,
    name: "Supplier D",
    contactPerson: "Ravi Thapa",
    phone: "9871234567",
    email: "ravi@supplier-d.com",
    productCategories: ["ENT", "Other"],
    lastOrderDate: "Dec 15, 2024",
    totalOrders: 15,
    status: "Inactive",
    address: "321 Medical Complex, Pokhara",
    gstTaxId: "GST789123456",
    paymentTerms: "Net 60",
    accountBalance: 0,
    creditLimit: 25000,
    recentOrders: [
      { id: "PO-301", date: "Dec 15, 2024", amount: 4500, items: 5 },
      { id: "PO-302", date: "Dec 5, 2024", amount: 5800, items: 6 },
      { id: "PO-303", date: "Nov 25, 2024", amount: 3200, items: 4 },
      { id: "PO-304", date: "Nov 15, 2024", amount: 6100, items: 7 },
      { id: "PO-305", date: "Nov 5, 2024", amount: 4800, items: 5 },
    ],
  },
]

interface VendorManagementProps {
  onAddVendor?: () => void
  onEditVendor?: (vendorId: number) => void
  onViewDetails?: (vendorId: number) => void
  onCreateOrder?: (vendorId: number) => void
}

export default function VendorManagement({
  onAddVendor,
  onEditVendor,
  onViewDetails,
  onCreateOrder,
}: VendorManagementProps) {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"All" | "Active" | "Inactive">("All")
  const [sortBy, setSortBy] = useState<"lastOrderDate" | "totalOrders" | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [selectedVendorDetails, setSelectedVendorDetails] = useState<Vendor | null>(null)

  const itemsPerPage = 10

  // Filter and search
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "All" || vendor.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Sort
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (!sortBy) return 0

    if (sortBy === "lastOrderDate") {
      const dateA = new Date(a.lastOrderDate).getTime()
      const dateB = new Date(b.lastOrderDate).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    }

    if (sortBy === "totalOrders") {
      return sortOrder === "asc" ? a.totalOrders - b.totalOrders : b.totalOrders - a.totalOrders
    }

    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedVendors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVendors = sortedVendors.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (column: "lastOrderDate" | "totalOrders") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const handleToggleStatus = (vendorId: number) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === vendorId ? { ...vendor, status: vendor.status === "Active" ? "Inactive" : "Active" } : vendor,
      ),
    )
    console.log("Toggle status for vendor:", vendorId)
  }

  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendorDetails(vendor)
    setViewDetailsOpen(true)
    onViewDetails?.(vendor.id)
    console.log("View details for vendor:", vendor.id)
  }

  const handleSelectRow = (vendorId: number) => {
    setSelectedRows((prev) => (prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]))
  }

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedVendors.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedVendors.map((v) => v.id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-teal-600" />
            <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
          </div>
          <button
            onClick={() => {
              onAddVendor?.()
              console.log("Add vendor")
            }}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by vendor name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "All" | "Active" | "Inactive")}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg">
                <span className="text-sm text-teal-700 font-medium">{selectedRows.length} selected</span>
                <button className="text-sm text-teal-600 hover:text-teal-700 underline">Bulk Actions</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={paginatedVendors.length > 0 && selectedRows.length === paginatedVendors.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Contact Person
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Product Categories
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("lastOrderDate")}
                  >
                    <div className="flex items-center gap-1">
                      Last Order Date
                      {sortBy === "lastOrderDate" &&
                        (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("totalOrders")}
                  >
                    <div className="flex items-center gap-1">
                      Total Orders
                      {sortBy === "totalOrders" &&
                        (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(vendor.id)}
                        onChange={() => handleSelectRow(vendor.id)}
                        className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{vendor.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vendor.contactPerson}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vendor.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vendor.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vendor.productCategories.join(", ")}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vendor.lastOrderDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vendor.totalOrders}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          vendor.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {vendor.status === "Active" ? "✓" : "✗"} {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(vendor)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onEditVendor?.(vendor.id)
                            console.log("Edit vendor:", vendor.id)
                          }}
                          className="p-1.5 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onCreateOrder?.(vendor.id)
                            console.log("Create order for:", vendor.id)
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Create Order"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(vendor.id)}
                          className={`p-1.5 rounded transition-colors ${
                            vendor.status === "Active"
                              ? "text-red-600 hover:bg-red-50"
                              : "text-green-600 hover:bg-green-50"
                          }`}
                          title={vendor.status === "Active" ? "Deactivate" : "Activate"}
                        >
                          <ToggleRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedVendors.length)} of{" "}
                {sortedVendors.length} vendors
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === page
                        ? "bg-teal-600 text-white border-teal-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      {viewDetailsOpen && selectedVendorDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Vendor Details</h2>
              <button
                onClick={() => setViewDetailsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Vendor Name</label>
                    <p className="text-base font-medium text-gray-900">{selectedVendorDetails.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Contact Person</label>
                    <p className="text-base font-medium text-gray-900">{selectedVendorDetails.contactPerson}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="text-base font-medium text-gray-900">{selectedVendorDetails.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="text-base font-medium text-gray-900">{selectedVendorDetails.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Address</label>
                    <p className="text-base font-medium text-gray-900">{selectedVendorDetails.address}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">GST/Tax ID</label>
                    <p className="text-base font-medium text-gray-900">{selectedVendorDetails.gstTaxId}</p>
                  </div>
                </div>
              </div>

              {/* Products & Terms */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Products & Terms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Products Supplied</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedVendorDetails.productCategories.map((category, idx) => (
                        <span key={idx} className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Payment Terms</label>
                    <p className="text-base font-medium text-gray-900">{selectedVendorDetails.paymentTerms}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Account Balance</label>
                    <p className="text-base font-medium text-gray-900">
                      NPR {selectedVendorDetails.accountBalance?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Credit Limit</label>
                    <p className="text-base font-medium text-gray-900">
                      NPR {selectedVendorDetails.creditLimit?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Orders (Last 5)</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Order ID</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Amount</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Items</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedVendorDetails.recentOrders?.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm text-gray-900">{order.id}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{order.date}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">NPR {order.amount.toLocaleString()}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{order.items}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setViewDetailsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onEditVendor?.(selectedVendorDetails.id)
                  console.log("Edit vendor:", selectedVendorDetails.id)
                  setViewDetailsOpen(false)
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Edit Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
