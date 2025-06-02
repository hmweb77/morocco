import EbooksPage from '@/components/book/BookPage'
import EnhancedMoroccoFooter from '@/components/Footer'
import MoroccoResponsiveNavbar from '@/components/Navbar'
import React from 'react'

export default function page() {
  return (
    <>
    <MoroccoResponsiveNavbar></MoroccoResponsiveNavbar>
    <EbooksPage></EbooksPage>
    <EnhancedMoroccoFooter></EnhancedMoroccoFooter>
    </>
  )
}
