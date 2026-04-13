import { createSignal, For } from "solid-js";

import { Dialog } from "@kobalte/core/dialog";
import { Button } from "@kobalte/core/button";
import { X, Download, FileSpreadsheet, FileDown } from "lucide-solid";

import SelectWrapper, { type SelectOption } from "./SelectWrapper";
import { createExcelFileAndSaveIntoDisk } from "../utils";
import type { SalesRecord } from "./SalesTable";

interface DownloadDialogProps {
  fileTitle: string;
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
      createExcelFileAndSaveIntoDisk(props.data, monthValue, props.fileTitle);
      setIsOpen(false);
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button class="flex items-center gap-2 px-5 py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 font-bold rounded-xl border border-emerald-500/20 transition-all active:scale-95 outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-lg shadow-emerald-950/20 group">
          <FileDown
            size={18}
            class="group-hover:translate-y-0.5 transition-transform"
          />
          <span class="text-sm">Export Dataset</span>
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Darkened Overlay with heavy blur */}
        <Dialog.Overlay class="fixed inset-0 z-10 bg-[#020617]/80 backdrop-blur-md animate-in fade-in duration-300" />

        <div class="fixed inset-0 z-20 flex items-center justify-center p-4">
          <Dialog.Content class="w-full max-w-md bg-[#0B0F1A] rounded-2xl shadow-2xl border border-slate-800 p-8 animate-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-emerald-500/10 rounded-lg">
                  <FileSpreadsheet class="text-emerald-500" size={24} />
                </div>
                <Dialog.Title class="text-xl font-bold text-slate-100">
                  Export Data
                </Dialog.Title>
              </div>
              <Dialog.CloseButton class="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                <X size={20} />
              </Dialog.CloseButton>
            </div>

            <Dialog.Description class="text-sm text-slate-400 mb-8 leading-relaxed">
              Generate a regional sales report in XLSX format. Choose a specific
              month to apply localized filtering.
            </Dialog.Description>

            <div class="space-y-8">
              <div class="bg-[#111827] p-4 rounded-xl border border-slate-800/50">
                <SelectWrapper
                  label="Reference Period"
                  options={months}
                  value={selectedMonth}
                  setValue={setSelectedMonth}
                  placeholder="Select export month..."
                />
              </div>

              <div class="flex flex-col gap-3">
                <button
                  onClick={handleDownload}
                  class="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98]"
                >
                  <Download size={18} />
                  Download Excel Report
                </button>

                <Dialog.CloseButton class="w-full py-3 text-sm font-semibold text-slate-500 hover:text-slate-300 transition-colors">
                  Discard Changes
                </Dialog.CloseButton>
              </div>
            </div>

            {/* Subtle Footer Brand */}
            <div class="mt-8 pt-6 border-t border-slate-800/50 flex justify-center">
              <p class="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">
                Panther Vahan Internal System
              </p>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};

export default DownloadSalesDialog;
