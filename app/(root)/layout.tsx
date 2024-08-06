import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Navbar from "@/components/Navbar"
import MobileNavBar from "@/components/MobileNavbar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VOID",
  description: "Jump into the VOID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen bg-neutral-800 text-neutral-100">
          <Navbar />
          <main>
            {children}
          </main>
          <MobileNavBar />
        </div>
      </body>
    </html>
  );
}
