import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { Button } from "@kobalte/core/button";
import { Search } from "lucide-solid";

import SelectWrapper, { type SelectOption } from "./components/SelectWrapper";
import VehicleToggle, { DataSource } from "./components/VehicleToggle";
import SalesTable from "./components/SalesTable";

const states: SelectOption[] = [
  { id: "j_idt35_1", value: "Uttar Pradesh" },
  { id: "j_idt35_2", value: "Bihar" },
  { id: "j_idt35_3", value: "Rajasthan" },
  { id: "j_idt35_4", value: "Assam" },
  { id: "j_idt35_5", value: "Uttrakhand" },
];

const rtos: SelectOption[] = [
  { id: "selectedRto_1", value: "Meerut" },
  { id: "selectedRto_2", value: "Rampur" },
  { id: "selectedRto_3", value: "Patna" },
  { id: "selectedRto_4", value: "Chapra" },
  { id: "selectedRto_5", value: "Jaipur" },
];

const years: SelectOption[] = [
  { id: "selectedYear_1", value: "2026" },
  { id: "selectedYear_2", value: "2025" },
  { id: "selectedYear_3", value: "2024" },
  { id: "selectedYear_4", value: "2023" },
  { id: "selectedYear_5", value: "2022" },
];

const App: Component = () => {
  const [state, setState] = createSignal(states[0]);
  const [rto, setRto] = createSignal(rtos[0]);
  const [year, setYear] = createSignal(years[0]);
  const [value, setValue] = createSignal<DataSource[]>([DataSource.Erickshaw]);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log("Fetching vehicle data...", state(), rto(), year(), value());
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
                options={states}
                placeholder="Select a State"
                label="STATE"
                value={state}
                setValue={setState}
              />
              <SelectWrapper
                options={rtos}
                placeholder="Select a RTO"
                label="RTO"
                value={rto}
                setValue={setRto}
              />
              <SelectWrapper
                options={years}
                placeholder="Select a Year"
                label="YEAR"
                value={year}
                setValue={setYear}
              />
            </div>

            <hr class="border-slate-100" />

            {/* Toggle Section */}
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Vehicle Categories
              </h3>
              <VehicleToggle value={value} setValue={setValue} />
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
      <SalesTable />
    </main>
  );
};

export default App;
