"use client"
import EbooksPage from '@/components/book/BookPage'
import EnhancedMoroccoFooter from '@/components/Footer'
import MoroccoResponsiveNavbar from '@/components/Navbar'


export default function page() {
  return (
    <>
    <MoroccoResponsiveNavbar></MoroccoResponsiveNavbar>
    <EbooksPage></EbooksPage>
    <EnhancedMoroccoFooter></EnhancedMoroccoFooter>
    </>
  )
}
