import { Inter } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
// components 
import InstallBootstrap from "@/components/bootstrap/InstallBootstrap";
import Navigationbar from "@/components/navbar/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Pacific Ocean Portal | Library",
  description: "Developed by Anuj",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navigationbar />
        {children}
        {/* bootstrap  */}
        <InstallBootstrap />
      </body>
    </html>
  );
}
