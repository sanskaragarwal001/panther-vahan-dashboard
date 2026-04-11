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
import { type SalesRecord } from "./SalesTable";

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
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full">
      {/* Wrapper to control dimensions for the responsive SVG */}
      <div class="h-100 w-full text-sm">
        <Chart data={top10Data()}>
          {/* Y-Axis: No dataKey needed for the value axis, just position */}
          <Axis axis="y" position="left" tickCount={5}>
            <AxisLabel />
            <AxisGrid class="stroke-slate-200 stroke-dasharray-4" />
          </Axis>

          {/* X-Axis: Maps to the 'name' property in our data array */}
          <Axis dataKey="name" axis="x" position="bottom">
            {/*<AxisLabel />*/}
            <AxisLine class="stroke-slate-300" />
            <AxisCursor />

            {/* Tooltip passes the active data point as a prop to its children */}
            <AxisTooltip>
              {(tooltipProps) => (
                <div class="bg-slate-900 text-white px-3 py-2 rounded text-sm shadow-xl flex flex-col gap-1">
                  <span class="font-bold text-xs text-slate-300">
                    {tooltipProps.data.name}
                  </span>
                  <span>Sales: {tooltipProps.data.sales}</span>
                </div>
              )}
            </AxisTooltip>
          </Axis>

          {/* The Bar component maps to the 'sales' property */}
          <Bar
            dataKey="sales"
            class="fill-blue-500 hover:fill-blue-600 transition-colors"
          />
        </Chart>
      </div>
    </div>
  );
};

export default SalesBarChart;
