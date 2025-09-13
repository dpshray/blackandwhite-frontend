"use client"

import { getDailySales } from "@/services/chartServices"
import { useQuery } from "@tanstack/react-query"

export const useGetDailySales = () => {
  return useQuery({
    queryKey: ["dailySales"],
    queryFn: getDailySales,
  })
}
