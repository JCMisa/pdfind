import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
  title: "PDFind",
  description: "Simplifying PDF Note-Taking with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          logoImageUrl: "/logo.svg",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorText: "#DEF7B5",
          colorPrimary: "#ffffff",
          colorBackground: "#252525",
          colorInputBackground: "#1e1e1e",
          colorInputText: "#DEF7B5",
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
