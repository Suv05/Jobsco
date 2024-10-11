import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { Rubik } from "next/font/google";
import "./globals.css";

import Providers from "./Providers";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer";
import Spinner from "./loading";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

async function RootLayout({ children }) {
  const { userId } = auth();

  return (
    <html lang="en" className={`${rubik.variable} font-sans`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AI-powered job search platform." />

        {/* Open Graph / Twitter SEO Tags */}
        <meta property="og:title" content="Jobsco - AI-Powered Job Search Platform" />
        <meta
          property="og:description"
          content="Discover your dream job with Jobsco, an AI-powered job platform offering personalized job recommendations and AI chat assistance."
        />
        <meta property="og:image" content="/jobsco.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jobsco - AI-Powered Job Search Platform" />
        <meta
          name="twitter:description"
          content="Jobsco provides personalized job recommendations and AI chat assistance."
        />
        <meta name="twitter:image" content="/jobsco.png" />
      </head>

      <body>
        <Suspense fallback={<Spinner />}>
          <ClerkProvider>
            <Providers>
              <div className="flex flex-col min-h-screen">
                <Header user={userId} />
                <main className="flex-grow bg-[#323232]">{children}</main>
                <Footer />
              </div>
            </Providers>
          </ClerkProvider>
        </Suspense>
      </body>
    </html>
  );
}

export default RootLayout;
