import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Function class name
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
