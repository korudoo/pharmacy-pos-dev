"use client"

import CashierDashboard from "@/components/cashier-dashboard"

export default function CashierPage() {
  return (
    <CashierDashboard
      onStartSale={() => console.log("Callback: Start Sale")}
      onCheckInventory={() => console.log("Callback: Check Inventory")}
      onViewMySales={() => console.log("Callback: View My Sales")}
      onLogout={() => console.log("Callback: Logout")}
    />
  )
}
