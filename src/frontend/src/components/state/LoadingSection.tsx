import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSectionProps {
  count?: number;
  className?: string;
}

export default function LoadingSection({ count = 3, className = '' }: LoadingSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}
