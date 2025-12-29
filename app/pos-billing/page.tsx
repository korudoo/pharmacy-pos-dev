"use client"

import { useState } from "react"
import { Menu, Home, ShoppingCart, LogOut, AlertCircle } from "lucide-react"
import CashPaymentModal from "@/components/cash-payment-modal"
import QRPaymentModal from "@/components/qr-payment-modal"
import ReceiptPreviewModal from "@/components/receipt-preview-modal"

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

interface CartItem {
  id: number
  name: string
  price: number
  stock: number
  quantity: number
  category: string
  barcode: string
}

interface POSBillingPageProps {
  onLogout?: () => void
}

export default function POSBillingPage({ onLogout }: POSBillingPageProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([])
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [discountValue, setDiscountValue] = useState(0)
  const [showCashModal, setShowCashModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [lastReceipt, setLastReceipt] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Search products
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.barcode.includes(query) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  // Cart operations
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
    setSearchResults([])
    console.log("[v0] Added to cart:", product.name)
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId))
    console.log("[v0] Removed from cart:", productId)
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    const item = cart.find((i) => i.id === productId)
    if (item && newQuantity > 0 && newQuantity <= item.stock) {
      setCart(cart.map((i) => (i.id === productId ? { ...i, quantity: newQuantity } : i)))
      console.log("[v0] Updated quantity:", productId, newQuantity)
    }
  }

  const clearCart = () => {
    setCart([])
    setDiscountValue(0)
    setSearchQuery("")
    setSearchResults([])
    console.log("[v0] Cart cleared")
  }

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.13
  const discountAmount = discountType === "percentage" ? subtotal * (discountValue / 100) : discountValue
  const finalTotal = subtotal + tax - discountAmount

  // Payment handlers
  const completeCashPayment = (payment: any) => {
    const receipt = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      cashier: "Admin User",
      transactionId: `TXN-${Date.now()}`,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      subtotal: subtotal,
      tax: tax,
      total: finalTotal,
      paymentMethod: "Cash",
      amountGiven: payment.cashReceived,
      change: payment.change,
    }
    setLastReceipt(receipt)
    setShowCashModal(false)
    setShowReceiptModal(true)
    clearCart()
    console.log("[v0] Cash payment complete:", payment)
  }

  const completeQRPayment = (payment: any) => {
    const receipt = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      cashier: "Admin User",
      transactionId: payment.transactionId,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      subtotal: subtotal,
      tax: tax,
      total: finalTotal,
      paymentMethod: `QR - ${payment.method}`,
      amountGiven: payment.amount,
      change: 0,
    }
    setLastReceipt(receipt)
    setShowQRModal(false)
    setShowReceiptModal(true)
    clearCart()
    console.log("[v0] QR payment complete:", payment)
  }

  const handleLogout = () => {
    console.log("[v0] Logout clicked")
    onLogout?.()
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Simplified Cashier Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-64 bg-[#0a0a2e] text-white transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-[#b794f6]">Ausadhi POS</h1>
          <p className="text-xs text-gray-400 mt-1">Cashier Mode</p>
        </div>
        <nav className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#208C8A] text-white">
            <ShoppingCart size={20} />
            <span className="font-medium">Billing</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800">
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-red-300"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">POS Billing</h1>
          <div className="w-6" />
        </div>

        {/* Three Column Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* LEFT: Product Search */}
          <div className="w-full md:w-2/5 lg:w-1/3 p-4 overflow-y-auto border-r">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Product Search</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Scan barcode or search..."
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-[#208C8A] focus:outline-none mb-4"
            />

            {searchResults.length > 0 && (
              <div className="mb-4 max-h-64 overflow-y-auto border rounded-lg">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <div className="font-medium text-gray-800">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      Rs. {product.price} | Stock: {product.stock}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">QUICK PRODUCTS</h3>
              <div className="grid grid-cols-2 gap-2">
                {mockProducts.slice(0, 6).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="p-3 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg text-left"
                  >
                    <div className="font-semibold text-gray-800 text-sm truncate">{product.name}</div>
                    <div className="text-teal-700 font-bold mt-1">Rs. {product.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: Shopping Cart */}
          <div className="w-full md:w-1/3 lg:w-1/3 p-4 overflow-y-auto border-r bg-gray-50">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <p>Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="p-3 bg-white rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500">Rs. {item.price} each</div>
                        {item.stock < 10 && (
                          <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                            <AlertCircle size={12} />
                            Low stock!
                          </div>
                        )}
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        ×
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                      <div className="font-bold text-teal-700">Rs. {item.price * item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Payment */}
          <div className="w-full md:w-1/3 p-4 overflow-y-auto bg-white">
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
              <div className="border-t pt-3">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Discount</label>
                <div className="flex gap-2 mb-2">
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
                    className="px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="percentage">% Discount</option>
                    <option value="fixed">Rs. Fixed</option>
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
                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount:</span>
                    <span className="font-semibold">- Rs. {discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="border-t pt-3 flex justify-between text-2xl font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-[#208C8A]">Rs. {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowCashModal(true)}
                disabled={cart.length === 0}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold rounded-lg text-lg"
              >
                💵 CASH
              </button>
              <button
                onClick={() => setShowQRModal(true)}
                disabled={cart.length === 0}
                className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-lg text-lg"
              >
                📱 QR CODE
              </button>
              <button
                onClick={clearCart}
                className="w-full py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg"
              >
                CLEAR CART
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CashPaymentModal
        isOpen={showCashModal}
        onClose={() => setShowCashModal(false)}
        totalAmount={finalTotal}
        onPaymentComplete={completeCashPayment}
      />

      <QRPaymentModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        totalAmount={finalTotal}
        onPaymentComplete={completeQRPayment}
      />

      {lastReceipt && (
        <ReceiptPreviewModal
          isOpen={showReceiptModal}
          onClose={() => setShowReceiptModal(false)}
          receipt={lastReceipt}
        />
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden" />
      )}
    </div>
  )
}
