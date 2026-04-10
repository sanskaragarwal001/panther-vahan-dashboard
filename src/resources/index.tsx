import type { SelectOption } from "../components/SelectWrapper";
import type { SalesRecord } from "../components/SalesTable";
import { DataSource } from "../components/VehicleToggle";

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

const MOCK_SALES: SalesRecord[] = [
  {
    id: 1,
    maker: "Mahindra & Mahindra Last Mile Mobility Ltd.",
    monthlyData: [450, 520, 610, 480, 500, 550, 600, 620, 580, 590, 610, 650],
  },
  {
    id: 2,
    maker: "Piaggio Vehicles Private Limited International",
    monthlyData: [300, 310, 290, 350, 340, 320, 330, 350, 360, 370, 380, 400],
  },
  {
    id: 3,
    maker: "Saera Electric Auto Private Limited North Division",
    monthlyData: [120, 150, 140, 130, 160, 170, 180, 190, 200, 210, 220, 230],
  },
  {
    id: 4,
    maker: "Tata Motors Ltd.",
    monthlyData: [400, 420, 450, 430, 440, 480, 490, 500, 480, 490, 500, 520],
  },
  {
    id: 5,
    maker: "Toyota Kirloskar Motor India Ltd.",
    monthlyData: [350, 370, 390, 380, 390, 430, 440, 450, 430, 440, 450, 470],
  },
  {
    id: 6,
    maker: "Hyundai Motor India Ltd.",
    monthlyData: [320, 330, 340, 340, 350, 390, 400, 410, 390, 400, 410, 430],
  },
  {
    id: 7,
    maker: "Volkswagen Group India Pvt. Ltd.",
    monthlyData: [380, 390, 400, 390, 400, 440, 450, 460, 440, 450, 460, 480],
  },
  {
    id: 8,
    maker: "General Motors India Pvt. Ltd.",
    monthlyData: [340, 350, 360, 350, 360, 400, 410, 420, 400, 410, 420, 440],
  },
  {
    id: 9,
    maker: "Ford India Private Ltd.",
    monthlyData: [310, 320, 330, 320, 330, 370, 380, 390, 370, 380, 390, 410],
  },
  {
    id: 10,
    maker: "Mahindra & Mahindra Logistics Ltd.",
    monthlyData: [420, 440, 460, 450, 460, 500, 510, 520, 500, 510, 520, 540],
  },
];

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

export const fetchRecords = async (
  source: {
    state: SelectOption;
    rto: SelectOption;
    year: SelectOption;
    types: DataSource[];
  } | null,
) => {
  if (!source) {
    console.error("params are empty");
    return;
  }
  await sleep(2000);
  return MOCK_SALES;
};
