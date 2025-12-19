"use client"

import SalesReports from "@/components/sales-reports"

export default function SalesReportsPage() {
  return (
    <SalesReports
      onExport={(tabName) => console.log("Exporting:", tabName)}
      onDateRangeChange={(range) => console.log("Date range changed:", range)}
    />
  )
}
