"use client"

import VendorManagement from "@/components/vendor-management"

export default function VendorsPage() {
  return (
    <VendorManagement
      onAddVendor={() => console.log("Add vendor clicked")}
      onEditVendor={(vendorId) => console.log("Edit vendor:", vendorId)}
      onViewDetails={(vendorId) => console.log("View details:", vendorId)}
      onCreateOrder={(vendorId) => console.log("Create order for vendor:", vendorId)}
    />
  )
}
