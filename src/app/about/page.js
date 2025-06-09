"use client"
import AboutPage from '@/components/about/AboutPage'
import EnhancedMoroccoFooter from '@/components/Footer'
import MoroccoResponsiveNavbar from '@/components/Navbar'


export default function page() {
  return (
   <>
   <MoroccoResponsiveNavbar></MoroccoResponsiveNavbar>
   <AboutPage></AboutPage>
   <EnhancedMoroccoFooter></EnhancedMoroccoFooter>
   </>
  )
}
