import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./Providers";
import "./globals.css";
import { Rubik } from "next/font/google";
import { Suspense } from "react";

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer";
import Spinner from "./loading";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rubik.variable} font-sans`}>
      <body className="flex flex-col min-h-screen">
        <Suspense fallback={<Spinner />}>
          <ClerkProvider>
            <Providers>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </Providers>
          </ClerkProvider>
        </Suspense>
      </body>
    </html>
  );
}
