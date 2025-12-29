"use client"

import type React from "react"

import { useState } from "react"
import { X, Printer, Save, Mail, MessageSquare } from "lucide-react"

interface ReceiptItem {
  name: string
  quantity: number
  price: number
  total: number
}

interface Receipt {
  date: string
  time: string
  cashier: string
  transactionId: string
  items: ReceiptItem[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  amountGiven: number
  change: number
}

interface ReceiptPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  receipt: Receipt
}

export default function ReceiptPreviewModal({ isOpen, onClose, receipt }: ReceiptPreviewModalProps) {
  const [showEmail, setShowEmail] = useState(false)
  const [showSMS, setShowSMS] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [saveEmailPref, setSaveEmailPref] = useState(false)
  const [saveSmsPref, setSaveSmsPref] = useState(false)

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
    console.log("Print receipt")
  }

  const handleSave = () => {
    console.log("Save receipt as PDF")
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email receipt to:", email)
    if (saveEmailPref) {
      console.log("Save email preference:", email)
    }
    setShowEmail(false)
    setEmail("")
  }

  const handleSMSSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("SMS receipt to:", phone)
    if (saveSmsPref) {
      console.log("Save SMS preference:", phone)
    }
    setShowSMS(false)
    setPhone("")
  }

  const handleClose = () => {
    console.log("Close receipt")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Receipt Preview</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Receipt Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <div
            id="receipt-content"
            className="bg-white border-2 border-gray-800 p-4 font-mono text-sm max-w-[280px] mx-auto"
          >
            {/* Header */}
            <div className="text-center border-b-2 border-dashed border-gray-800 pb-2 mb-2">
              <div className="font-bold text-base">AUSADHI PHARMACY</div>
              <div className="text-xs">Receipt</div>
            </div>

            {/* Transaction Info */}
            <div className="text-xs border-b-2 border-dashed border-gray-800 pb-2 mb-2">
              <div>Date: {receipt.date}</div>
              <div>Time: {receipt.time}</div>
              <div>Cashier: {receipt.cashier}</div>
              <div>Tx ID: {receipt.transactionId}</div>
            </div>

            {/* Items */}
            <div className="border-b-2 border-dashed border-gray-800 pb-2 mb-2">
              <div className="font-bold mb-1">ITEMS:</div>
              {receipt.items.map((item, index) => (
                <div key={index} className="mb-2">
                  <div>{item.name}</div>
                  <div className="pl-2">
                    {item.quantity} × Rs. {item.price} = Rs. {item.total}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-b-2 border-dashed border-gray-800 pb-2 mb-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {receipt.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (13%):</span>
                <span>Rs. {receipt.tax}</span>
              </div>
              <div className="flex justify-between font-bold text-base mt-1">
                <span>TOTAL:</span>
                <span>Rs. {receipt.total}</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="border-b-2 border-dashed border-gray-800 pb-2 mb-2">
              <div>Paid By: {receipt.paymentMethod}</div>
              <div>Amount Given: Rs. {receipt.amountGiven}</div>
              <div>Change: Rs. {receipt.change}</div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs">
              <div>Thank you for shopping</div>
              <div>Please visit again!</div>
              <div className="mt-2 text-[10px]">Powered by Ausadhi POS</div>
            </div>
          </div>
        </div>

        {/* Email Input */}
        {showEmail && (
          <div className="px-4 py-3 bg-blue-50 border-t">
            <form onSubmit={handleEmailSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
              />
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="saveEmail"
                  checked={saveEmailPref}
                  onChange={(e) => setSaveEmailPref(e.target.checked)}
                  className="w-4 h-4 text-teal-600 mr-2"
                />
                <label htmlFor="saveEmail" className="text-xs text-gray-600">
                  Save customer preference
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Send Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmail(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SMS Input */}
        {showSMS && (
          <div className="px-4 py-3 bg-green-50 border-t">
            <form onSubmit={handleSMSSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+977-9800000000"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
              />
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="saveSMS"
                  checked={saveSmsPref}
                  onChange={(e) => setSaveSmsPref(e.target.checked)}
                  className="w-4 h-4 text-teal-600 mr-2"
                />
                <label htmlFor="saveSMS" className="text-xs text-gray-600">
                  Save customer preference
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Send SMS
                </button>
                <button
                  type="button"
                  onClick={() => setShowSMS(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 border-t bg-gray-50 grid grid-cols-2 gap-2">
          <button
            onClick={handleClose}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 transition-colors"
          >
            <Printer className="w-5 h-5" />
            PRINT
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            SAVE
          </button>
          <button
            onClick={() => setShowEmail(!showEmail)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors"
          >
            <Mail className="w-5 h-5" />
            EMAIL
          </button>
          <button
            onClick={() => setShowSMS(!showSMS)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors col-span-2"
          >
            <MessageSquare className="w-5 h-5" />
            SMS
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 58mm;
            border: none;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  )
}
