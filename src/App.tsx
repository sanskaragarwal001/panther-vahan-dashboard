import type { Component } from "solid-js";
import { createSignal, createResource, createEffect, Show } from "solid-js";
import { Button } from "@kobalte/core/button";
import { Search } from "lucide-solid";

import SelectWrapper, { type SelectOption } from "./components/SelectWrapper";
import VehicleToggle, { DataSource } from "./components/VehicleToggle";
import SalesTable, { type SalesRecord } from "./components/SalesTable";

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

  // Optional: Reset RTO selection when State changes
  createEffect(() => {
    selectedStateId(); // track change
    setSelectedRtoId(undefined); // clear RTO
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!selectedStateId()) {
      console.error(selectedStateId(), "state, not found");
      return;
    }
    if (!selectedRtoId()) {
      console.error(selectedRtoId(), "rto, not found");
      return;
    }
    if (!selectedYearId()) {
      console.error(selectedYearId(), "year, not found");
      return;
    }
    if (vehicleTypes().length <= 0) {
      console.error("data source not found.");
      return;
    }

    console.table({
      state: selectedStateId()!,
      rto: selectedRtoId()!,
      year: selectedYearId()!,
      types: vehicleTypes(),
    });
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
                options={states() || []}
                placeholder={
                  states.loading ? "Loading States..." : "Select a State"
                }
                label="STATE"
                value={selectedStateId}
                setValue={setSelectedStateId}
              />
              <SelectWrapper
                options={rtos() || []}
                placeholder={
                  !selectedStateId()
                    ? "Select State First"
                    : rtos.loading
                      ? "Loading RTOs..."
                      : "Select RTO"
                }
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
      <Show when={!records.loading}>
        <SalesTable records={records() || []} />
      </Show>
    </main>
  );
};

export default App;
