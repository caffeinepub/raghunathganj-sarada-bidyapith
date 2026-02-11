import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ErrorSectionProps {
  title?: string;
  message?: string;
}

export default function ErrorSection({ 
  title = 'Error Loading Content', 
  message = 'There was a problem loading this content. Please try again later.' 
}: ErrorSectionProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
