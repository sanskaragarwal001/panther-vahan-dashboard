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
import { Pagination } from "@kobalte/core/pagination";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-solid";

import SalesBarChart from "./SalesChart";

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
  const pageSize = 15;

  const [search, setSearch] = createSignal("");
  const [page, setPage] = createSignal(1);
  const [sortConfig, setSortConfig] = createSignal<{
    key: keyof SalesRecord;
    direction: "asc" | "desc";
  }>({ key: "total", direction: "desc" });

  const handleSort = (key: keyof SalesRecord) => {
    const lowerKey = key.toLowerCase();
    setSortConfig({ key: lowerKey, direction: "desc" });
    setPage(1);
  };

  const sortedFullData = createMemo(() => {
    const config = sortConfig();
    return [...props.records].sort((a, b) => {
      const aValue = (a[config.key] as number) || 0;
      const bValue = (b[config.key] as number) || 0;
      return config.direction === "asc" ? aValue - bValue : bValue - aValue;
    });
  });

  const filteredData = createMemo(() => {
    return sortedFullData().filter((item) =>
      item.maker.toLowerCase().includes(search().toLowerCase()),
    );
  });

  // 3. Pagination Logic (Sliced Dataset)
  const paginationData = createMemo(() => {
    const start = (page() - 1) * pageSize;
    return filteredData().slice(start, start + pageSize);
  });

  const totalPages = createMemo(() =>
    Math.ceil(filteredData().length / pageSize),
  );

  return (
    <div class="bg-[#0F172A] max-w-[1440px] mx-auto rounded-2xl shadow-2xl border border-slate-800/60 overflow-hidden flex flex-col mb-12">
      {/* 1. Header & Integrated Chart */}
      <div class="p-1 bg-gradient-to-b from-slate-800/30 to-transparent">
        <Show when={sortedFullData().length}>
          <SalesBarChart
            records={sortedFullData()}
            activeMonth={sortConfig().key}
          />
        </Show>
      </div>

      {/* 2. Controls Toolbar */}
      <div class="px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#111827]/50 border-y border-slate-800/50">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-500/10 rounded-lg">
            <TrendingUp size={20} class="text-blue-400" />
          </div>
          <h2 class="text-sm font-bold text-slate-200 uppercase tracking-widest">
            Manufacturer Performance Index
          </h2>
        </div>

        <div class="relative w-full md:w-80 group">
          <Search
            size={16}
            class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
          />
          <input
            type="text"
            placeholder="Search by manufacturer..."
            class="w-full pl-10 pr-4 py-2.5 bg-[#0B0F1A] border border-slate-800 text-slate-200 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-600"
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
        </div>
      </div>

      {/* 3. The Modern Data Grid */}
      <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr class="bg-[#0B0F1A] sticky top-0 z-10 border-b border-slate-800 text-[10px] uppercase text-slate-500 font-black tracking-tighter">
              <th class="px-6 py-4 border-b border-slate-800">#</th>
              <th class="px-6 py-4 border-b border-slate-800 min-w-[220px]">
                Maker Name
              </th>

              <For each={months}>
                {(month) => (
                  <th
                    class="px-4 py-4 text-center border-b border-slate-800 cursor-pointer hover:text-blue-400 transition-colors select-none group"
                    onClick={() => handleSort(month as any)}
                  >
                    <div class="flex items-center justify-center gap-1.5">
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
                class="px-6 py-4 text-right border-b border-slate-800 cursor-pointer hover:text-blue-400 transition-colors select-none"
                onClick={() => handleSort("total")}
              >
                <div class="flex items-center justify-end gap-1.5">
                  Total Units
                  <SortIcon config={sortConfig()} column="total" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="text-sm text-slate-300 divide-y divide-slate-800/40">
            <For each={paginationData()}>
              {(row) => {
                const currentSNo = createMemo(
                  () => sortedFullData().indexOf(row) + 1,
                );

                return (
                  <tr class="hover:bg-blue-500/[0.02] transition-colors group">
                    <td class="px-6 py-4 font-mono text-xs text-slate-600">
                      {currentSNo().toString().padStart(2, "0")}
                    </td>
                    <td class="px-6 py-4">
                      <Tooltip>
                        <Tooltip.Trigger class="text-left font-semibold text-slate-200 hover:text-blue-400 transition-colors cursor-help truncate block max-w-[200px]">
                          {row.maker}
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content class="z-[60] bg-[#111827] border border-slate-700 text-blue-50 px-3 py-2 text-xs rounded-lg shadow-2xl animate-in fade-in zoom-in-95">
                            <Tooltip.Arrow class="fill-[#111827]" />
                            {row.maker}
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip>
                    </td>

                    <For each={months}>
                      {(month) => (
                        <td class="px-4 py-4 text-center tabular-nums font-mono text-xs group-hover:text-white transition-colors">
                          {row[month.toLowerCase() as keyof SalesRecord] || "—"}
                        </td>
                      )}
                    </For>

                    <td class="px-6 py-4 text-right tabular-nums font-bold text-blue-400 bg-blue-500/[0.01]">
                      {row.total.toLocaleString()}
                    </td>
                  </tr>
                );
              }}
            </For>
          </tbody>
        </table>
      </div>

      {/* 4. Glass-morphism Pagination */}
      <div class="p-6 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between bg-[#0B0F1A] gap-4">
        <span class="text-xs text-slate-500 font-medium">
          Showing page <span class="text-slate-300">{page()}</span> of{" "}
          {totalPages()}
        </span>

        <Pagination
          count={totalPages()}
          page={page()}
          onPageChange={setPage}
          itemComponent={(p) => (
            <Pagination.Item
              page={p.page}
              class="min-w-[36px] h-9 text-xs font-bold rounded-lg border border-slate-800 bg-[#111827] text-slate-400 hover:border-slate-600 hover:text-white data-[current]:bg-blue-600 data-[current]:text-white data-[current]:border-blue-600 data-[current]:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all"
            >
              {p.page}
            </Pagination.Item>
          )}
          ellipsisComponent={() => <span class="px-2 text-slate-600">•••</span>}
        >
          <div class="flex items-center gap-2">
            <Pagination.Previous class="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-800 bg-[#111827] text-slate-400 hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft size={16} />
            </Pagination.Previous>
            <Pagination.Items />
            <Pagination.Next class="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-800 bg-[#111827] text-slate-400 hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
              <ChevronRight size={16} />
            </Pagination.Next>
          </div>
        </Pagination>
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
