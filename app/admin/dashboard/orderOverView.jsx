"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A bar chart"

const chartData = [
  { month: "January", amount: 146 },
  { month: "February", amount: 80 },
  { month: "March", amount: 27 },
  { month: "April", amount: 73 },
  { month: "May", amount: 109 },
  { month: "June", amount: 114 },
  { month: "July", amount: 175 },
  { month: "August", amount: 86 },
  { month: "September", amount: 16 },
  { month: "October", amount: 104 },
  { month: "November", amount: 96 },
  { month: "December", amount: 86 },
]

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-1)",
  },
}

export function OrderOverview() {
  return (
    <div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent  />}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
          </BarChart>
        </ChartContainer>
    </div>
  )
}
