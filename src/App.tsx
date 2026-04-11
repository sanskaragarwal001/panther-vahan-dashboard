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
import { Search } from "lucide-solid";

import SelectWrapper, { type SelectOption } from "./components/SelectWrapper";
import VehicleToggle, { DataSource } from "./components/VehicleToggle";
import SalesTable from "./components/SalesTable";
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
  };

  return (
    <main>
      <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div class="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div class="px-8 py-6 border-b border-slate-100 bg-white">
            <h1 class="text-xl font-bold text-slate-900">
              Vehicle Data Analytics
            </h1>
            <p class="text-sm text-slate-500">
              Filter regional transport office records by state, location, and
              year.
            </p>
          </div>

          <form onSubmit={handleSubmit} class="p-8 space-y-8">
            {/* Main Grid */}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SelectWrapper
                options={stateOptions()}
                placeholder={
                  states.loading ? "Loading States..." : "Select a State"
                }
                label="STATE"
                value={selectedStateId}
                setValue={setSelectedStateId}
              />
              <SelectWrapper
                options={rtoOptions()}
                placeholder={rtos.loading ? "Loading RTOs..." : "Select RTO"}
                label="RTO"
                value={selectedRtoId}
                setValue={setSelectedRtoId}
              />
              <SelectWrapper
                options={years}
                placeholder="Select a Year"
                label="YEAR"
                value={selectedYearId}
                setValue={setSelectedYearId}
              />
            </div>

            <hr class="border-slate-100" />

            {/* Toggle Section */}
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Vehicle Categories
              </h3>
              <VehicleToggle value={vehicleTypes} setValue={setVehicleTypes} />
            </div>

            {/* Footer / Action Button */}
            <div class="pt-4 flex justify-end">
              <Button
                type="submit"
                class="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md shadow-blue-200 transition-all active:scale-95 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Search size={18} />
                Fetch Records
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Show when={!records.loading && !records.error}>
        <SalesTable records={recordOptions()} />
      </Show>

      <Portal>
        <Toast.Region limit={5}>
          <Toast.List class="fixed bottom-0 right-0 p-4 z-[100] flex flex-col gap-2 outline-none" />
        </Toast.Region>
      </Portal>
    </main>
  );
};

export default App;
