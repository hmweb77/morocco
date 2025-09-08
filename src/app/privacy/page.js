
"use client"
import PrivacyPolicy from '@/components/PivacyComp'
import EnhancedMoroccoFooter from '@/components/Footer'
import MoroccoResponsiveNavbar from '@/components/Navbar'
import TermsOfService from '@/components/TermsComp'


export default function page() {
  return (
   <>
     <MoroccoResponsiveNavbar></MoroccoResponsiveNavbar>
   <PrivacyPolicy></PrivacyPolicy>
   <TermsOfService></TermsOfService>
   <EnhancedMoroccoFooter></EnhancedMoroccoFooter>
   </>
  )
}