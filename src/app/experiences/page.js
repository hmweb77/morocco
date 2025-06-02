import ExperiencesPage from '@/components/experiences/ExperiencesComp'
import EnhancedMoroccoFooter from '@/components/Footer'
import MoroccoResponsiveNavbar from '@/components/Navbar'
import React from 'react'

export default function page() {
  return (
    <>
    <MoroccoResponsiveNavbar></MoroccoResponsiveNavbar>
    <ExperiencesPage></ExperiencesPage>
   <EnhancedMoroccoFooter></EnhancedMoroccoFooter>
    </>
  )
}
