"use client"

import type React from "react"
import { useState } from "react"
import { StatusDropdown } from "./StatusDropdown"

export const statusOptions = [
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
]

interface OrderStatusCellProps {
  orderId: number
  value: string
  onChangeStatus: (orderId: number, status: string) => void
  loadingOrderId?: number | null
}

export const OrderStatusCell: React.FC<OrderStatusCellProps> = ({ orderId, value, onChangeStatus, loadingOrderId }) => {
  const [status, setStatus] = useState(value)

  const handleChange = (newStatus: string) => {
    setStatus(newStatus)
    onChangeStatus(orderId, newStatus)
  }

  const isLoading = loadingOrderId === orderId

  return <StatusDropdown value={status} options={statusOptions} onChange={handleChange} isLoading={isLoading} />
}
