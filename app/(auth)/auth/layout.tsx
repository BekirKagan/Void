import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../../globals.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VOID Authentication",
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
        <div className="w-screen h-screen flex">
          <div className="flex-1 flex items-center justify-center bg-neutral-900 text-blue-chill-50">
            <h1 className="text-2xl font-semibold absolute left-8 top-8">VOID</h1>
            <main className="w-[420px] h-[450px]">
              {children}
            </main>
          </div>
          <div className="md:flex-1 md:bg-blue-chill-500">
            <ToastContainer theme="dark" />
          </div>
        </div>
      </body>
    </html>
  );
}
