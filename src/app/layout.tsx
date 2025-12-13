import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { HeaderColorProvider } from "@/contexts/HeaderColorContext";

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
    <html lang="en" suppressHydrationWarning className={lineSeedSans.variable} data-scroll-behavior="smooth">
      <body className={`antialiased ${lineSeedSans.className}`} suppressHydrationWarning>
        <HeaderColorProvider>
          {children}
        </HeaderColorProvider>
      </body>
    </html>
  );
}