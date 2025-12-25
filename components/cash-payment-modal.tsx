"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface CashPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  totalAmount: number
  onPaymentComplete: (payment: {
    method: string
    amount: number
    cashReceived: number
    change: number
  }) => void
}

export default function CashPaymentModal({ isOpen, onClose, totalAmount, onPaymentComplete }: CashPaymentModalProps) {
  const [cashReceived, setCashReceived] = useState<string>("")
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  const cashReceivedNum = Number.parseFloat(cashReceived.replace(/,/g, "")) || 0
  const change = cashReceivedNum - totalAmount
  const isValidPayment = cashReceivedNum >= totalAmount

  // Format number with commas
  const formatCurrency = (num: number) => {
    return num.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }

  // Handle quick amount buttons
  const handleQuickAmount = (amount: number) => {
    setCashReceived(amount.toString())
  }

  // Handle exact amount
  const handleExact = () => {
    setCashReceived(totalAmount.toString())
  }

  // Handle clear
  const handleClear = () => {
    setCashReceived("")
  }

  // Handle input change with formatting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "")
    if (/^\d*$/.test(value)) {
      setCashReceived(value)
    }
  }

  // Handle complete payment
  const handleCompletePayment = () => {
    setPaymentCompleted(true)
    setTimeout(() => {
      onPaymentComplete({
        method: "cash",
        amount: totalAmount,
        cashReceived: cashReceivedNum,
        change: change,
      })
      console.log("Cash payment complete")
      setPaymentCompleted(false)
      setCashReceived("")
      onClose()
    }, 1000)
  }

  // Handle back button
  const handleBack = () => {
    console.log("Close payment modal")
    setCashReceived("")
    onClose()
  }

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCashReceived("")
      setPaymentCompleted(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Cash Payment</h2>
          <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {paymentCompleted ? (
          /* Success Message */
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">Receipt is being printed...</p>
          </div>
        ) : (
          <>
            {/* Amount Due */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Amount Due</p>
              <p className="text-3xl font-bold text-gray-800">Rs. {formatCurrency(totalAmount)}</p>
            </div>

            {/* Cash Received Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cash Received</label>
              <input
                type="text"
                value={cashReceived ? formatCurrency(Number.parseFloat(cashReceived)) : ""}
                onChange={handleInputChange}
                placeholder="0"
                autoFocus
                className="w-full px-4 py-3 text-3xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 text-center"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              <button
                onClick={() => handleQuickAmount(1000)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Rs. 1000
              </button>
              <button
                onClick={() => handleQuickAmount(2000)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Rs. 2000
              </button>
              <button
                onClick={() => handleQuickAmount(5000)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Rs. 5000
              </button>
              <button
                onClick={handleExact}
                className="px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 font-semibold rounded-lg transition-colors"
              >
                Exact
              </button>
            </div>

            {/* Clear Button */}
            <button
              onClick={handleClear}
              className="w-full mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Clear
            </button>

            {/* Change Calculation */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Due:</span>
                <span className="font-semibold text-gray-800">Rs. {formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cash Received:</span>
                <span className="font-semibold text-gray-800">
                  Rs. {cashReceivedNum > 0 ? formatCurrency(cashReceivedNum) : "0"}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600">Change Due:</span>
                <span className={`font-bold text-lg ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  Rs. {formatCurrency(Math.abs(change))}
                </span>
              </div>
            </div>

            {/* Validation Error */}
            {cashReceivedNum > 0 && !isValidPayment && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium">Cash received is less than amount due</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleCompletePayment}
                disabled={!isValidPayment}
                className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-colors ${
                  isValidPayment
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                COMPLETE PAYMENT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
