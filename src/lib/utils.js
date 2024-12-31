import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges class names using clsx and tailwind-merge
 */
const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export { cn };
