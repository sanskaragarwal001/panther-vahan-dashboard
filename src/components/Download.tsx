import { createSignal, For } from "solid-js";

import { Dialog } from "@kobalte/core/dialog";
import { Button } from "@kobalte/core/button";
import { X, Download, FileSpreadsheet } from "lucide-solid";

import SelectWrapper, { type SelectOption } from "./SelectWrapper";
import { createExcelFileAndSaveIntoDisk } from "../utils";
import type { SalesRecord } from "./SalesTable";

interface DownloadDialogProps {
  data: SalesRecord[];
}

const months: SelectOption[] = [
  { value: "January", id: "jan" },
  { value: "February", id: "feb" },
  { value: "March", id: "mar" },
  { value: "April", id: "apr" },
  { value: "May", id: "may" },
  { value: "June", id: "jun" },
  { value: "July", id: "jul" },
  { value: "August", id: "aug" },
  { value: "September", id: "sep" },
  { value: "October", id: "oct" },
  { value: "November", id: "nov" },
  { value: "December", id: "dec" },
  { value: "Total", id: "total" },
];

const DownloadSalesDialog = (props: DownloadDialogProps) => {
  const [selectedMonth, setSelectedMonth] = createSignal<
    SelectOption | undefined
  >(months[0]);
  const [isOpen, setIsOpen] = createSignal(false);

  const handleDownload = () => {
    const monthValue = selectedMonth()?.id || "total";

    // Trigger your provided function
    try {
      createExcelFileAndSaveIntoDisk(props.data, monthValue);
      setIsOpen(false);
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button class="flex items-center gap-2 px-5 py-2.5 bg-[#1D6F42] hover:bg-[#155231] text-white font-semibold rounded-lg shadow-md shadow-green-100 transition-all active:scale-95 outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 border border-green-700/20">
          <FileSpreadsheet size={18} class="text-green-50" />
          <span>Export Excel</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm animate-in fade-in" />
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Content class="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-6 animate-in zoom-in-95">
            <div class="flex items-center justify-between mb-6">
              <Dialog.Title class="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet class="text-green-600" size={20} />
                Export Sales Data
              </Dialog.Title>
              <Dialog.CloseButton class="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </Dialog.CloseButton>
            </div>

            <Dialog.Description class="text-sm text-slate-500 mb-6">
              Select the specific month to filter and sort the records for the
              Excel export.
            </Dialog.Description>

            <div class="space-y-6">
              <SelectWrapper
                label="Select Month"
                options={months}
                value={selectedMonth}
                setValue={setSelectedMonth}
                placeholder="Choose month..."
              />

              <div class="flex justify-end gap-3 pt-2">
                <Dialog.CloseButton class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  Cancel
                </Dialog.CloseButton>
                <button
                  onClick={handleDownload}
                  class="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-md transition-all active:scale-95"
                >
                  <Download size={16} />
                  Download Excel
                </button>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};

export default DownloadSalesDialog;
