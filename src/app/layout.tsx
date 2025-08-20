import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PolpaNet",
  description: "Created by Elpidio Lunardelli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} antialiased`}>
      <body
        className={`${raleway.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
