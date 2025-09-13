"use client"

import { CartesianGrid, Line, LineChart, XAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetDailySales } from "@/hooks/useChart"

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function SalesLineChart() {
  const { data, isLoading } = useGetDailySales()

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Daily Sales</CardTitle>
          <CardDescription>
            <Skeleton className="h-[250px] w-full" />
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const chartData =
    data?.labels.map((label: string, i: number) => ({
      date: label,
      sales: parseFloat(data.sales[i]),
    })) || []

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Sales</CardTitle>
        <CardDescription>Latest sales from last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full aspect-auto h-[250px]">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={chartData}
              margin={{ left: 8, right: 8, top: 12, bottom: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(5)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="sales"
                type="monotone"
                stroke="var(--color-sales)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 leading-none font-medium">
          Trending up compared to previous days <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="text-muted-foreground leading-none">
          Showing daily sales data
        </div>
      </CardFooter>
    </Card>
  )
}
