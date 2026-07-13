'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  label?: string;
  fallbackUrl?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function BackButton({
  label = 'Back',
  fallbackUrl = '/',
  className = '',
  variant = 'ghost',
  size = 'sm',
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBack}
      className={`flex items-center gap-2 hover:bg- ${className}`}
    >
      <ArrowLeft className="h-5 w-5" />
      {label && <span className="font-medium">{label}</span>}
    </Button>
  );
}