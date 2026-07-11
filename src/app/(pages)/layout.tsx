import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/general/(themes)/theme-provider";
import GradientDotMesh from "@/components/pixel-perfect/gradient-dot-mesh";
import Footer from "@/components/general/(common)/footer";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Euro Enterprises",
  description: "Luxury Transportation",
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
      <body className="min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Background Pattern - Only once */}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main Content */}
          <main className="flex-1 relative z-10">
            <TooltipProvider>
            {children}

            </TooltipProvider>
          </main>
        </ThemeProvider>
        <Footer/>
      </body>
    </html>
  );
}