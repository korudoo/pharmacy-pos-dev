import { PharmacySidebar } from "@/components/pharmacy-sidebar"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <PharmacySidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1F2121] mb-6">Dashboard</h1>
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
  )
}
