"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Scale, 
  FileText, 
  Car, 
  ShoppingCart, 
  SearchCheck, 
  CreditCard, 
  ShieldAlert, 
  UserX, 
  Gavel, 
  RefreshCw, 
  HelpCircle,
  Users,
  Ban,
  AlertTriangle,
  HandCoins,
  ChevronRight
} from "lucide-react";

const sidebarItems = [
  { icon: FileText, label: "1. Agreement to Terms" },
  { icon: Car, label: "2. Our Services" },
  { icon: Car, label: "3. Car Rental Terms" },
  { icon: ShoppingCart, label: "4. Vehicle Purchase Terms" },
  { icon: SearchCheck, label: "5. Vehicle Inspection Terms" },
  { icon: Users, label: "6. User Accounts" },
  { icon: CreditCard, label: "7. Payments & Refunds" },
  { icon: Ban, label: "8. Prohibited Activities" },
  { icon: ShieldAlert, label: "9. Limitation of Liability" },
  { icon: AlertTriangle, label: "10. Warranty Disclaimer" },
  { icon: HandCoins, label: "11. Indemnification" },
  { icon: UserX, label: "12. Termination" },
  { icon: Gavel, label: "13. Governing Law" },
  { icon: Scale, label: "14. Dispute Resolution" },
  { icon: RefreshCw, label: "15. Changes to These Terms" },
  { icon: HelpCircle, label: "16. Contact Us" },
];

export default function TermsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header Skeleton */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-7 w-7 md:h-8 md:w-8 rounded-md" />
            <Skeleton className="h-5 w-36 rounded-full" />
          </div>
          <Skeleton className="h-9 md:h-10 w-3/4 md:w-1/2 rounded-lg mb-3 md:mb-4" />
          <Skeleton className="h-5 w-full md:w-2/3 rounded-lg" />
          <Skeleton className="h-5 w-5/6 md:w-1/2 rounded-lg mt-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar Skeleton - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <Card className="border shadow-sm">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                  <ScrollArea className="h-[calc(100vh-260px)]">
                    <nav className="space-y-0.5">
                      {sidebarItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-2 px-2 py-1.5 rounded-md"
                          >
                            <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground/40" />
                            <Skeleton className="h-3 w-full rounded" />
                          </div>
                        );
                      })}
                    </nav>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Mobile TOC Skeleton */}
          <div className="lg:hidden col-span-1 mb-2">
            <Card className="border shadow-sm">
              <CardContent className="p-3">
                <ScrollArea className="h-48">
                  <nav className="space-y-0.5">
                    {sidebarItems.slice(0, 8).map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="flex items-start gap-2 px-2 py-1.5">
                          <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground/30" />
                          <Skeleton className="h-3 w-full rounded" />
                        </div>
                      );
                    })}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Skeleton */}
          <main className="lg:col-span-3 space-y-8 md:space-y-10">
            
            {/* Intro Section */}
            <section className="space-y-4">
              <Skeleton className="h-5 w-full rounded-lg" />
              <Skeleton className="h-5 w-11/12 rounded-lg" />
              <Skeleton className="h-5 w-4/5 rounded-lg" />
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 md:p-4 mt-4">
                <Skeleton className="h-4 w-full rounded mb-2" />
                <Skeleton className="h-4 w-5/6 rounded" />
              </div>
            </section>

            <Separator />

            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                <Skeleton className="h-7 md:h-8 w-48 rounded-lg" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
              </div>
            </section>

            <Separator />

            {/* Section 2 - Services Cards */}
            <section>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                <Skeleton className="h-7 md:h-8 w-40 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-3/4 rounded mb-4 md:mb-5" />
              
              <div className="grid gap-3 md:gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border shadow-sm">
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-5 w-5 rounded mt-0.5 shrink-0" />
                        <div className="w-full space-y-2">
                          <Skeleton className="h-4 w-1/3 rounded" />
                          <Skeleton className="h-3 w-full rounded" />
                          <Skeleton className="h-3 w-5/6 rounded" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-muted/50 border rounded-lg p-3 md:p-4 mt-4">
                <Skeleton className="h-4 w-full rounded mb-2" />
                <Skeleton className="h-4 w-5/6 rounded" />
              </div>
            </section>

            <Separator />

            {/* Section 3 - Rental Terms */}
            <section>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                <Skeleton className="h-7 md:h-8 w-48 rounded-lg" />
              </div>
              
              <div className="space-y-4 md:space-y-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-48 rounded mb-2 md:mb-3" />
                    <Skeleton className="h-3 w-full rounded mb-1" />
                    <Skeleton className="h-3 w-11/12 rounded" />
                    {i === 1 && (
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {[1, 2, 3, 4, 5, 6].map((j) => (
                          <div key={j} className="flex items-start gap-2 bg-muted/50 px-3 py-2 rounded-md">
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
                            <Skeleton className="h-3 w-3/4 rounded" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Section 4 - Sales */}
            <section>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                <Skeleton className="h-7 md:h-8 w-56 rounded-lg" />
              </div>
              
              <div className="space-y-4 md:space-y-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-48 rounded mb-2 md:mb-3" />
                    <Skeleton className="h-3 w-full rounded mb-1" />
                    <Skeleton className="h-3 w-11/12 rounded" />
                  </div>
                ))}
                
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 md:p-4">
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 rounded-full mt-0.5 shrink-0" />
                    <div className="w-full space-y-1">
                      <Skeleton className="h-3 w-full rounded" />
                      <Skeleton className="h-3 w-5/6 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 5 - Inspection */}
            <section>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                <Skeleton className="h-7 md:h-8 w-64 rounded-lg" />
              </div>
              
              <div className="space-y-4 md:space-y-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-48 rounded mb-2 md:mb-3" />
                    <Skeleton className="h-3 w-full rounded mb-1" />
                    <Skeleton className="h-3 w-11/12 rounded" />
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Section 6-7 condensed */}
            {[1, 2].map((section) => (
              <React.Fragment key={section}>
                <section>
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                    <Skeleton className="h-7 md:h-8 w-48 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-11/12 rounded" />
                    <Skeleton className="h-4 w-4/5 rounded" />
                  </div>
                  <div className="bg-muted/50 border rounded-lg p-3 md:p-4 mt-3">
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-5/6 rounded mt-1" />
                  </div>
                </section>
                <Separator />
              </React.Fragment>
            ))}

            {/* Section 8 - Prohibited */}
            <section>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                <Skeleton className="h-7 md:h-8 w-48 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-3/4 rounded mb-3 md:mb-4" />
              
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex items-start gap-2 md:gap-3 bg-red-500/5 border border-red-500/10 px-3 py-2 md:px-4 md:py-3 rounded-md">
                    <Skeleton className="h-4 w-4 rounded-full mt-0.5 shrink-0" />
                    <Skeleton className="h-3 w-full rounded" />
                  </div>
                ))}
              </div>
              
              <div className="bg-muted/50 border rounded-lg p-3 md:p-4 mt-4">
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-5/6 rounded mt-1" />
              </div>
            </section>

            <Separator />

            {/* Section 9-11 */}
            {[1, 2, 3].map((section) => (
              <React.Fragment key={section}>
                <section>
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                    <Skeleton className="h-7 md:h-8 w-56 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-11/12 rounded" />
                    <Skeleton className="h-4 w-4/5 rounded" />
                  </div>
                  {section === 1 && (
                    <ul className="mt-3 space-y-2 pl-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                        <li key={j} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                          <Skeleton className="h-3 w-full rounded" />
                        </li>
                      ))}
                    </ul>
                  )}
                  {section === 2 && (
                    <ul className="mt-3 space-y-2 pl-2">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <li key={j} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                          <Skeleton className="h-3 w-full rounded" />
                        </li>
                      ))}
                    </ul>
                  )}
                  {section === 3 && (
                    <ul className="mt-3 space-y-2 pl-2">
                      {[1, 2, 3, 4, 5, 6].map((j) => (
                        <li key={j} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 mt-1.5 shrink-0" />
                          <Skeleton className="h-3 w-full rounded" />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
                <Separator />
              </React.Fragment>
            ))}

            {/* Section 12-13 */}
            {[1, 2].map((section) => (
              <React.Fragment key={section}>
                <section>
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                    <Skeleton className="h-7 md:h-8 w-48 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-11/12 rounded" />
                    <Skeleton className="h-4 w-4/5 rounded" />
                  </div>
                </section>
                <Separator />
              </React.Fragment>
            ))}

            {/* Section 14 - Dispute Resolution */}
            <section>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                <Skeleton className="h-7 md:h-8 w-48 rounded-lg" />
              </div>
              
              <div className="space-y-4 md:space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-48 rounded mb-2 md:mb-3" />
                    <Skeleton className="h-3 w-full rounded mb-1" />
                    <Skeleton className="h-3 w-11/12 rounded" />
                  </div>
                ))}
                
                <div className="bg-muted/50 border rounded-lg p-3 md:p-4">
                  <Skeleton className="h-3 w-full rounded mb-1" />
                  <Skeleton className="h-3 w-5/6 rounded" />
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 15 */}
            <section>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                <Skeleton className="h-7 md:h-8 w-56 rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
              </div>
            </section>

            <Separator />

            {/* Section 16 - Contact Card */}
            <section>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6 rounded" />
                <Skeleton className="h-7 md:h-8 w-32 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-3/4 rounded mb-4 md:mb-6" />
              
              <Card className="border shadow-sm bg-muted/30">
                <CardContent className="p-4 md:p-6 space-y-2 md:space-y-3">
                  <Skeleton className="h-6 w-48 rounded" />
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-4 w-4 rounded-full mt-1 shrink-0" />
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-3 w-32 rounded" />
                      <Skeleton className="h-3 w-24 rounded" />
                      <Skeleton className="h-3 w-40 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1 md:pt-2">
                    <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                    <Skeleton className="h-3 w-48 rounded" />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Footer */}
            <div className="pt-6 md:pt-8 pb-4 text-center">
              <Skeleton className="h-3 w-80 mx-auto rounded" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}