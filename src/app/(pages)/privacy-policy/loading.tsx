"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  FileText, 
  Eye, 
  Settings, 
  Share2, 
  Globe, 
  Cookie, 
  Users, 
  Clock, 
  Lock, 
  Baby, 
  Smartphone, 
  RefreshCw, 
  HelpCircle, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

const sidebarItems = [
  { icon: FileText, label: "Summary of Key Points" },
  { icon: Eye, label: "1. What Information Do We Collect?" },
  { icon: Settings, label: "2. How Do We Process Your Information?" },
  { icon: Share2, label: "3. When and With Whom Do We Share..." },
  { icon: Globe, label: "4. What Is Our Stance on Third-Party..." },
  { icon: Cookie, label: "5. Do We Use Cookies and Other..." },
  { icon: Users, label: "6. How Do We Handle Your Social Logins?" },
  { icon: Clock, label: "7. How Long Do We Keep Your Information?" },
  { icon: Lock, label: "8. How Do We Keep Your Information Safe?" },
  { icon: Baby, label: "9. Do We Collect Information From Minors?" },
  { icon: Shield, label: "10. What Are Your Privacy Rights?" },
  { icon: Smartphone, label: "11. Controls for Do-Not-Track Features" },
  { icon: RefreshCw, label: "12. Do We Make Updates to This Notice?" },
  { icon: HelpCircle, label: "13. How Can You Contact Us..." },
  { icon: ExternalLink, label: "14. How Can You Review, Update..." },
];


export default function PrivacyPolicyLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header Skeleton */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-5 w-32 rounded-full" />
          </div>
          <Skeleton className="h-10 w-3/4 md:w-1/2 rounded-lg mb-4" />
          <Skeleton className="h-5 w-full md:w-2/3 rounded-lg" />
          <Skeleton className="h-5 w-5/6 md:w-1/2 rounded-lg mt-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <nav className="space-y-1">
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

          {/* Main Content Skeleton */}
          <main className="lg:col-span-3 space-y-10">
            
            {/* Intro Section */}
            <section className="space-y-4">
              <Skeleton className="h-5 w-full rounded-lg" />
              <Skeleton className="h-5 w-11/12 rounded-lg" />
              <Skeleton className="h-5 w-4/5 rounded-lg" />
              
              <div className="space-y-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground/30" />
                    <Skeleton className="h-4 w-full rounded" />
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 border rounded-lg p-4 mt-4">
                <Skeleton className="h-4 w-full rounded mb-2" />
                <Skeleton className="h-4 w-5/6 rounded" />
              </div>
            </section>

            <Separator />

            {/* Summary Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-8 w-64 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-2/3 rounded mb-6" />
              
              <div className="grid gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="border shadow-sm">
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-3 w-full rounded" />
                      <Skeleton className="h-3 w-5/6 rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-8 w-72 rounded-lg" />
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-5 w-48 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md">
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
                      <Skeleton className="h-3 w-24 rounded" />
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <Skeleton className="h-4 w-40 rounded mb-2" />
                  <Skeleton className="h-3 w-full rounded" />
                </div>

                <div className="space-y-2 mt-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-l-2 border-muted pl-4 py-2">
                      <Skeleton className="h-4 w-32 rounded mb-2" />
                      <Skeleton className="h-3 w-full rounded" />
                      <Skeleton className="h-3 w-5/6 rounded mt-1" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-8 w-80 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-4/5 rounded mb-6" />
              
              <div className="grid gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="border shadow-sm">
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-4 w-2/3 rounded" />
                      <Skeleton className="h-3 w-full rounded" />
                      <Skeleton className="h-3 w-4/5 rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-8 w-96 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-5/6 rounded mb-6" />
              
              <Skeleton className="h-5 w-64 rounded mb-3" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="border shadow-sm">
                    <CardContent className="p-3 space-y-1">
                      <Skeleton className="h-3 w-20 rounded" />
                      <Skeleton className="h-4 w-32 rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-muted/50 border rounded-lg p-4">
                <Skeleton className="h-4 w-40 rounded mb-2" />
                <Skeleton className="h-3 w-full rounded" />
              </div>
            </section>

            <Separator />

            {/* Section 4-6 condensed */}
            {[1, 2, 3].map((section) => (
              <React.Fragment key={section}>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-8 w-3/4 rounded-lg" />
                  </div>
                  <Skeleton className="h-4 w-full rounded mb-2" />
                  <Skeleton className="h-4 w-11/12 rounded mb-2" />
                  <Skeleton className="h-4 w-4/5 rounded" />
                </section>
                <Separator />
              </React.Fragment>
            ))}

            {/* Section 7-9 */}
            {[1, 2, 3].map((section) => (
              <React.Fragment key={section}>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-8 w-2/3 rounded-lg" />
                  </div>
                  <Skeleton className="h-4 w-full rounded mb-2" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                </section>
                <Separator />
              </React.Fragment>
            ))}

            {/* Section 10 - Privacy Rights (larger) */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-8 w-64 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-3/4 rounded mb-6" />
              
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-48 rounded mb-2" />
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-5/6 rounded mt-1" />
                </div>
                
                <div className="bg-muted/50 border rounded-lg p-5 space-y-3">
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-3 w-full rounded" />
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground/30" />
                      <Skeleton className="h-3 w-full rounded" />
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground/30" />
                      <Skeleton className="h-3 w-4/5 rounded" />
                    </div>
                  </div>
                  <Skeleton className="h-3 w-full rounded" />
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 11-13 */}
            {[1, 2].map((section) => (
              <React.Fragment key={section}>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-8 w-3/4 rounded-lg" />
                  </div>
                  <Skeleton className="h-4 w-full rounded mb-2" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                </section>
                <Separator />
              </React.Fragment>
            ))}

            {/* Contact Card */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-8 w-80 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-4/5 rounded mb-6" />
              
              <Card className="border shadow-sm bg-muted/30">
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-6 w-48 rounded" />
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-4 w-4 rounded-full mt-1 shrink-0" />
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-3 w-32 rounded" />
                      <Skeleton className="h-3 w-24 rounded" />
                      <Skeleton className="h-3 w-40 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                    <Skeleton className="h-3 w-48 rounded" />
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Section 14 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-8 w-3/4 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-5/6 rounded" />
            </section>

            {/* Footer */}
            <div className="pt-8 pb-4 text-center">
              <Skeleton className="h-3 w-80 mx-auto rounded" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}