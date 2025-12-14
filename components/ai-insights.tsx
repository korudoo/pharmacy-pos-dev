"use client"

import { useState } from "react"
import { Zap, AlertCircle, Lightbulb, X } from "lucide-react"

interface Insight {
  id: number
  type: "urgent" | "recommendation"
  message: string
  actionLabel: string
}

interface AIInsightsProps {
  insights?: Insight[]
  onAction?: (insightId: number, action: string) => void
}

export default function AIInsights({ insights, onAction }: AIInsightsProps) {
  const mockInsights: Insight[] = [
    {
      id: 1,
      type: "urgent",
      message: "Paracetamol 500mg: Only 10 left (Reorder at 20)",
      actionLabel: "Reorder",
    },
    {
      id: 2,
      type: "urgent",
      message: "Cough Syrup Batch#C23: Expires in 15 days",
      actionLabel: "View Details",
    },
    {
      id: 3,
      type: "recommendation",
      message: "Stock Vitamin D more → Sold 45 units today (↑40% from avg)",
      actionLabel: "Apply",
    },
    {
      id: 4,
      type: "recommendation",
      message: "Multivitamins: Apply 10% discount for low movement",
      actionLabel: "Apply",
    },
  ]

  const displayInsights = insights || mockInsights
  const [dismissedIds, setDismissedIds] = useState<number[]>([])

  const handleDismiss = (id: number) => {
    setDismissedIds((prev) => [...prev, id])
  }

  const handleAction = (id: number, action: string) => {
    console.log("Action:", id, action)
    if (onAction) {
      onAction(id, action)
    }
  }

  const urgentAlerts = displayInsights.filter((i) => i.type === "urgent" && !dismissedIds.includes(i.id))
  const recommendations = displayInsights.filter((i) => i.type === "recommendation" && !dismissedIds.includes(i.id))

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-yellow-500" />
        <h2 className="text-lg font-semibold text-[#1F2121]">🤖 AI-Powered Insights</h2>
      </div>

      <div className="space-y-6">
        {/* URGENT ALERTS Section */}
        {urgentAlerts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-[#EF4444]" />
              <h3 className="text-sm font-semibold text-[#EF4444] uppercase tracking-wide">Urgent Alerts</h3>
            </div>
            <div className="space-y-3">
              {urgentAlerts.map((insight) => (
                <div
                  key={insight.id}
                  className="border-l-4 border-[#EF4444] bg-red-50 p-4 rounded-r-lg transition-all duration-300 hover:shadow-md cursor-pointer group"
                  onClick={() => handleAction(insight.id, "view")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 mb-3">{insight.message}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAction(insight.id, insight.actionLabel.toLowerCase())
                          }}
                          className="px-3 py-1.5 bg-[#EF4444] text-white text-xs font-medium rounded-md hover:bg-red-600 transition-colors"
                        >
                          {insight.actionLabel}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAction(insight.id, "view details")
                          }}
                          className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDismiss(insight.id)
                      }}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4 text-[#EF4444]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECOMMENDATIONS Section */}
        {recommendations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-sm font-semibold text-[#3B82F6] uppercase tracking-wide">Recommendations</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((insight) => (
                <div
                  key={insight.id}
                  className="border-l-4 border-[#3B82F6] bg-blue-50 p-4 rounded-r-lg transition-all duration-300 hover:shadow-md cursor-pointer group"
                  onClick={() => handleAction(insight.id, "view")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 mb-3">{insight.message}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAction(insight.id, insight.actionLabel.toLowerCase())
                          }}
                          className="px-3 py-1.5 bg-[#3B82F6] text-white text-xs font-medium rounded-md hover:bg-blue-600 transition-colors"
                        >
                          {insight.actionLabel}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAction(insight.id, "view details")
                          }}
                          className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDismiss(insight.id)
                      }}
                      className="p-1 hover:bg-blue-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4 text-[#3B82F6]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {urgentAlerts.length === 0 && recommendations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">All insights have been reviewed</p>
          </div>
        )}
      </div>
    </div>
  )
}
