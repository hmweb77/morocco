'use client';

import dynamic from 'next/dynamic';
import EnhancedMoroccoFooter from '@/components/Footer';
import MoroccoResponsiveNavbar from '@/components/Navbar';

// ✅ Dynamically import BlogsPage with SSR disabled
const BlogsPage = dynamic(() => import('@/components/blogs/BlogsPage'), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <MoroccoResponsiveNavbar />
      <BlogsPage />
      <EnhancedMoroccoFooter />
    </>
  );
}
