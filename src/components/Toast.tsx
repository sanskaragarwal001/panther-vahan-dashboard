import { Toast, toaster } from "@kobalte/core/toast";
import { X } from "lucide-solid";
import { Show } from "solid-js";

export const showToast = (props: {
  title: string;
  description?: string;
  variant: "success" | "error";
}) => {
  toaster.show((data) => (
    <Toast
      toastId={data.toastId}
      class="fixed bottom-4 right-4 z-[100] w-80 p-4 rounded-lg shadow-xl border animate-in slide-in-from-right-5"
      classList={{
        "bg-white border-green-100": props.variant === "success",
        "bg-white border-red-100": props.variant === "error",
      }}
    >
      <div class="flex items-start justify-between">
        <div>
          <Toast.Title class="text-sm font-bold text-slate-900">
            {props.title}
          </Toast.Title>
          <Show when={props.description}>
            <Toast.Description class="text-xs text-slate-500 mt-1">
              {props.description}
            </Toast.Description>
          </Show>
        </div>
        <Toast.CloseButton class="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={16} />
        </Toast.CloseButton>
      </div>

      {/* Visual progress bar for the toast duration */}
      <Toast.ProgressTrack class="h-1 w-full bg-slate-100 mt-3 rounded-full overflow-hidden">
        <Toast.ProgressFill
          class="h-full bg-blue-500 transition-all duration-150"
          style={{ width: "var(--kb-toast-progress-fill-width)" }}
        />
      </Toast.ProgressTrack>
    </Toast>
  ));
};
