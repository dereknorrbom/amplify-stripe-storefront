import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

import { Amplify } from 'aws-amplify';
import config from '../amplifyconfiguration.json';
Amplify.configure(config, { ssr: true });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Storefront App",
  description: "A modern storefront built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const title = metadata.title?.toString() || ""; // Convert metadata.title to string and provide a default value
  const description = metadata.description || ""; // Provide a default value for metadata.description

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
}