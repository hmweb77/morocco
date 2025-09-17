import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Discover Morocco Authentically – Local Guides & Travel Tips ",
  description: "Plan your trip to Morocco like a local. Explore insider travel guides, authentic experiences, expert tips and downloadable eBooks for cities   . Avoid tourist traps, uncover hidden gems, and travel smarter with Morocco Advisor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4L6330RSFD"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4L6330RSFD');
          `}
        </Script>
         {/* Hotjar */}
         <Script id="hotjar-init" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6523094 ,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src='https://static.hotjar.com/c/hotjar-'+h._hjSettings.hjid+'.js?sv='+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document);
          `}
        </Script>
      </body>
    </html>
  );
}
