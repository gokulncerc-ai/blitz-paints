// Path: frontend/src/components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: ReactNode;
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-navy text-white hover:bg-navy-dark'
      : 'border-2 border-navy text-navy hover:bg-navy hover:text-white';

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
