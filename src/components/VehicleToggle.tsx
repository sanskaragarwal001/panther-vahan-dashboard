import { type Component, createSignal } from "solid-js";
import { ToggleGroup } from "@kobalte/core/toggle-group";
import { Zap, Truck } from "lucide-solid";

const VehicleToggle: Component = () => {
  const [value, setValue] = createSignal<string[]>(["e-rickshaw"]);

  return (
    <div class="flex flex-col gap-3 p-4">
      <label class="text-sm font-medium text-slate-700">Data Sources</label>

      <ToggleGroup
        multiple
        value={value()}
        onChange={setValue}
        class="flex gap-2"
      >
        <ToggleGroup.Item
          value="e-rickshaw"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 rounded-md transition-all
                 hover:bg-slate-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                 data-[state=on]:bg-blue-50 data-[state=on]:border-blue-600 data-[state=on]:text-blue-700"
        >
          <Zap size={16} />
          E-Rickshaw
        </ToggleGroup.Item>

        <ToggleGroup.Item
          value="three-wheeler"
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
