import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://citycarehospital.com'),
  title: {
    default: "CityCare Hospital | Top Medical Center in Pakistan",
    template: "%s | CityCare Hospital",
  },
  description: "CityCare Hospital provides world-class healthcare, emergency services, and expert medical consultations. Your trusted medical center in Medical City, Pakistan.",
  keywords: ["CityCare Hospital", "Best Hospital in Pakistan", "Medical Center", "Emergency Care", "Expert Doctors", "Healthcare Services"],
  authors: [{ name: "CityCare Hospital" }],
  creator: "CityCare Hospital",
  publisher: "CityCare Hospital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "CityCare Hospital | Top Medical Center in Pakistan",
    description: "CityCare Hospital provides world-class healthcare, emergency services, and expert medical consultations.",
    url: "https://citycarehospital.com",
    siteName: "CityCare Hospital",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CityCare Hospital | Top Medical Center in Pakistan",
    description: "World-class healthcare, emergency services, and expert medical consultations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import AppointmentModal from "@/components/forms/AppointmentModal";
import JsonLd from "@/components/seo/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-800">
        <JsonLd 
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "CityCare Hospital",
            "url": "https://citycarehospital.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://citycarehospital.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }}
        />
        <JsonLd 
          data={{
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "CityCare Hospital",
            "url": "https://citycarehospital.com",
            "logo": "https://citycarehospital.com/images/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+92-300-1234567",
              "contactType": "Emergency and Appointments",
              "areaServed": "PK",
              "availableLanguage": ["English", "Urdu"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123, Health Street",
              "addressLocality": "Medical City",
              "addressCountry": "PK"
            }
          }}
        />
        {children}
        <AppointmentModal />
      </body>
    </html>
  );
}
