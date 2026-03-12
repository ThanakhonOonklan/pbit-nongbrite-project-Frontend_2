import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { HeaderColorProvider } from "@/contexts/HeaderColorContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "P'Bit Nong-Brite",
    template: "%s | P'Bit Nong-Brite",
  },
  description: "เรียนรู้ผ่านเกมสนุกๆ พัฒนาทักษะการคิดและการแก้ปัญหากับ P'Bit และน้องไบร์ท",
  icons: {
    icon: "/icons/icon-Profile/icon_P_Bit.png",
    apple: "/icons/icon-Profile/icon_P_Bit.png",
  },
};


const lineSeedSans = localFont({
  src: [
    {
      path: "../fonts/LINESeedSansTH-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/LINESeedSansTH-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-line-seed-sans",
  display: "swap",
});


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lineSeedSans.variable} h-full`} data-scroll-behavior="smooth">
      <body className={`antialiased ${lineSeedSans.className} h-full`} suppressHydrationWarning>
        <LanguageProvider>
          <HeaderColorProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
            <Toaster position="top-center" />
          </HeaderColorProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}