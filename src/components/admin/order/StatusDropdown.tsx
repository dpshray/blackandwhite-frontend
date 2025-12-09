"use client"

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface Props {
  value: string | null
  onChange: (newValue: string) => void
  isLoading?: boolean
  options: { label: string; value: string }[]
}

export function StatusDropdown({ value, onChange, isLoading, options }: Props) {
  const getStatusStyles = (status: string) => {
    const baseStyles = "px-3 py-1.5 text-xs font-medium rounded-md transition-all"
    switch (status.toLowerCase()) {
      case "pending":
        return `${baseStyles} bg-yellow-100 text-yellow-800`
      case "processing":
        return `${baseStyles} bg-amber-100 text-amber-800`
      case "shipped":
        return `${baseStyles} bg-blue-100 text-blue-800`
      case "delivered":
        return `${baseStyles} bg-emerald-100 text-emerald-800`
      case "cancelled":
        return `${baseStyles} bg-red-100 text-red-800`
      default:
        return baseStyles
    }
  }

  return (
    <Select value={value || "Pending"} onValueChange={onChange} disabled={isLoading}>
      <SelectTrigger
        className={cn(
          "border-0 bg-transparent shadow-none cursor-pointer",
          isLoading && "opacity-70 cursor-not-allowed",
        )}
      >
        <div className="flex items-center gap-1.5">
          {isLoading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
          <span className={getStatusStyles(value || "Pending")}>{value}</span>
        </div>
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            <span className={getStatusStyles(opt.value)}>{opt.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
