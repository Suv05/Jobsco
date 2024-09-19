import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { Rubik } from "next/font/google";
import { Suspense } from "react";

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
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  return (
    <html lang="en" className={`${rubik.variable} font-sans`}>
      <body>
        <Suspense fallback={<Spinner />}>
          <ClerkProvider>
            <Providers>
              <div className="flex flex-col min-h-screen">
                <Header user={userId} />
                <main className="flex-grow">{children}</main>
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
