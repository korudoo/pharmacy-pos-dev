"use client"

import { useState } from "react"
import { Receipt, Search, ChevronLeft, ChevronRight } from "lucide-react"

interface Transaction {
  id: string
  time: string
  cashier: string
  itemsCount: number
  totalAmount: number
  paymentMethod: string
  status: "completed" | "pending" | "failed" | "refunded"
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN001",
    time: "11:45 AM",
    cashier: "John",
    itemsCount: 3,
    totalAmount: 1500,
    paymentMethod: "Cash",
    status: "completed",
  },
  {
    id: "TXN002",
    time: "11:23 AM",
    cashier: "Rani",
    itemsCount: 5,
    totalAmount: 2300,
    paymentMethod: "QR Code",
    status: "completed",
  },
  {
    id: "TXN003",
    time: "10:58 AM",
    cashier: "John",
    itemsCount: 2,
    totalAmount: 800,
    paymentMethod: "Cash",
    status: "completed",
  },
  {
    id: "TXN004",
    time: "10:32 AM",
    cashier: "Priya",
    itemsCount: 7,
    totalAmount: 3100,
    paymentMethod: "Khalti",
    status: "completed",
  },
  {
    id: "TXN005",
    time: "09:15 AM",
    cashier: "Ravi",
    itemsCount: 1,
    totalAmount: 200,
    paymentMethod: "Return",
    status: "refunded",
  },
  {
    id: "TXN006",
    time: "08:50 AM",
    cashier: "John",
    itemsCount: 4,
    totalAmount: 2100,
    paymentMethod: "eSewa",
    status: "completed",
  },
  {
    id: "TXN007",
    time: "08:30 AM",
    cashier: "Rani",
    itemsCount: 3,
    totalAmount: 1200,
    paymentMethod: "Cash",
    status: "completed",
  },
  {
    id: "TXN008",
    time: "08:05 AM",
    cashier: "Priya",
    itemsCount: 6,
    totalAmount: 2800,
    paymentMethod: "QR Code",
    status: "completed",
  },
]

interface RecentTransactionsProps {
  onViewReceipt?: (transactionId: string) => void
  onReprintReceipt?: (transactionId: string) => void
}

export default function RecentTransactions({ onViewReceipt, onReprintReceipt }: RecentTransactionsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<"time" | "amount" | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterByMethod, setFilterByMethod] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const itemsPerPage = 5

  // Filter transactions
  let filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.cashier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMethod = filterByMethod === "all" || transaction.paymentMethod === filterByMethod
    return matchesSearch && matchesMethod
  })

  // Sort transactions
  if (sortBy === "time") {
    filteredTransactions = [...filteredTransactions].sort((a, b) => {
      const timeA = a.time
      const timeB = b.time
      return sortOrder === "asc" ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA)
    })
  } else if (sortBy === "amount") {
    filteredTransactions = [...filteredTransactions].sort((a, b) => {
      return sortOrder === "asc" ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount
    })
  }

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  const handleSort = (column: "time" | "amount") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const handleRowClick = (transactionId: string) => {
    if (onViewReceipt) {
      onViewReceipt(transactionId)
    }
    console.log("View receipt:", transactionId)
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    const statusConfig = {
      completed: { bg: "bg-green-100", text: "text-green-700", icon: "✓", label: "Completed" },
      pending: { bg: "bg-orange-100", text: "text-orange-700", icon: "⏳", label: "Pending" },
      failed: { bg: "bg-red-100", text: "text-red-700", icon: "✗", label: "Failed" },
      refunded: { bg: "bg-blue-100", text: "text-blue-700", icon: "⟲", label: "Refunded" },
    }
    const config = statusConfig[status]
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </span>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-[#208C8A]" />
          <h2 className="text-lg font-semibold text-[#1F2121]">Recent Transactions</h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by cashier or transaction ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9 pr-4 py-2 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#208C8A]/20 focus:border-[#208C8A]"
          />
        </div>

        <select
          value={filterByMethod}
          onChange={(e) => {
            setFilterByMethod(e.target.value)
            setCurrentPage(1)
          }}
          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#208C8A]/20 focus:border-[#208C8A]"
        >
          <option value="all">All Methods</option>
          <option value="Cash">Cash</option>
          <option value="QR Code">QR Code</option>
          <option value="Khalti">Khalti</option>
          <option value="eSewa">eSewa</option>
          <option value="Return">Return</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th
                onClick={() => handleSort("time")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-1">
                  Time
                  {sortBy === "time" && <span className="text-[#208C8A]">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                </div>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cashier</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Items</th>
              <th
                onClick={() => handleSort("amount")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-1">
                  Total Amount
                  {sortBy === "amount" && <span className="text-[#208C8A]">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                </div>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Payment Method</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => handleRowClick(transaction.id)}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 text-sm text-gray-900">{transaction.time}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{transaction.cashier}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{transaction.itemsCount} items</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  Rs. {transaction.totalAmount.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{transaction.paymentMethod}</td>
                <td className="py-3 px-4">{getStatusBadge(transaction.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length}{" "}
          transactions
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
