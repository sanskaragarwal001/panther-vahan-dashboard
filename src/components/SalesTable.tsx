import {
  Component,
  createSignal,
  createMemo,
  For,
  Show,
  Switch,
  Match,
} from "solid-js";
import { Tooltip } from "@kobalte/core/tooltip";
import { Search, ChevronDown, ChevronUp } from "lucide-solid";

export interface SalesRecord {
  sno: number;
  maker: string;
  jan: number;
  feb: number | undefined;
  mar: number | undefined;
  apr: number | undefined;
  jun: number | undefined;
  jul: number | undefined;
  sep: number | undefined;
  oct: number | undefined;
  nov: number | undefined;
  dec: number | undefined;
  total: number;
}

interface SalesTableProps {
  records: SalesRecord[];
}

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

const SalesTable: Component<SalesTableProps> = (props) => {
  const [search, setSearch] = createSignal("");
  const [sortConfig, setSortConfig] = createSignal<{
    key: keyof SalesRecord;
    direction: "asc" | "desc";
  }>({ key: "total", direction: "desc" });

  const handleSort = (key: keyof SalesRecord) => {
    const lowerKey = key.toLowerCase();
    setSortConfig({ key: lowerKey, direction: "desc" });
  };

  // Combined Memo for Search + Sort
  const processedData = createMemo(() => {
    // 1. Filter
    const filtered = props.records.filter((item) =>
      item.maker.toLowerCase().includes(search().toLowerCase()),
    );

    // 2. Sort
    const config = sortConfig();
    return [...filtered].sort((a, b) => {
      const aValue = (a[config.key as keyof SalesRecord] as number) || 0;
      const bValue = (b[config.key as keyof SalesRecord] as number) || 0;

      return config.direction === "asc" ? aValue - bValue : bValue - aValue;
    });
  });

  return (
    <div class="bg-white max-w-[1440px] mx-auto rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
              <th class="px-4 py-3">S.No</th>
              <th class="px-4 py-3 min-w-[200px]">Maker</th>

              <For each={months}>
                {(month) => (
                  <th
                    class="px-3 py-3 text-center cursor-pointer hover:bg-slate-100 transition-colors select-none"
                    onClick={() => handleSort(month)}
                  >
                    <div class="flex items-center justify-center gap-1">
                      {month}
                      <SortIcon
                        config={sortConfig()}
                        column={month.toLowerCase()}
                      />
                    </div>
                  </th>
                )}
              </For>

              <th
                class="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 transition-colors select-none"
                onClick={() => handleSort("total")}
              >
                <div class="flex items-center justify-end gap-1">
                  Total
                  <SortIcon config={sortConfig()} column="total" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm text-slate-700">
            <For each={processedData()}>
              {(row, index) => (
                <tr class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td class="px-4 py-4 text-slate-400">{index() + 1}</td>
                  <td class="px-4 py-4 font-medium">
                    <Tooltip>
                      <Tooltip.Trigger class="text-left max-w-[180px] truncate block hover:text-blue-600 transition-colors cursor-help">
                        {row.maker}
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content class="z-50 bg-slate-900 text-white px-3 py-1.5 text-xs rounded shadow-lg">
                          <Tooltip.Arrow />
                          {row.maker}
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip>
                  </td>
                  <For each={months}>
                    {(month) => (
                      <td class="px-3 py-4 text-center tabular-nums">
                        {row[month.toLowerCase() as keyof SalesRecord] || 0}
                      </td>
                    )}
                  </For>
                  <td class="px-4 py-4 text-right font-bold text-slate-900 tabular-nums">
                    {row.total}
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper component for the little arrows
const SortIcon = (props: {
  config: { key: string; direction: string };
  column: string;
}) => {
  return (
    <span class="text-slate-400">
      <Show when={props.config.key === props.column}>
        <Switch fallback={<div class="w-3.5" />}>
          <Match when={props.config.direction === "asc"}>
            <ChevronUp size={14} />
          </Match>
          <Match when={props.config.direction === "desc"}>
            <ChevronDown size={14} />
          </Match>
        </Switch>
      </Show>
    </span>
  );
};

export default SalesTable;
