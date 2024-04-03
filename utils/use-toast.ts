import * as Burnt from "burnt";

interface ToastProps {
  title: string;
}

const DEFAULT_TOAST_DURATION = 2;

export function successToast({ title }: ToastProps) {
  return Burnt.toast({
    title: title,
    preset: "done",
    duration: DEFAULT_TOAST_DURATION
  });
}

export function errorToast({ title }: ToastProps) {
  return Burnt.toast({
    title: title,
    preset: "error",
    duration: DEFAULT_TOAST_DURATION
  });
}