"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, AlertCircle } from "lucide-react"

interface ProductFormData {
  sku: string
  productName: string
  category: string
  quantity: number
  unit: string
  reorderLevel: number
  costPrice: number
  sellingPrice: number
  expiryDate: string
  vendor: string
  description: string
}

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ProductFormData) => void
  initialData?: Partial<ProductFormData>
}

const vendors = ["Supplier A", "Supplier B", "Supplier C"]
const categories = ["Painkillers", "Vitamins", "Cough/Cold", "Antibiotics", "Oral Care", "ENT", "Other"]
const units = ["pieces", "strips", "bottles", "ml", "boxes", "packets"]

export default function ProductFormModal({ isOpen, onClose, onSave, initialData }: ProductFormModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    sku: "",
    productName: "",
    category: "",
    quantity: 0,
    unit: "",
    reorderLevel: 0,
    costPrice: 0,
    sellingPrice: 0,
    expiryDate: "",
    vendor: "",
    description: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }))
    }
  }, [initialData])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.sku.trim()) newErrors.sku = "SKU is required"
    if (!formData.productName.trim()) newErrors.productName = "Product name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (formData.quantity < 0) newErrors.quantity = "Quantity cannot be negative"
    if (!formData.unit) newErrors.unit = "Unit is required"
    if (formData.reorderLevel < 0) newErrors.reorderLevel = "Reorder level cannot be negative"
    if (formData.costPrice <= 0) newErrors.costPrice = "Cost price must be positive"
    if (formData.sellingPrice <= 0) newErrors.sellingPrice = "Selling price must be positive"
    if (formData.sellingPrice <= formData.costPrice) {
      newErrors.sellingPrice = "Selling price must be greater than cost price"
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required"
    } else {
      const expiryDate = new Date(formData.expiryDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (expiryDate <= today) {
        newErrors.expiryDate = "Expiry date must be in the future"
      }
    }
    if (!formData.vendor) newErrors.vendor = "Vendor is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Save product:", formData)
      onSave(formData)
      setIsLoading(false)
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
        handleClose()
      }, 2000)
    }, 500)
  }

  const handleClose = () => {
    console.log("Close modal")
    setFormData({
      sku: "",
      productName: "",
      category: "",
      quantity: 0,
      unit: "",
      reorderLevel: 0,
      costPrice: 0,
      sellingPrice: 0,
      expiryDate: "",
      vendor: "",
      description: "",
    })
    setErrors({})
    onClose()
  }

  const handleChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  if (!isOpen) return null

  const isEditMode = !!initialData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode ? `Edit Product: ${initialData?.productName || ""}` : "Add New Product"}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Toast */}
        {showSuccess && (
          <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
            <span className="font-medium">Success!</span> Product saved successfully.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* SKU / Barcode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SKU / Barcode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.sku ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter SKU or barcode"
            />
            {errors.sku && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.sku}
              </p>
            )}
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => handleChange("productName", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.productName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.productName}
              </p>
            )}
          </div>

          {/* Category & Unit Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.unit ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select unit</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {errors.unit && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.unit}
                </p>
              )}
            </div>
          </div>

          {/* Quantity & Reorder Level Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity in Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", Number.parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0"
                min="0"
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.quantity}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reorder Level <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.reorderLevel}
                onChange={(e) => handleChange("reorderLevel", Number.parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.reorderLevel ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0"
                min="0"
              />
              {errors.reorderLevel && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.reorderLevel}
                </p>
              )}
            </div>
          </div>

          {/* Cost Price & Selling Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost Price (Rs.) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => handleChange("costPrice", Number.parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.costPrice ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
                min="0"
              />
              {errors.costPrice && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.costPrice}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selling Price (Rs.) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.sellingPrice}
                onChange={(e) => handleChange("sellingPrice", Number.parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.sellingPrice ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
                min="0"
              />
              {errors.sellingPrice && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.sellingPrice}
                </p>
              )}
            </div>
          </div>

          {/* Expiry Date & Vendor Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleChange("expiryDate", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.expiryDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier/Vendor <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.vendor}
                onChange={(e) => handleChange("vendor", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.vendor ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
              {errors.vendor && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.vendor}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${
                isLoading || Object.keys(errors).length > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#208C8A] hover:bg-[#1a706e] active:scale-95"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </span>
              ) : (
                "Save Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
