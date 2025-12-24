"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Plus, Minus, X, AlertTriangle } from "lucide-react"

const mockProducts = [
  { id: 1, name: "Paracetamol 500mg", price: 50, stock: 45, category: "Painkillers", barcode: "1234567890" },
  { id: 2, name: "Cough Syrup", price: 120, stock: 8, category: "Cough/Cold", barcode: "1234567891" },
  { id: 3, name: "Vitamin C 500mg", price: 80, stock: 15, category: "Vitamins", barcode: "1234567892" },
  { id: 4, name: "Aspirin 75mg", price: 60, stock: 30, category: "Painkillers", barcode: "1234567893" },
  { id: 5, name: "Multivitamin Tablets", price: 150, stock: 20, category: "Vitamins", barcode: "1234567894" },
  { id: 6, name: "Antibiotic Cream", price: 200, stock: 12, category: "Topical", barcode: "1234567895" },
  { id: 7, name: "Insulin Injection", price: 350, stock: 8, category: "Diabetes", barcode: "1234567896" },
  { id: 8, name: "Blood Pressure Monitor", price: 2500, stock: 5, category: "Devices", barcode: "1234567897" },
  { id: 9, name: "Thermometer Digital", price: 450, stock: 18, category: "Devices", barcode: "1234567898" },
  { id: 10, name: "Hand Sanitizer 500ml", price: 180, stock: 35, category: "Hygiene", barcode: "1234567899" },
]

const quickProducts = [
  { id: 1, name: "Paracetamol 500mg", price: 50, stock: 45 },
  { id: 2, name: "Cough Syrup", price: 120, stock: 8 },
  { id: 3, name: "Vitamin C 500mg", price: 80, stock: 15 },
  { id: 4, name: "Aspirin 75mg", price: 60, stock: 30 },
  { id: 5, name: "Multivitamin", price: 150, stock: 20 },
]

interface CartItem {
  id: number
  name: string
  price: number
  stock: number
  quantity: number
}

interface POSCheckoutProps {
  onPaymentComplete?: (total: number, paymentMethod: string) => void
  onClearCart?: () => void
}

export default function POSCheckout({ onPaymentComplete, onClearCart }: POSCheckoutProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([])
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [discountValue, setDiscountValue] = useState(0)
  const [discountReason, setDiscountReason] = useState("")
  const [showCashModal, setShowCashModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Auto-focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  // Search products
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.barcode.includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchQuery("")
        searchInputRef.current?.focus()
      }
      if (e.ctrlKey && e.key === "Enter") {
        if (cart.length > 0) {
          setShowCashModal(true)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [cart])

  const addToCart = (product: (typeof mockProducts)[0]) => {
    const existing = cart.find((item) => item.id === product.id)
    if (existing) {
      if (existing.quantity < product.stock) {
        setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    setSearchQuery("")
    searchInputRef.current?.focus()
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    const item = cart.find((i) => i.id === productId)
    if (item && newQuantity > 0 && newQuantity <= item.stock) {
      setCart(cart.map((i) => (i.id === productId ? { ...i, quantity: newQuantity } : i)))
    }
  }

  const clearCart = () => {
    setCart([])
    setDiscountValue(0)
    setSearchQuery("")
    onClearCart?.()
  }

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.13
  const discountAmount = discountType === "percentage" ? subtotal * (discountValue / 100) : discountValue
  const finalTotal = subtotal + tax - discountAmount

  const handleCashPayment = (amountPaid: number) => {
    console.log("[v0] Cash payment completed:", { total: finalTotal, amountPaid, change: amountPaid - finalTotal })
    onPaymentComplete?.(finalTotal, "cash")
    setShowCashModal(false)
    clearCart()
  }

  const handleQRPayment = () => {
    console.log("[v0] QR payment completed:", { total: finalTotal })
    onPaymentComplete?.(finalTotal, "qr")
    setShowQRModal(false)
    clearCart()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT COLUMN: Product Search & Quick Products */}
      <div className="w-full lg:w-2/5 p-4 bg-white border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Product Search</h2>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Scan barcode or search..."
            className="w-full pl-10 pr-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-4 max-h-64 overflow-y-auto border rounded-lg">
            {searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-gray-800">{product.name}</div>
                  <div className="text-sm text-gray-500">
                    Rs. {product.price} | Stock: {product.stock}
                    {product.stock < 5 && <AlertTriangle className="inline ml-2 text-orange-500" size={16} />}
                  </div>
                </div>
                <Plus size={20} className="text-teal-600" />
              </button>
            ))}
          </div>
        )}

        {/* Quick Products */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">QUICK PRODUCTS</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(mockProducts.find((p) => p.id === product.id)!)}
                className="p-4 bg-teal-50 hover:bg-teal-100 border-2 border-teal-200 rounded-lg text-left transition-colors"
              >
                <div className="font-semibold text-gray-800 text-sm">{product.name}</div>
                <div className="text-teal-700 font-bold mt-1">Rs. {product.price}</div>
                <div className="text-xs text-gray-500 mt-1">Stock: {product.stock}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: Shopping Cart */}
      <div className="hidden lg:block lg:w-1/4 p-4 bg-gray-50 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>Cart is empty.</p>
            <p className="text-sm">Scan or search products.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white rounded-lg border hover:border-teal-300 transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">Rs. {item.price} each</div>
                    {item.stock < 5 && (
                      <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                        <AlertTriangle size={12} />
                        Low stock!
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded"
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="font-bold text-teal-700">Rs. {item.price * item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Totals & Payment */}
      <div className="w-full lg:w-1/3 p-4 bg-white overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Payment</h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax (13%):</span>
            <span className="font-semibold">Rs. {tax.toFixed(2)}</span>
          </div>

          {/* Discount */}
          <div className="border-t pt-3">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">Discount</label>
            <div className="flex gap-2 mb-2">
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (Rs.)</option>
              </select>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                placeholder="0"
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                min="0"
              />
            </div>
            <select
              value={discountReason}
              onChange={(e) => setDiscountReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm text-gray-600"
            >
              <option value="">Discount reason (optional)</option>
              <option value="senior">Senior Citizen</option>
              <option value="loyalty">Loyalty Card</option>
              <option value="promotion">Promotion</option>
              <option value="staff">Staff Discount</option>
            </select>
            {discountAmount > 0 && (
              <div className="flex justify-between text-red-600 mt-2">
                <span>Discount:</span>
                <span className="font-semibold">- Rs. {discountAmount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="border-t pt-3 flex justify-between text-2xl font-bold text-gray-900">
            <span>Total:</span>
            <span className="text-teal-700">Rs. {finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setShowCashModal(true)}
            disabled={cart.length === 0}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold rounded-lg text-lg transition-colors"
          >
            💵 CASH
          </button>
          <button
            onClick={() => setShowQRModal(true)}
            disabled={cart.length === 0}
            className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-lg text-lg transition-colors"
          >
            📱 QR CODE
          </button>
          <button
            onClick={clearCart}
            className="w-full py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
          >
            CLEAR CART
          </button>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          <div>ESC: Clear search</div>
          <div>Ctrl+Enter: Quick checkout</div>
        </div>
      </div>

      {/* Cash Payment Modal */}
      {showCashModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Cash Payment</h3>
            <div className="mb-4">
              <div className="text-gray-600">Total Amount:</div>
              <div className="text-3xl font-bold text-teal-700">Rs. {finalTotal.toFixed(2)}</div>
            </div>
            <CashPaymentForm
              total={finalTotal}
              onComplete={handleCashPayment}
              onCancel={() => setShowCashModal(false)}
            />
          </div>
        </div>
      )}

      {/* QR Payment Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
            <h3 className="text-xl font-bold mb-4">QR Code Payment</h3>
            <div className="mb-4">
              <div className="text-gray-600">Total Amount:</div>
              <div className="text-3xl font-bold text-teal-700 mb-4">Rs. {finalTotal.toFixed(2)}</div>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg mb-4">
              <div className="w-48 h-48 mx-auto bg-white border-4 border-gray-300 flex items-center justify-center">
                <div className="text-gray-400 text-sm">
                  QR Code
                  <br />
                  Placeholder
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Scan this QR code with your payment app</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleQRPayment}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CashPaymentForm({
  total,
  onComplete,
  onCancel,
}: { total: number; onComplete: (amount: number) => void; onCancel: () => void }) {
  const [amountPaid, setAmountPaid] = useState("")
  const change = Number(amountPaid) - total

  const quickAmounts = [500, 1000, 2000, 5000]

  return (
    <div>
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-600 mb-2 block">Amount Paid:</label>
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          placeholder="Enter amount"
          className="w-full px-4 py-3 border-2 rounded-lg text-lg"
          autoFocus
        />
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => setAmountPaid(String(amount))}
            className="py-2 bg-gray-100 hover:bg-gray-200 rounded font-semibold text-sm"
          >
            {amount}
          </button>
        ))}
      </div>

      {change >= 0 && amountPaid && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="text-sm text-gray-600">Change:</div>
          <div className="text-2xl font-bold text-green-700">Rs. {change.toFixed(2)}</div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold">
          Cancel
        </button>
        <button
          onClick={() => onComplete(Number(amountPaid))}
          disabled={!amountPaid || Number(amountPaid) < total}
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-semibold"
        >
          Complete
        </button>
      </div>
    </div>
  )
}
