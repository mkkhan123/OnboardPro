"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) { 
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (onboardingComplete !== 'true') {
      router.push('/onboard/candidate');
    } else {
      setIsAllowed(true);
    }
  }, [router]);

  // Render a loading state or null while checking, then the children
  return isAllowed ? <>{children}</> : (
    <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Verifying onboarding status...</p>
    </div>
  );
} 