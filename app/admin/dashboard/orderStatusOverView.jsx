"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart"

const chartData = [
  { status: "pending", count: 275, fill: "var(--color-pending)" },
  { status: "processing", count: 200, fill: "var(--color-processing)" },
  { status: "shiped", count: 187, fill: "var(--color-shiped)" },
  { status: "cancel", count: 173, fill: "var(--color-cancel)" },
  { status: "delivered", count: 90, fill: "var(--color-delivered)" },
]

const chartConfig = {
  status: {
    label: "status",
  },
  pending: {
    label: "Pending",
    color: "#FDBA74", 
  },
  processing: {
    label: "Processing",
    color: "#60A5FA", 
  },
  shiped: {
    label: "Shipped",
    color: "#34D399", 
  },
  cancel: {
    label: "Cancel",
    color: "#F87171", 
  },
  delivered: {
    label: "Delivered",
    color: "#A78B", 
  },
};




export function OrderStatusOverView() {
  return (
    <div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
            >
                <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          100
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Count
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        {/* Status Breakdown List */}
      <div className="mt-6 space-y-2">
  {chartData.map((item) => (
    <div
      key={item.status}
      className="flex items-center justify-between rounded-lg border bg-card px-4 py-2 hover:bg-accent transition-colors"
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <span
          className="h-3.5 w-3.5 rounded-full shadow"
          style={{ backgroundColor: item.fill }}
        ></span>
        <span className="font-medium capitalize text-sm">
          {item.status}
        </span>
      </div>

      {/* Right count badge */}
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted/70 text-foreground">
        {item.count}
      </span>
    </div>
  ))}
</div>


    </div>
  )
}
