'use client';



import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { ArrowLeft  } from 'lucide-react';

export default function GoBackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button className='bg-transparent text-black ring-2 ring-black hover:bg-black hover:text-white' onClick={handleGoBack}>
      <ArrowLeft /> Go Back
    </Button>
  );
}
