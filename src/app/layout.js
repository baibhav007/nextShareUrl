import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/loyaltty.png" />
        {/* Static Open Graph Metadata */}
        <meta property="og:title" content="Welcome to Next Share URL BY BAIBHAV" />
        <meta property="og:description" content="BAIBHAV Explore amazing deals and offers!" />
        <meta property="og:image" content="https://next-share-url.vercel.app/loyaltty.png" />
        <meta property="og:url" content="https://next-share-url.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Welcome to Next Share URL" />
        <meta name="twitter:description" content="Explore amazing deals and offers!" />
        <meta name="twitter:image" content="https://next-share-url.vercel.app/loyaltty.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
