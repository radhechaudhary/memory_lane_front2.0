import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and twMerge for conflict resolution
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default cn;

