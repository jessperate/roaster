import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const saansFont = localFont({
  src: [
    { path: "./fonts/Saans-Regular.ttf", weight: "400" },
    { path: "./fonts/Saans-Medium.ttf", weight: "500" },
    { path: "./fonts/Saans-Bold.ttf", weight: "700" },
  ],
  variable: "--font-sans",
});

const serrifFont = localFont({
  src: "./fonts/SerrifVF.ttf",
  variable: "--font-serif",
  weight: "100 900",
});

const saansMonoFont = localFont({
  src: "./fonts/SaansMono-Medium.ttf",
  variable: "--font-mono",
  weight: "500",
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
        className={`${saansFont.variable} ${serrifFont.variable} ${saansMonoFont.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
