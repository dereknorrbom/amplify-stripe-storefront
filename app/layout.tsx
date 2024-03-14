"use client";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import useAmplifyConfig from '@/app/hooks/useAmplifyConfig';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useAmplifyConfig();
  return (
    <>
      <html lang="en">
        <body className={`min-h-screen ${inter.className}`}>
          <header className="bg-red-600 text-white p-4 text-xl">
            <Navbar />
          </header>
          <main className="flex flex-grow p-4">
            {children}
          </main>
          <footer className="p-4 text-sm text-black text-center">
          </footer>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
