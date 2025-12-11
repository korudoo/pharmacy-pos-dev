import { AdminHeader } from "@/components/admin-header"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <PharmacySidebar />
      <div className="flex-1 md:ml-64">
        <AdminHeader title="Dashboard" />
        <main className="pt-16 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-[#1F2121] mb-2">Welcome to AusadhiPOS</h2>
                <p className="text-gray-600">Your pharmacy management system</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-[#1F2121] mb-2">Quick Stats</h2>
                <p className="text-gray-600">View your pharmacy analytics</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-[#1F2121] mb-2">Recent Activity</h2>
                <p className="text-gray-600">Track recent transactions</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
