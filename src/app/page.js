import MoroccoWebsiteFooter from "@/components/Footer";
import LatestBlogSection from "@/components/home/Blogs";
import MoroccoEbookSection from "@/components/home/CTA";
import TopExperiencesSection from "@/components/home/Experiences";
import MoroccoHeroSection from "@/components/home/Hero";
import InteractiveMoroccoMap from "@/components/home/InteractiveMap";
import PremiumEbooksSection from "@/components/home/SellEbook";
import TravelersTestimonialsSection from "@/components/home/Testimonials";
import MoroccoResponsiveNavbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <MoroccoResponsiveNavbar></MoroccoResponsiveNavbar>
   <MoroccoHeroSection></MoroccoHeroSection>
   <TopExperiencesSection></TopExperiencesSection>
   <InteractiveMoroccoMap></InteractiveMoroccoMap>
   <MoroccoEbookSection></MoroccoEbookSection>
   <PremiumEbooksSection></PremiumEbooksSection>
   <TravelersTestimonialsSection></TravelersTestimonialsSection>
   <LatestBlogSection></LatestBlogSection>
   <MoroccoWebsiteFooter></MoroccoWebsiteFooter>
   </>
  );
}
