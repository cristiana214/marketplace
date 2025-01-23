/* eslint-disable import/no-extraneous-dependencies */
import "@/globals.css";
import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";

import ReactQueryProvider from "@/lib/providers/react-query-providers";
import { NextAuthProvider } from "@/lib/providers/session-providers";
import Script from "next/script";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/logo-agri.ico",
    shortcut: "/logo-agri.ico",
    apple: "/logo-agri.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <Script
        id="analytics1"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-YGPSYK24EX"
      />
      <Script
        id="analytics2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-YGPSYK24EX');
              `,
        }}
      />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <NextAuthProvider>
              <Toaster position="bottom-center" reverseOrder={false} />
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
              </div>
            </NextAuthProvider>
          </ReactQueryProvider>
          <TailwindIndicator />
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
