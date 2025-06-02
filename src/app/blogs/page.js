import BlogsPage from '@/components/blogs/BlogsPage'
import EnhancedMoroccoFooter from '@/components/Footer'
import MoroccoResponsiveNavbar from '@/components/Navbar'
import React from 'react'

export default function page() {
  return (
    <>
    <MoroccoResponsiveNavbar></MoroccoResponsiveNavbar>
    <BlogsPage></BlogsPage>
    <EnhancedMoroccoFooter></EnhancedMoroccoFooter>
    </>
  )
}
