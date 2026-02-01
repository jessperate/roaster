import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Content Roaster | Is Your Content Premium or Pure Slop?",
  description: "Get your content roasted with brutal E-E-A-T analysis. Find out if your blog post is premium grade or certified AI slop.",
  openGraph: {
    title: "Content Roaster | Is Your Content Premium or Pure Slop?",
    description: "Get your content roasted with brutal E-E-A-T analysis. Find out if your blog post is premium grade or certified AI slop.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        {children}
      </body>
    </html>
  );
}
