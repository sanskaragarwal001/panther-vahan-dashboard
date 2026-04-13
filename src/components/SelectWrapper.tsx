import type { Component, Accessor, Setter } from "solid-js";
import { splitProps } from "solid-js";
import { Select } from "@kobalte/core/select";
import { Check, ChevronDown } from "lucide-solid";

export interface SelectOption {
  id: string;
  value: string;
}

interface SelectWrapperProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: Accessor<SelectOption | undefined>;
  setValue: Setter<SelectOption | undefined>;
}

const SelectWrapper: Component<SelectWrapperProps> = (props) => {
  // Use splitProps to keep the rest of the Kobalte functionality intact if needed
  const [local] = splitProps(props, ["label", "placeholder", "options"]);

  function handleChange(val: SelectOption | null) {
    if (val) props.setValue(val);
  }

  return (
    <div class="flex flex-col gap-2 w-full">
      <Select
        required
        value={props.value()}
        onChange={handleChange}
        options={local.options}
        optionValue="id"
        optionTextValue="value"
        placeholder={local.placeholder}
        itemComponent={(props) => (
          <Select.Item
            item={props.item}
            class="flex items-center justify-between px-3 py-2.5 text-sm text-slate-300 cursor-pointer outline-none rounded-lg
                       data-[highlighted]:bg-blue-600/20 data-[highlighted]:text-blue-100 data-[selected]:text-blue-400 transition-all"
          >
            {/* Fix: truncate long values in the dropdown list */}
            <Select.ItemLabel class="truncate mr-2">
              {props.item.rawValue.value}
            </Select.ItemLabel>
            <Select.ItemIndicator>
              <Check size={14} class="text-blue-400 stroke-[3]" />
            </Select.ItemIndicator>
          </Select.Item>
        )}
      >
        <Select.Label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
          {local.label}
        </Select.Label>

        <Select.Trigger
          class="flex items-center justify-between w-full px-4 py-2.5 text-sm bg-[#0B0F1A] border border-slate-800 rounded-xl shadow-inner outline-none
                     hover:border-slate-700 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all group"
        >
          {/* Fix: truncate the selected value in the trigger button */}
          <div class="truncate text-left w-full text-slate-200 font-medium">
            <Select.Value<SelectOption>>
              {(state) =>
                state.selectedOption()?.value || (
                  <span class="text-slate-500">{local.placeholder}</span>
                )
              }
            </Select.Value>
          </div>

          <Select.Icon class="flex items-center ml-2 transition-transform group-aria-expanded:rotate-180">
            <ChevronDown size={16} class="text-slate-500" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content class="z-50 min-w-[var(--kb-select-content-width)] bg-[#111827] border border-slate-800 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <Select.Listbox class="p-1.5 max-h-72 overflow-y-auto focus:outline-none scrollbar-thin scrollbar-thumb-slate-800" />
          </Select.Content>
        </Select.Portal>
      </Select>
    </div>
  );
};

export default SelectWrapper;
