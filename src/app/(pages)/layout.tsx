import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/general/(themes)/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/general/(common)/footer";
import { ClerkProvider } from "@clerk/nextjs";
import APPNavBar from "@/components/general/(landing)/(navbar)/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Euro Enterprises",
  description: "Premium Car Rental & Luxury Transportation",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col relative overflow-x-hidden bg-background">
        <ClerkProvider>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <TooltipProvider>
            {/* Main Content */}
            <main className="flex-1 relative z-10">
              <APPNavBar/>
              {children}
            </main>

            <Footer />
          </TooltipProvider>
        </ThemeProvider>
          </ClerkProvider>
      </body>
    </html>
  );
}