"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatsCardProps {
  title: string
  data: {
    total_order?: number
    total_pending?: number
    total_completed?: number
    total_canceled?: number
    [key: string]: number | undefined
  }
  className?: string
  bgColor?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export function StatsCard({
  title,
  data,
  className,
  bgColor = "bg-gradient-to-br from-white to-gray-50/50",
  trend,
  trendValue,
}: StatsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-emerald-600"
      case "down":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 py-4",
        bgColor,
        className,
      )}
    >

      <CardContent className="py-0 px-2 sm:px-6 space-y-4 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h3>
            {trendValue && (
              <div className={cn("flex items-center gap-1 text-sm font-medium", getTrendColor())}>
                {getTrendIcon()}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {Object.entries(data).map(([key, value], index) => {
            const colors = [
              "from-blue-500/10 to-blue-600/5 border-blue-200/50",
              "from-emerald-500/10 to-emerald-600/5 border-emerald-200/50",
              "from-amber-500/10 to-amber-600/5 border-amber-200/50",
              "from-red-500/10 to-red-600/5 border-red-200/50",
            ]

            const textColors = ["text-blue-700", "text-emerald-700", "text-amber-700", "text-red-700"]

            return (
              <div
                key={key}
                className={cn(
                  " overflow-hidden rounded-xl p-2 md:p-4 transition-all duration-300",
                  "bg-gradient-to-br border backdrop-blur-sm",
                  "hover:scale-105 hover:shadow-md",
                  colors[index % colors.length],
                )}
              >

                <div className="space-y-2 flex flex-col justify-between h-full">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">{key.replace(/_/g, " ")}</p>
                  <p
                    className={cn(
                      "text-2xl font-bold tabular-nums tracking-tight",
                      textColors[index % textColors.length],
                    )}
                  >
                    {value?.toLocaleString() ?? 0}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50 ring-1 ring-gray-200/50">
      <CardContent className="p-2 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200/50 p-4 space-y-3">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-8 w-16 rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
