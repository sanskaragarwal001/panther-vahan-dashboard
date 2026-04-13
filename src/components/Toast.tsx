import { Toast, toaster } from "@kobalte/core/toast";
import { CircleAlert, CircleCheck, X } from "lucide-solid";
import { Show } from "solid-js";

export const showToast = (props: {
  title: string;
  description?: string;
  variant: "success" | "error";
}) => {
  toaster.show((data) => (
    <Toast
      toastId={data.toastId}
      class="relative group w-80 p-4 rounded-xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-right-5 duration-300"
      classList={{
        /* Success State: Subtle Green Glow */
        "bg-emerald-950/40 border-emerald-500/30 shadow-emerald-900/20":
          props.variant === "success",
        /* Error State: Subtle Red Glow */
        "bg-red-950/40 border-red-500/30 shadow-red-900/20":
          props.variant === "error",
      }}
    >
      <div class="flex items-start gap-3">
        {/* Status Icon */}
        <div class="mt-0.5">
          <Show
            when={props.variant === "success"}
            fallback={<CircleAlert size={18} class="text-red-400" />}
          >
            <CircleCheck size={18} class="text-emerald-400" />
          </Show>
        </div>

        <div class="flex-1">
          <Toast.Title
            class="text-sm font-bold"
            classList={{
              "text-emerald-50": props.variant === "success",
              "text-red-50": props.variant === "error",
            }}
          >
            {props.title}
          </Toast.Title>

          <Show when={props.description}>
            <Toast.Description class="text-xs text-slate-400 mt-1 leading-relaxed">
              {props.description}
            </Toast.Description>
          </Show>
        </div>

        <Toast.CloseButton class="shrink-0 p-1 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
          <X size={14} />
        </Toast.CloseButton>
      </div>

      {/* Modern Progress Bar */}
      <Toast.ProgressTrack class="h-1 w-full bg-black/20 mt-4 rounded-full overflow-hidden">
        <Toast.ProgressFill
          class="h-full transition-all duration-150"
          classList={{
            "bg-emerald-500": props.variant === "success",
            "bg-red-500": props.variant === "error",
          }}
          style={{ width: "var(--kb-toast-progress-fill-width)" }}
        />
      </Toast.ProgressTrack>
    </Toast>
  ));
};
