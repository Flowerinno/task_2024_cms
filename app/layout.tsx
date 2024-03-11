// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Header from "@/components/header/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "News CMS";
const description =
  "Get the latest news from around the world. News CMS is a news feed app that allows you to read the latest news from around the world.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  creator: "Aleksandr Kononov",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <Suspense fallback="Loading...">
          <Header />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
