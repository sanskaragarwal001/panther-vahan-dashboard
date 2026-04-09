import { Component, splitProps } from "solid-js";
import { Select } from "@kobalte/core/select";
import { Check, ChevronsUpDown } from "lucide-solid";

export interface SelectOption {
  id: string;
  value: string;
}

interface SelectWrapperProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
}

const SelectWrapper: Component<SelectWrapperProps> = (props) => {
  // Use splitProps to keep the rest of the Kobalte functionality intact if needed
  const [local] = splitProps(props, ["label", "placeholder", "options"]);

  return (
    <div class="flex flex-col gap-2 w-full max-w-[240px]">
      <Select
        options={local.options}
        optionValue="id"
        optionTextValue="value"
        placeholder={local.placeholder}
        itemComponent={(props) => (
          <Select.Item
            item={props.item}
            class="flex items-center justify-between px-3 py-2 text-sm text-slate-700 cursor-default outline-none rounded-sm data-[highlighted]:bg-slate-100 data-[selected]:text-blue-600 transition-colors"
          >
            <Select.ItemLabel>{props.item.rawValue.value}</Select.ItemLabel>
            <Select.ItemIndicator>
              <Check size={16} class="text-blue-600" />
            </Select.ItemIndicator>
          </Select.Item>
        )}
      >
        <Select.Label class="text-sm font-medium text-slate-700">
          {local.label}
        </Select.Label>

        <Select.Trigger class="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
          <Select.Value<SelectOption>>
            {(state) => state.selectedOption().value}
          </Select.Value>
          <Select.Icon class="flex items-center">
            <ChevronsUpDown size={16} class="text-slate-400" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content class="z-50 min-w-[var(--kb-select-content-width)] bg-white border border-slate-200 rounded-md shadow-lg animate-in fade-in zoom-in-95 duration-100">
            <Select.Listbox class="p-1 max-h-60 overflow-y-auto focus:outline-none" />
          </Select.Content>
        </Select.Portal>
      </Select>
    </div>
  );
};

export default SelectWrapper;
