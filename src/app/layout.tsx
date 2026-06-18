import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CityCare Hospital",
  description: "Compassionate Care for a Healthier Life",
};

import AppointmentModal from "@/components/forms/AppointmentModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-800">
        {children}
        <AppointmentModal />
      </body>
    </html>
  );
}
