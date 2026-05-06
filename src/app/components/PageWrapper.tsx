import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`relative max-w-md mx-auto bg-[#0a0a0a] min-h-screen shadow-2xl ${className}`}>
      {children}
    </div>
  );
}
