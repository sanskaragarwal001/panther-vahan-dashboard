import { Component, createMemo } from "solid-js";
import {
  Chart,
  Bar,
  Axis,
  AxisLabel,
  AxisLine,
  AxisGrid,
  AxisTooltip,
  AxisCursor,
} from "solid-charts";
import { TrendingUp } from "lucide-solid";
import { type SalesRecord } from "./SalesTable";

const months: Record<string, string> = {
  jan: "January",
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
  nov: "November",
  dec: "December",
  total: "Total",
};

interface TopChartProps {
  records: SalesRecord[];
  activeMonth: Exclude<keyof SalesRecord, "sno" | "maker">;
}

const SalesBarChart: Component<TopChartProps> = (props) => {
  const top10Data = createMemo(() => {
    const monthKey = props.activeMonth.toLowerCase() as keyof SalesRecord;

    return [...props.records].slice(0, 10).map((item) => ({
      name: item.maker,
      sales: (item[monthKey] as number) || 0,
    }));
  });

  return (
    <div class="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-2xl w-full relative overflow-hidden group">
      {/* Background Decorative Element */}
      <div class="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        <TrendingUp size={120} class="text-blue-500" />
      </div>

      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-sm font-bold text-slate-200 uppercase tracking-widest">
            Top 10 Manufacturers
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            Performance breakdown for{" "}
            <span class="text-blue-400 font-semibold">
              {months[props.activeMonth]}
            </span>
          </p>
        </div>
        <div class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <span class="text-[10px] font-bold text-blue-400 uppercase">
            Live Data
          </span>
        </div>
      </div>

      <div class="h-80 w-full text-[10px] font-medium">
        <Chart data={top10Data()}>
          {/* SVG Gradients Definition */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.1" />
            </linearGradient>
          </defs>

          <Axis axis="y" position="left" tickCount={5}>
            <AxisLabel class="fill-slate-500 font-mono" />
            <AxisGrid class="stroke-slate-800/50 stroke-dasharray-4" />
          </Axis>

          <Axis dataKey="name" axis="x" position="bottom">
            <AxisLine class="stroke-slate-800" />
            <AxisCursor class="stroke-blue-500/20" />

            <AxisTooltip>
              {(tooltipProps) => (
                <div class="bg-[#0B0F1A]/90 backdrop-blur-xl border border-blue-500/30 text-white px-4 py-3 rounded-xl shadow-2xl flex flex-col gap-1 min-w-[140px] animate-in fade-in zoom-in-95">
                  <span class="text-[10px] font-black text-blue-400 uppercase tracking-tighter">
                    Manufacturer
                  </span>
                  <span class="font-bold text-sm border-b border-slate-800 pb-1 mb-1 truncate">
                    {tooltipProps.data.name}
                  </span>
                  <div class="flex justify-between items-center">
                    <span class="text-slate-400">Total Sales</span>
                    <span class="text-blue-400 font-mono font-bold">
                      {tooltipProps.data.sales.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </AxisTooltip>
          </Axis>

          <Bar
            dataKey="sales"
            style={{ fill: "url(#barGradient)" }}
            class="hover:opacity-100 opacity-80 transition-all cursor-pointer stroke-blue-500/40 stroke-1"
            rx={4}
          />
        </Chart>
      </div>
    </div>
  );
};

export default SalesBarChart;
