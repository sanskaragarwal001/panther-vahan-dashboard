import type { Component, Accessor, Setter } from "solid-js";
import { ToggleGroup } from "@kobalte/core/toggle-group";
import { Zap, Truck } from "lucide-solid";

export enum DataSource {
  Erickshaw = "e-rickshaw",
  ThreeWheeler = "three-wheeler",
}

interface VehicleToggleProps {
  value: Accessor<DataSource[]>;
  setValue: Setter<DataSource[]>;
}

const VehicleToggle: Component<VehicleToggleProps> = (props) => {
  return (
    <div class="flex flex-col gap-4">
      <ToggleGroup
        multiple
        value={props.value()}
        onChange={props.setValue}
        class="flex flex-wrap gap-3"
      >
        <ToggleGroup.Item
          value={DataSource.Erickshaw}
          class="group flex items-center gap-3 px-5 py-3 text-sm font-semibold rounded-xl border transition-all duration-200 outline-none
                     /* OFF State */
                     bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800/80

                     /* ON State (Selected) */
                     data-pressed:bg-blue-600/10 data-pressed:border-blue-500 data-pressed:text-blue-400

                     /* Focus State */
                     focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A]"
        >
          <div class="p-1.5 rounded-lg bg-slate-800 group-data-checked:bg-blue-500 group-data-checked:text-white transition-colors">
            <Zap size={16} />
          </div>
          <div class="flex flex-col items-start">
            <span>E-Rickshaw</span>
            <span class="text-[10px] font-normal opacity-60">
              Electric Fleet
            </span>
          </div>
        </ToggleGroup.Item>

        <ToggleGroup.Item
          value={DataSource.ThreeWheeler}
          class="group flex items-center gap-3 px-5 py-3 text-sm font-semibold rounded-xl border transition-all duration-200 outline-none
                     /* OFF State */
                     bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800/80

                     /* ON State (Selected) */
                     data-pressed:bg-blue-600/10 data-pressed:border-blue-500 data-pressed:text-blue-400

                     /* Focus State */
                     focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A]"
        >
          <div class="p-1.5 rounded-lg bg-slate-800 group-data-checked:bg-indigo-500 group-data-checked:text-white transition-colors">
            <Truck size={16} />
          </div>
          <div class="flex flex-col items-start">
            <span>Three-Wheeler</span>
            <span class="text-[10px] font-normal opacity-60">
              Internal Combustion
            </span>
          </div>
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
};

export default VehicleToggle;
