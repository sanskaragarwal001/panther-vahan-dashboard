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
    <div class="flex flex-col gap-3 p-2">
      <label class="text-sm font-medium text-slate-700">Data Sources</label>

      <ToggleGroup
        multiple
        value={props.value()}
        onChange={props.setValue}
        class="flex gap-2"
      >
        <ToggleGroup.Item
          value={DataSource.Erickshaw}
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md transition-all outline-none
                 /* OFF State: Subtle border and gray text */
                 border-slate-300 text-slate-600 bg-white hover:bg-slate-50

                 /* ON State: Solid black background and white text */
                 data-pressed:bg-slate-900 data-pressed:border-slate-900 data-pressed:text-white

                 /* Focus Ring for accessibility */
                 focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Zap size={16} class="transition-colors" />
          E-Rickshaw
        </ToggleGroup.Item>

        <ToggleGroup.Item
          value={DataSource.ThreeWheeler}
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md transition-all outline-none
                 /* OFF State: Subtle border and gray text */
                 border-slate-300 text-slate-600 bg-white hover:bg-slate-50

                 /* ON State: Solid black background and white text */
                 data-pressed:bg-slate-900 data-pressed:border-slate-900 data-pressed:text-white

                 /* Focus Ring for accessibility */
                 focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Truck size={16} />
          Three-Wheeler
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
};

export default VehicleToggle;
