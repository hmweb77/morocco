'use client'; // 👈 Add this line to make it a Client Component

import dynamic from 'next/dynamic';
import EnhancedMoroccoFooter from '@/components/Footer';
import MoroccoResponsiveNavbar from '@/components/Navbar';

// ✅ Dynamic import with SSR disabled
const ExperiencesPage = dynamic(() => import('@/components/experiences/ExperiencesComp'), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <MoroccoResponsiveNavbar />
      <ExperiencesPage />
      <EnhancedMoroccoFooter />
    </>
  );
}
