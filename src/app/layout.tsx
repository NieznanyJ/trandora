import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { anton } from "./fonts";
import { cn } from "@/lib/utils";
import Navbar from '@/components/Navbar'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'
import WixClientContextProvider from "@/context/WixContext";
import StoreProvider from "@/context/StoreProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trendora",
  description: "E-commerce clothing store",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={ cn(inter.className, anton.variable, 'min-h-full' )}>
        <WixClientContextProvider>
        <StoreProvider>
        <Navbar />
        <MobileNav className='md:hidden' />
        {children}
        <Toaster />
        <Footer />
        </StoreProvider>
        </WixClientContextProvider>
        </body>
    </html>
  );
}
