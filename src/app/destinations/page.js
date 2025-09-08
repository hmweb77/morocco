

"use client"
import DestinationsComingSoon from "@/components/DestinationsComingSoon"
import EnhancedMoroccoFooter from '@/components/Footer'
import MoroccoResponsiveNavbar from '@/components/Navbar'


export default function page() {
  return (
   <>
     <MoroccoResponsiveNavbar></MoroccoResponsiveNavbar>
   <DestinationsComingSoon></DestinationsComingSoon>
   <EnhancedMoroccoFooter></EnhancedMoroccoFooter>
   </>
  )
}