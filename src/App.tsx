import type { Component } from "solid-js";
import {
  createSignal,
  createResource,
  Show,
  createEffect,
  on,
  batch,
  createMemo,
} from "solid-js";
import { Portal } from "solid-js/web";
import { Button } from "@kobalte/core/button";
import { Toast } from "@kobalte/core/toast";
import { LayoutDashboard, Search } from "lucide-solid";

import SelectWrapper, { type SelectOption } from "./components/SelectWrapper";
import VehicleToggle, { DataSource } from "./components/VehicleToggle";
import SalesTable from "./components/SalesTable";
import DownloadSalesDialog from "./components/Download";
import { showToast } from "./components/Toast";

import { fetchStates, fetchRtos, fetchRecords } from "./resources";

const years: SelectOption[] = [
  { id: "selectedYear_1", value: "2026" },
  { id: "selectedYear_2", value: "2025" },
  { id: "selectedYear_3", value: "2024" },
  { id: "selectedYear_4", value: "2023" },
  { id: "selectedYear_5", value: "2022" },
];

const App: Component = () => {
  // 1. Signals for selections
  const [selectedStateId, setSelectedStateId] = createSignal<
    SelectOption | undefined
  >(undefined);
  const [selectedRtoId, setSelectedRtoId] = createSignal<
    SelectOption | undefined
  >(undefined);
  const [selectedYearId, setSelectedYearId] = createSignal<
    SelectOption | undefined
  >(years[0]);
  const [vehicleTypes, setVehicleTypes] = createSignal<DataSource[]>([
    DataSource.Erickshaw,
  ]);
  const [params, setParams] = createSignal<{
    state: SelectOption;
    rto: SelectOption;
    year: SelectOption;
    types: DataSource[];
  } | null>(null);

  const [submiteedState, setSubmittedState] = createSignal<
    SelectOption | undefined
  >(undefined);
  const [submiteedRto, setSubmittedRto] = createSignal<
    SelectOption | undefined
  >(undefined);

  // 2. Fetch States on mount
  const [states] = createResource(fetchStates);

  // 3. Dependent Resource: RTOs
  // This resource will re-run whenever selectedStateId() changes.
  const [rtos] = createResource(selectedStateId, fetchRtos);
  const [records] = createResource(params, fetchRecords);

  const rtoOptions = createMemo(() => {
    if (rtos.loading || rtos.error) return [];
    return Array.isArray(rtos.latest) ? rtos.latest : [];
  });

  const stateOptions = createMemo(() => {
    if (states.loading || states.error) return [];
    return Array.isArray(states.latest) ? states.latest : [];
  });

  const recordOptions = createMemo(() => {
    if (records.loading || records.error) return [];
    return Array.isArray(records.latest) ? records.latest : [];
  });

  createEffect(
    on(selectedStateId, () => {
      batch(() => {
        setSelectedRtoId(undefined);
      });
    }),
  );

  // Success/Error monitoring for RTOs
  // 1. Monitor States Error
  createEffect(() => {
    if (states.error) {
      showToast({
        title: "State Fetch Failed",
        description: "Could not load the list of states.",
        variant: "error",
      });
    }
  });

  // 2. Monitor RTOs specifically
  createEffect(
    on(
      () => rtos.state,
      (state) => {
        if (state === "errored") {
          showToast({
            title: "RTO Error",
            description: "Failed to fetch RTO locations.",
            variant: "error",
          });
        }
        if (state === "ready") {
          showToast({
            title: "RTOs Updated",
            description: "Regional data is ready.",
            variant: "success",
          });
        }
      },
    ),
  );

  // 3. Monitor Records specifically
  createEffect(
    on(
      () => records.state,
      (state) => {
        if (state === "errored") {
          showToast({
            title: "Search Error",
            description: "Failed to fetch sales records.",
            variant: "error",
          });
        }
        if (state === "ready") {
          showToast({
            title: "Success",
            description: "Sales data fetched successfully.",
            variant: "success",
          });
        }
      },
    ),
  );

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!selectedStateId() || !selectedRtoId() || !selectedYearId()) {
      showToast({
        title: "Selection Missing",
        description: "Please fill all fields.",
        variant: "error",
      });
      return;
    }
    if (vehicleTypes().length <= 0) {
      showToast({
        title: "One data source required.",
        description: "Please select at least one data source.",
        variant: "error",
      });
      return;
    }

    setParams({
      state: selectedStateId()!,
      rto: selectedRtoId()!,
      year: selectedYearId()!,
      types: vehicleTypes(),
    });

    batch(() => {
      setSubmittedState(selectedStateId());
      setSubmittedRto(selectedRtoId());
    });
  };

  return (
    <main class="min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* 1. Navigation Header */}
      <header class="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0B0F1A]/80 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard size={20} class="text-white" />
            </div>
            <div>
              <h1 class="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Panther Vahan Dashboard
              </h1>
              <p class="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                Analytics Engine
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <Show when={recordOptions().length > 0}>
              <DownloadSalesDialog
                fileTitle={`${submiteedRto()?.value}, (${submiteedState()?.value})`}
                data={recordOptions()}
              />
            </Show>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* 2. Filter Section (The Form) */}
        <section class="relative group">
          {/* Subtle Glow Effect */}
          <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

          <form
            onSubmit={handleSubmit}
            class="relative bg-[#111827] border border-slate-800 rounded-xl p-6 shadow-2xl"
          >
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
              <SelectWrapper
                options={stateOptions()}
                placeholder={states.loading ? "Loading..." : "Select State"}
                label="State Jurisdiction"
                value={selectedStateId}
                setValue={setSelectedStateId}
              />
              <SelectWrapper
                options={rtoOptions()}
                placeholder={rtos.loading ? "Loading..." : "Select Office"}
                label="RTO Office"
                value={selectedRtoId}
                setValue={setSelectedRtoId}
              />
              <SelectWrapper
                options={years}
                placeholder="Select Year"
                label="Financial Year"
                value={selectedYearId}
                setValue={setSelectedYearId}
              />

              <Button
                type="submit"
                disabled={records.loading}
                class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
              >
                <Search
                  size={18}
                  class={records.loading ? "animate-spin" : ""}
                />
                {records.loading ? "Processing..." : "Analyze Records"}
              </Button>
            </div>

            <div class="mt-8 pt-6 border-t border-slate-800/50">
              <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                Vehicle Segmentation
              </h3>
              <VehicleToggle value={vehicleTypes} setValue={setVehicleTypes} />
            </div>
          </form>
        </section>

        {/* 3. Data Visualization / Table Area */}
        <section class="min-h-100">
          <Show
            when={!records.loading}
            fallback={
              <div class="flex flex-col items-center justify-center py-20 space-y-4">
                <div class="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p class="text-slate-500 animate-pulse">
                  Scraping Vahan Dashboard...
                </p>
              </div>
            }
          >
            <Show
              when={recordOptions().length > 0}
              fallback={
                <div class="text-center py-20 bg-[#111827]/50 rounded-xl border border-dashed border-slate-800">
                  <p class="text-slate-500 italic">
                    No records found. Adjust filters to begin analysis.
                  </p>
                </div>
              }
            >
              <div class="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div class="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                  <h2 class="text-sm font-semibold text-slate-300">
                    Maker list of {submiteedRto()?.value}, (
                    {submiteedState()?.value})
                  </h2>
                  <span class="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
                    {recordOptions().length} Entries Found
                  </span>
                </div>
                <SalesTable records={recordOptions()} />
              </div>
            </Show>
          </Show>
        </section>
      </div>

      {/* 4. Global Notifications */}
      <Portal>
        <Toast.Region limit={3}>
          <Toast.List class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-80 outline-none" />
        </Toast.Region>
      </Portal>
    </main>
  );
};

export default App;
