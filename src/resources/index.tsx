import type { SelectOption } from "../components/SelectWrapper";

const states: SelectOption[] = [
  { id: "j_idt35_1", value: "Uttar Pradesh" },
  { id: "j_idt35_2", value: "Bihar" },
  { id: "j_idt35_3", value: "Rajasthan" },
  { id: "j_idt35_4", value: "Assam" },
  { id: "j_idt35_5", value: "Uttrakhand" },
];

const rtos: Record<string, SelectOption[]> = {
  j_idt35_1: [
    { id: "selectedRto_1", value: "Meerut" },
    { id: "selectedRto_2", value: "Rampur" },
    { id: "selectedRto_3", value: "Patna" },
    { id: "selectedRto_4", value: "Chapra" },
    { id: "selectedRto_5", value: "Jaipur" },
  ],
  j_idt35_2: [
    { id: "selectedRto_1", value: "Ghaziabad" },
    { id: "selectedRto_2", value: "Sharanpur" },
    { id: "selectedRto_3", value: "Hardoi" },
    { id: "selectedRto_4", value: "Bhajanpura" },
    { id: "selectedRto_5", value: "Kashmir" },
  ],
  j_idt35_3: [
    { id: "selectedRto_1", value: "Hamaz" },
    { id: "selectedRto_2", value: "New York" },
    { id: "selectedRto_3", value: "chichago" },
    { id: "selectedRto_4", value: "Himalaya" },
    { id: "selectedRto_5", value: "Everest" },
  ],
  j_idt35_4: [
    { id: "selectedRto_1", value: "Pacific" },
    { id: "selectedRto_2", value: "Atlantic" },
    { id: "selectedRto_3", value: "Indian" },
    { id: "selectedRto_4", value: "Bay of Bengal" },
    { id: "selectedRto_5", value: "Rajasthan" },
  ],
  j_idt35_5: [
    { id: "selectedRto_1", value: "China" },
    { id: "selectedRto_2", value: "korea" },
    { id: "selectedRto_3", value: "America" },
    { id: "selectedRto_4", value: "Britian" },
    { id: "selectedRto_5", value: "India" },
  ],
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchStates = async () => {
  // const reponse = await fetch("http://localhost:3000");
  await sleep(3000);
  return states;
};

export const fetchRtos = async (state: SelectOption) => {
  await sleep(3000);
  return rtos[state.id];
};
