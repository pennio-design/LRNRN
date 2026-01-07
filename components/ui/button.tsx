import React from 'react';
import { cn } from '../../lib/utils/cn.ts';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  disabled,
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-slate-800 shadow-lg shadow-primary/10',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-amber-600',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    outline: 'bg-transparent border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary',
  };

  const sizes = {
    sm: 'px-12 py-4 text-xs',
    md: 'px-24 py-12 text-sm',
    lg: 'px-32 py-16 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="h-20 w-20 animate-spin rounded-full border-2 border-current border-t-transparent mr-8" />
      ) : null}
      {children}
    </button>
  );
};