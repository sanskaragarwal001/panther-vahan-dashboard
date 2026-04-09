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
    <div class="flex flex-col gap-3 p-4">
      <label class="text-sm font-medium text-slate-700">Data Sources</label>

      <ToggleGroup
        multiple
        value={props.value()}
        onChange={props.setValue}
        class="flex gap-2"
      >
        <ToggleGroup.Item
          value={DataSource.Erickshaw}
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 rounded-md transition-all
                 hover:bg-slate-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                 data-[state=on]:bg-blue-50 data-[state=on]:border-blue-600 data-[state=on]:text-blue-700"
        >
          <Zap size={16} />
          E-Rickshaw
        </ToggleGroup.Item>

        <ToggleGroup.Item
          value={DataSource.ThreeWheeler}
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 rounded-md transition-all
                 hover:bg-slate-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                 data-[state=on]:bg-blue-50 data-[state=on]:border-blue-600 data-[state=on]:text-blue-700"
        >
          <Truck size={16} />
          Three-Wheeler
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
};

export default VehicleToggle;
