import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * STRATEGIC: Utility for clean class management.
 * Combines clsx for conditional logic and tailwind-merge to resolve style conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}