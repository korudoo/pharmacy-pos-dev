import InventoryManagement from "@/components/inventory-management"

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <InventoryManagement
        onAddProduct={() => console.log("Add product clicked")}
        onEditProduct={(id) => console.log("Edit product:", id)}
        onDeleteProduct={(id) => console.log("Delete product:", id)}
        onReorder={(id) => console.log("Reorder product:", id)}
      />
    </div>
  )
}
