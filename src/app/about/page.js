import AboutPage from '@/components/about/AboutPage'
import EnhancedMoroccoFooter from '@/components/Footer'
import MoroccoResponsiveNavbar from '@/components/Navbar'
import React from 'react'

export default function page() {
  return (
   <>
   <MoroccoResponsiveNavbar></MoroccoResponsiveNavbar>
   <AboutPage></AboutPage>
   <EnhancedMoroccoFooter></EnhancedMoroccoFooter>
   </>
  )
}
