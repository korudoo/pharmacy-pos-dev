"use client"

import { useSession, signOut } from "next-auth/react"
import CashierDashboard from "@/components/cashier-dashboard"

export default function CashierPage() {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <CashierDashboard
      onStartSale={() => console.log("Callback: Start Sale")}
      onCheckInventory={() => console.log("Callback: Check Inventory")}
      onViewMySales={() => console.log("Callback: View My Sales")}
      onLogout={handleLogout}
    />
  )
}
