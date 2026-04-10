import type { SelectOption } from "../components/SelectWrapper";
import { DataSource } from "../components/VehicleToggle";

export const fetchStates = async () => {
  const response = await fetch("http://localhost:3000/api/states");
  return await response.json();
};

export const fetchRtos = async (state: SelectOption) => {
  const response = await fetch("http://localhost:3000/api/rtos", {
    method: "POST",
    body: JSON.stringify({ stateId: state.id }),
  });
  return await response.json();
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

  const response = await fetch("http://localhost:3000/api/sales", {
    method: "POST",
    body: JSON.stringify({
      stateId: source.state.id,
      rtoId: source.rto.id,
      yearId: source.year.id,
      includeErickshaw: source.types.includes(DataSource.Erickshaw),
      includeThreeWheeler: source.types.includes(DataSource.ThreeWheeler),
    }),
  });
  return await response.json();
};
