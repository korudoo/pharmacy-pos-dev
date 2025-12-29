"use client"

import { useState, useEffect } from "react"
import { X, RefreshCw } from "lucide-react"

interface QRPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  totalAmount: number
  onPaymentComplete: (data: {
    method: string
    amount: number
    transactionId: string
  }) => void
}

export default function QRPaymentModal({ isOpen, onClose, totalAmount, onPaymentComplete }: QRPaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<"khalti" | "esewa" | "connectips">("khalti")
  const [paymentStatus, setPaymentStatus] = useState<"waiting" | "success" | "failed">("waiting")
  const [transactionId, setTransactionId] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [manualEntry, setManualEntry] = useState(false)
  const [manualTxnId, setManualTxnId] = useState("")
  const [savePreference, setSavePreference] = useState(false)

  // Simulate payment success after 3-5 seconds
  useEffect(() => {
    if (!isOpen || paymentStatus !== "waiting") return

    const randomDelay = Math.floor(Math.random() * 2000) + 3000 // 3-5 seconds
    const timer = setTimeout(() => {
      const txnId = `TXN-${Date.now()}`
      setTransactionId(txnId)
      setPaymentStatus("success")
      console.log("[v0] Payment confirmed:", txnId)
    }, randomDelay)

    return () => clearTimeout(timer)
  }, [isOpen, paymentStatus])

  // Countdown timer (5 minutes)
  useEffect(() => {
    if (!isOpen || paymentStatus !== "waiting") return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus("failed")
          console.log("[v0] Payment timeout")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, paymentStatus])

  // Auto-refresh QR every 30 seconds
  useEffect(() => {
    if (!isOpen || paymentStatus !== "waiting") return

    const interval = setInterval(() => {
      setRefreshing(true)
      console.log("[v0] QR code refreshed")
      setTimeout(() => setRefreshing(false), 500)
    }, 30000)

    return () => clearInterval(interval)
  }, [isOpen, paymentStatus])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPaymentStatus("waiting")
      setTransactionId("")
      setTimeLeft(300)
      setManualEntry(false)
      setManualTxnId("")
    }
  }, [isOpen])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleComplete = () => {
    onPaymentComplete({
      method: selectedMethod,
      amount: totalAmount,
      transactionId,
    })
    console.log("[v0] Payment completed:", { selectedMethod, totalAmount, transactionId })
    if (savePreference) {
      console.log("[v0] Saving payment preference:", selectedMethod)
    }
  }

  const handleManualSubmit = () => {
    if (manualTxnId.trim()) {
      setTransactionId(manualTxnId)
      setPaymentStatus("success")
      console.log("[v0] Manual transaction ID entered:", manualTxnId)
      setManualEntry(false)
    }
  }

  const handleBack = () => {
    onClose()
    console.log("[v0] Close QR modal")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">QR Code Payment</h2>
          <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount Due */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-1">Amount Due</p>
            <p className="text-3xl font-bold text-[#208C8A]">Rs. {totalAmount.toLocaleString()}</p>
          </div>

          {/* Payment Method Selection */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Select Payment Method</p>
            <div className="space-y-2">
              {[
                { value: "khalti" as const, label: "Khalti", color: "#5C2D91" },
                { value: "esewa" as const, label: "eSewa", color: "#60BB46" },
                { value: "connectips" as const, label: "ConnectIPS", color: "#0066CC" },
              ].map((method) => (
                <label
                  key={method.value}
                  className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                  style={{
                    borderColor: selectedMethod === method.value ? method.color : "#e5e7eb",
                    backgroundColor: selectedMethod === method.value ? `${method.color}08` : "white",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={selectedMethod === method.value}
                    onChange={(e) => setSelectedMethod(e.target.value as any)}
                    className="w-5 h-5"
                    disabled={paymentStatus !== "waiting"}
                  />
                  <span className="font-medium text-gray-900">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* QR Code Display */}
          {!manualEntry && (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div
                className={`inline-block bg-white p-4 rounded-lg shadow-sm transition-opacity ${
                  refreshing ? "opacity-50" : "opacity-100"
                }`}
              >
                {/* QR Code Placeholder */}
                <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                  <rect width="200" height="200" fill="white" />
                  {/* Generate a simple QR-like pattern based on selected method */}
                  {Array.from({ length: 10 }).map((_, i) =>
                    Array.from({ length: 10 }).map((_, j) => {
                      const seed = selectedMethod.charCodeAt(0) + i * 10 + j
                      return (
                        <rect
                          key={`${i}-${j}`}
                          x={j * 20}
                          y={i * 20}
                          width="20"
                          height="20"
                          fill={seed % 2 === 0 ? "black" : "white"}
                        />
                      )
                    }),
                  )}
                </svg>
                {refreshing && (
                  <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Refreshing...</span>
                  </div>
                )}
              </div>
              <p className="text-gray-700 font-medium mt-4">
                Scan with {selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)} to pay Rs.{" "}
                {totalAmount.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm mt-2">Customer scans this QR code with their phone wallet</p>
            </div>
          )}

          {/* Manual Entry */}
          {manualEntry && (
            <div className="space-y-3">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Transaction ID</span>
                <input
                  type="text"
                  value={manualTxnId}
                  onChange={(e) => setManualTxnId(e.target.value)}
                  placeholder="Enter transaction ID"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#208C8A]"
                />
              </label>
              <button
                onClick={handleManualSubmit}
                className="w-full bg-[#208C8A] text-white py-3 rounded-lg font-medium hover:bg-[#1a7170] transition-colors"
              >
                Submit Transaction ID
              </button>
              <button
                onClick={() => setManualEntry(false)}
                className="w-full text-gray-600 text-sm hover:text-gray-900"
              >
                Back to QR Code
              </button>
            </div>
          )}

          {/* Status Indicator */}
          <div
            className={`p-4 rounded-lg text-center font-medium ${
              paymentStatus === "waiting"
                ? "bg-gray-100 text-gray-700"
                : paymentStatus === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {paymentStatus === "waiting" && (
              <>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">⏳</span>
                  <span>Waiting for payment...</span>
                </div>
                <p className="text-sm mt-2">Time remaining: {formatTime(timeLeft)}</p>
              </>
            )}
            {paymentStatus === "success" && (
              <>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">✓</span>
                  <span>Payment Received!</span>
                </div>
                <p className="text-sm mt-2">Transaction ID: {transactionId}</p>
              </>
            )}
            {paymentStatus === "failed" && (
              <>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">✗</span>
                  <span>{timeLeft === 0 ? "QR code expired, go back and try again" : "Payment Failed"}</span>
                </div>
                {timeLeft > 0 && (
                  <button
                    onClick={() => {
                      setPaymentStatus("waiting")
                      setTimeLeft(300)
                    }}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Retry Payment
                  </button>
                )}
              </>
            )}
          </div>

          {/* Save Preference */}
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={savePreference}
              onChange={(e) => setSavePreference(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Save payment preference for next transaction</span>
          </label>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={handleBack}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            ← Back
          </button>
          {paymentStatus === "waiting" && !manualEntry && (
            <button
              onClick={() => setManualEntry(true)}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Manual Entry
            </button>
          )}
          {paymentStatus === "success" && (
            <button
              onClick={handleComplete}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              COMPLETE
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
