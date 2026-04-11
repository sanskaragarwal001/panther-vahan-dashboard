import writeExcelFile from "write-excel-file/browser";

import type { SalesRecord } from "../components/SalesTable";

const schema = [
  {
    column: "S no",
    type: Number,
    value: (sale) => sale.sno,
  },
  {
    column: "Maker",
    type: String,
    value: (sale) => sale.maker,
  },
  {
    column: "Jan",
    type: Number,
    value: (sale) => sale.jan,
  },
  {
    column: "Feb",
    type: Number,
    value: (sale) => sale.feb,
    default: 0,
  },
  {
    column: "Mar",
    type: Number,
    value: (sale) => sale.mar,
    default: 0,
  },
  {
    column: "Apr",
    type: Number,
    value: (sale) => sale.apr,
    default: 0,
  },
  {
    column: "May",
    type: Number,
    value: (sale) => sale.may,
    default: 0,
  },
  {
    column: "Jun",
    type: Number,
    value: (sale) => sale.jun,
    default: 0,
  },
  {
    column: "Jul",
    type: Number,
    value: (sale) => sale.jul,
    default: 0,
  },
  {
    column: "Aug",
    type: Number,
    value: (sale) => sale.aug,
    default: 0,
  },
  {
    column: "Sep",
    type: Number,
    value: (sale) => sale.sep,
    default: 0,
  },
  {
    column: "Oct",
    type: Number,
    value: (sale) => sale.oct,
    default: 0,
  },
  {
    column: "Nov",
    type: Number,
    value: (sale) => sale.nov,
    default: 0,
  },
  {
    column: "Dec",
    type: Number,
    value: (sale) => sale.dec,
    default: 0,
  },
  {
    column: "Total",
    type: Number,
    value: (sale) => sale.total,
  },
];

export async function createExcelFileAndSaveIntoDisk(
  sales: SalesRecord[],
  col: Exclude<keyof SalesRecord, "sno" | "maker"> = "total",
) {
  const sortedSales = [...sales].sort((a, b) => b[col] - a[col]);

  await writeExcelFile(sortedSales, {
    schema,
    fileName: "sales-report.xlsx",
  });
}
