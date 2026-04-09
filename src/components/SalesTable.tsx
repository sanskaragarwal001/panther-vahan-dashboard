import { Component, createSignal, createMemo, For } from "solid-js";
import { Tooltip } from "@kobalte/core/tooltip";
import { Search } from "lucide-solid";

interface SalesRecord {
  id: number;
  maker: string;
  monthlyData: number[];
}

// Mock Data
const MOCK_SALES: SalesRecord[] = [
  {
    id: 1,
    maker: "Mahindra & Mahindra Last Mile Mobility Ltd.",
    monthlyData: [450, 520, 610, 480, 500, 550, 600, 620, 580, 590, 610, 650],
  },
  {
    id: 2,
    maker: "Piaggio Vehicles Private Limited International",
    monthlyData: [300, 310, 290, 350, 340, 320, 330, 350, 360, 370, 380, 400],
  },
  {
    id: 3,
    maker: "Saera Electric Auto Private Limited North Division",
    monthlyData: [120, 150, 140, 130, 160, 170, 180, 190, 200, 210, 220, 230],
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SalesTable: Component = () => {
  const [search, setSearch] = createSignal("");

  const filteredData = createMemo(() => {
    return MOCK_SALES.filter((item) =>
      item.maker.toLowerCase().includes(search().toLowerCase()),
    );
  });

  const calculateTotal = (data: number[]) => data.reduce((a, b) => a + b, 0);

  return (
    <div class="bg-white max-w-[1440px] mx-auto rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header with Search */}
      <div class="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 class="text-lg font-semibold text-slate-800">
          Maker-wise Sales Report
        </h2>
        <div class="relative w-full md:w-72">
          <Search
            size={18}
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search maker..."
            class="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
              <th class="px-4 py-3">S.No</th>
              <th class="px-4 py-3 min-w-[200px]">Maker</th>
              <For each={months}>
                {(month) => <th class="px-3 py-3 text-center">{month}</th>}
              </For>
              <th class="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody class="text-sm text-slate-700">
            <For each={filteredData()}>
              {(row, index) => (
                <tr class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td class="px-4 py-4 text-slate-400">{index() + 1}</td>
                  <td class="px-4 py-4 font-medium">
                    <Tooltip>
                      <Tooltip.Trigger class="text-left max-w-[180px] truncate block hover:text-blue-600 transition-colors cursor-help">
                        {row.maker}
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content class="z-50 bg-slate-900 text-white px-3 py-1.5 text-xs rounded shadow-lg animate-in fade-in zoom-in-95 duration-100">
                          <Tooltip.Arrow />
                          {row.maker}
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip>
                  </td>
                  <For each={row.monthlyData}>
                    {(val) => (
                      <td class="px-3 py-4 text-center tabular-nums">{val}</td>
                    )}
                  </For>
                  <td class="px-4 py-4 text-right font-bold text-slate-900 tabular-nums">
                    {calculateTotal(row.monthlyData)}
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredData().length === 0 && (
        <div class="p-12 text-center text-slate-400">
          No records found for "{search()}"
        </div>
      )}
    </div>
  );
};

export default SalesTable;
