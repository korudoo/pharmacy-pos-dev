"use client"

import POSCheckout from "@/components/pos-checkout"

export default function POSPage() {
  const handlePaymentComplete = (total: number, paymentMethod: string) => {
    console.log("[v0] Payment completed:", { total, paymentMethod })
    alert(`Payment successful! Total: Rs. ${total.toFixed(2)} via ${paymentMethod}`)
  }

  const handleClearCart = () => {
    console.log("[v0] Cart cleared")
  }

  return <POSCheckout onPaymentComplete={handlePaymentComplete} onClearCart={handleClearCart} />
}
