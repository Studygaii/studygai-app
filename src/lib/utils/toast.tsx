import { toast } from "react-toastify";
import { axiosError } from "./error";

export function toastSuccess(text: string) {
  toast.success(text, {
    position: "top-right",
    draggable: true,
    theme: "colored",
    closeOnClick: true,
  });
}

export function toastWarn(text: string) {
  toast.warn(text, {
    position: "top-right",
    draggable: true,
    theme: "colored",
    closeOnClick: true,
  });
}

export function toastError(text: string) {
  toast.error(text, {
    position: "top-right",
    draggable: true,
    theme: "colored",
    closeOnClick: true,
  });
}

export function axiosErrorToast(error: any) {
  toast.error(axiosError(error), {
    position: "top-right",
    draggable: true,
    theme: "colored",
    closeOnClick: true,
  });
}
