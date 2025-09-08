"use client"

import dynamic from 'next/dynamic';
import MoroccoWebsiteFooter from "@/components/Footer";
import LatestBlogSection from "@/components/home/Blogs";
import MoroccoEbookSection from "@/components/home/CTA";
import TopExperiencesSection from "@/components/home/Experiences";
import EnhancedMoroccoHeroSection from "@/components/home/Hero";
import PremiumEbooksSection from "@/components/home/SellEbook";
import TravelersTestimonialsSection from "@/components/home/Testimonials";
import MoroccoResponsiveNavbar from "@/components/Navbar";


// 🔁 Dynamic import to prevent SSR crash from Leaflet in the map component
const InteractiveMoroccoMap = dynamic(
  () => import('@/components/home/InteractiveMap'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <MoroccoResponsiveNavbar />
      <EnhancedMoroccoHeroSection />
      <TopExperiencesSection />
      <InteractiveMoroccoMap />
      <MoroccoEbookSection />
      <PremiumEbooksSection />
      <TravelersTestimonialsSection />
      <LatestBlogSection />
      <MoroccoWebsiteFooter />
    </>
  );
}
