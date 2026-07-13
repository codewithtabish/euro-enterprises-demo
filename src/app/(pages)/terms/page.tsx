"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  FileText, 
  Car, 
  ShoppingCart, 
  SearchCheck, 
  CreditCard, 
  ShieldAlert, 
  UserX, 
  Globe, 
  Gavel, 
  Mail, 
  MapPin, 
  ChevronRight,
  AlertTriangle,
  Ban,
  RefreshCw,
  HelpCircle,
  Lock,
  Users,
  CalendarClock,
  Fuel,
  Wrench,
  HandCoins
} from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "agreement", title: "1. Agreement to Terms", icon: FileText },
  { id: "services", title: "2. Our Services", icon: Car },
  { id: "rental", title: "3. Car Rental Terms", icon: CalendarClock },
  { id: "sales", title: "4. Vehicle Purchase Terms", icon: ShoppingCart },
  { id: "inspection", title: "5. Vehicle Inspection Terms", icon: SearchCheck },
  { id: "accounts", title: "6. User Accounts", icon: Users },
  { id: "payments", title: "7. Payments & Refunds", icon: CreditCard },
  { id: "prohibited", title: "8. Prohibited Activities", icon: Ban },
  { id: "liability", title: "9. Limitation of Liability", icon: ShieldAlert },
  { id: "warranty", title: "10. Warranty Disclaimer", icon: AlertTriangle },
  { id: "indemnification", title: "11. Indemnification", icon: HandCoins },
  { id: "termination", title: "12. Termination", icon: UserX },
  { id: "governing", title: "13. Governing Law", icon: Gavel },
  { id: "disputes", title: "14. Dispute Resolution", icon: Scale },
  { id: "changes", title: "15. Changes to These Terms", icon: RefreshCw },
  { id: "contact", title: "16. Contact Us", icon: HelpCircle },
];

const rentalRequirements = [
  "Minimum age of 21 years (25 for luxury vehicles)",
  "Valid driver's license held for at least 2 years",
  "Valid government-issued ID or passport",
  "Active credit or debit card in renter's name",
  "Clean driving record (no major violations in past 3 years)",
  "Security deposit payment (refundable upon safe return)",
];

const prohibitedActivities = [
  "Use vehicles for illegal purposes, racing, or towing",
  "Allow unauthorized drivers to operate the vehicle",
  "Transport hazardous materials or illegal substances",
  "Sublease, sell, or transfer vehicle possession",
  "Drive outside agreed geographical boundaries without consent",
  "Tamper with odometer, GPS, or any vehicle tracking equipment",
  "Use vehicles for commercial ride-sharing without written approval",
  "Operate vehicle while under influence of alcohol or drugs",
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-10 md:py-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            <Badge variant="secondary" className="text-xs font-medium">
              Last updated July 14, 2026
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 md:mb-4">
            Terms of Service
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            These Terms of Service constitute a legally binding agreement between <strong className="text-foreground">EURO ENTERPRISES</strong> ("<strong>Company</strong>," "<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>") and you ("<strong>User</strong>," "<strong>you</strong>," or "<strong>your</strong>") regarding your access to and use of our automotive services platform.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <Card className="border shadow-sm">
                <CardContent className="p-3 md:p-4">
                  <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Table of Contents
                  </h3>
                  <ScrollArea className="h-[calc(100vh-260px)]">
                    <nav className="space-y-0.5">
                      {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                          <Link
                            key={section.id}
                            href={`#${section.id}`}
                            className="flex items-start gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors group"
                          >
                            <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
                            <span className="leading-tight">{section.title}</span>
                          </Link>
                        );
                      })}
                    </nav>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Mobile TOC */}
          <div className="lg:hidden col-span-1 mb-2">
            <Card className="border shadow-sm">
              <CardContent className="p-3">
                <ScrollArea className="h-48">
                  <nav className="space-y-0.5">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <Link
                          key={section.id}
                          href={`#${section.id}`}
                          className="flex items-start gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          <span className="leading-tight">{section.title}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8 md:space-y-10">
            
            {/* Intro */}
            <section className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Please read these Terms of Service carefully before accessing or using our Services. By accessing or using any part of our platform, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, you may not access the Services or use any of our offerings.
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm text-muted-foreground">
                  <strong className="text-foreground">Important Notice:</strong> These Terms contain provisions that govern how claims you and we have against each other are resolved, including an agreement to arbitrate, which will, with limited exception, require you to submit claims you have against us to binding and final arbitration.
                </p>
              </div>
            </section>

            <Separator />

            {/* Section 1: Agreement */}
            <section id="agreement" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                1. Agreement to Terms
              </h2>
              <div className="space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p>
                  These Terms of Service ("<strong>Terms</strong>") constitute a legally binding agreement made between you and EURO ENTERPRISES, concerning your access to and use of our website and services. You agree that by accessing the Services, you have read, understood, and agree to be bound by all of these Terms.
                </p>
                <p>
                  We reserve the right, in our sole discretion, to make changes or modifications to these Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Terms. It is your responsibility to periodically review these Terms to stay informed of updates.
                </p>
                <p>
                  The information provided on the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation. All users who access the Services do so on their own initiative and are responsible for compliance with applicable local laws.
                </p>
              </div>
            </section>

            <Separator />

            {/* Section 2: Services */}
            <section id="services" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Car className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                2. Our Services
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 md:mb-5 text-sm md:text-base">
                EURO ENTERPRISES operates an online automotive services platform providing the following core services to users:
              </p>
              
              <div className="grid gap-3 md:gap-4">
                <Card className="border shadow-sm">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <CalendarClock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">Car Rental Services</h4>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          Short-term and long-term vehicle rentals for personal and business use. Vehicles are provided on an as-available basis and subject to verification of renter eligibility, availability, and completion of required documentation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <ShoppingCart className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">Vehicle Sales</h4>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          Sale of new and pre-owned vehicles. All vehicles are sold on an &quot;as-is&quot; or disclosed condition basis unless a separate written warranty is provided. Pricing is subject to change without notice until a purchase agreement is executed.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <SearchCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">Professional Vehicle Inspection</h4>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          Comprehensive mechanical and cosmetic inspection services for pre-purchase evaluations, insurance assessments, and general vehicle condition reports. Inspection reports represent our professional opinion at the time of inspection.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4 md:mt-5 bg-muted/50 border rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Service Availability:</strong> All services are subject to availability, geographic limitations, and applicable laws. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice. We do not guarantee that our Services will be available at all times or that they will meet your specific requirements.
                </p>
              </div>
            </section>

            <Separator />

            {/* Section 3: Car Rental Terms */}
            <section id="rental" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <CalendarClock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                3. Car Rental Terms
              </h2>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">3.1 Eligibility Requirements</h3>
                  <p className="text-muted-foreground mb-3 text-sm md:text-base leading-relaxed">
                    To rent a vehicle from EURO ENTERPRISES, you must meet the following requirements:
                  </p>
                  <ul className="grid grid-cols-1 gap-2">
                    {rentalRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-md">
                        <ChevronRight className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">3.2 Rental Period & Return</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    The rental period begins at the time specified in your rental agreement and ends when the vehicle is returned to our designated location. Late returns are subject to additional daily charges at the standard daily rate. Vehicles must be returned with the same fuel level as at pickup, or refueling charges will apply. All vehicles must be returned in clean condition; excessive cleaning fees may be charged for vehicles returned in an unreasonably dirty state.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">3.3 Security Deposit</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    A security deposit is required for all rentals and will be held on your credit card for the duration of the rental period. The deposit amount varies by vehicle category. The deposit will be released within 7-14 business days after vehicle return, pending inspection for damages, traffic violations, toll charges, or fuel discrepancies. We reserve the right to withhold all or part of the deposit to cover any costs incurred due to renter negligence or breach of these Terms.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">3.4 Insurance & Liability</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Basic third-party liability insurance is included with all rentals. Comprehensive and collision coverage is available as an optional add-on. You are fully liable for any damage to the rental vehicle, theft, or loss not covered by insurance, including but not limited to: tire damage, windshield cracks, interior damage, undercarriage damage, and damage caused by improper operation. You must immediately report any accident, theft, or damage to both local authorities and EURO ENTERPRISES.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">3.5 Mileage & Usage</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Standard rentals include a daily mileage limit as specified in your agreement. Excess mileage is charged per kilometer at the rate stated in your rental contract. Vehicles may not be driven outside Pakistan without prior written authorization. Cross-border travel is strictly prohibited unless explicitly approved in writing by an authorized EURO ENTERPRISES representative.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">3.6 Cancellation Policy</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Cancellations made more than 48 hours before the scheduled pickup time receive a full refund. Cancellations made 24-48 hours before pickup are subject to a 25% cancellation fee. Cancellations made less than 24 hours before pickup or no-shows are subject to a 50% cancellation fee. No refunds are provided for early returns.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 4: Vehicle Purchase Terms */}
            <section id="sales" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                4. Vehicle Purchase Terms
              </h2>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">4.1 Vehicle Condition & Disclosure</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    All vehicles sold by EURO ENTERPRISES are sold on an &quot;<strong>as-is, where-is</strong>&quot; basis unless otherwise expressly stated in a written sales agreement. We make every effort to accurately describe the condition, history, and specifications of each vehicle. However, we do not guarantee the accuracy of vehicle history reports, odometer readings, or third-party data. Prospective buyers are strongly encouraged to conduct independent inspections and verify all information before purchase.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">4.2 Pricing & Payment</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    All listed prices are in Pakistani Rupees (PKR) and are subject to change without notice. Prices do not include applicable taxes, registration fees, transfer fees, or other government charges unless explicitly stated. A non-refundable deposit may be required to hold a vehicle. Full payment must be received before title transfer and vehicle release. We accept bank transfers, certified checks, and approved financing arrangements. Personal checks are not accepted without prior approval.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">4.3 Title Transfer</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Title transfer is the buyer's responsibility and must be completed within the timeframe required by local law. EURO ENTERPRISES will provide all necessary documentation to facilitate the transfer. We are not responsible for delays caused by government offices, missing documentation from previous owners, or buyer failure to complete required steps. The buyer assumes all liability for the vehicle from the moment of possession transfer.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">4.4 Returns & Warranties</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Unless a separate written warranty is provided at the time of sale, all vehicle sales are final with no right of return. Any warranty provided is limited to the specific terms, duration, and coverage outlined in the written warranty document. EURO ENTERPRISES does not provide implied warranties of merchantability or fitness for a particular purpose. Extended warranties, if available, are provided by third-party providers and subject to their terms.
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 md:p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Important:</strong> We strongly recommend all buyers obtain an independent pre-purchase inspection before completing any vehicle purchase. EURO ENTERPRISES inspection services are available but do not constitute a warranty or guarantee of future vehicle performance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 5: Inspection Terms */}
            <section id="inspection" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <SearchCheck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                5. Vehicle Inspection Terms
              </h2>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">5.1 Scope of Inspection</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Our vehicle inspection services include a comprehensive visual and mechanical assessment of the vehicle's condition at the time of inspection. Inspections cover major systems including engine, transmission, brakes, suspension, electrical systems, body condition, and interior. However, our inspections are non-invasive and do not include disassembly of components, compression testing, or internal diagnostics unless specifically requested and paid for as an additional service.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">5.2 Report Limitations</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Inspection reports represent our professional opinion based on visible and accessible components at the time of inspection. We do not guarantee the discovery of all defects, latent issues, or future failures. Issues that are not visible, accessible, or manifest at the time of inspection may not be included in the report. Our liability for inspection services is strictly limited to the fee paid for the inspection.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">5.3 Scheduling & Cancellation</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Inspection appointments must be scheduled in advance and are subject to inspector availability. Cancellations made more than 24 hours in advance receive a full refund. Same-day cancellations or no-shows forfeit 50% of the inspection fee. If the vehicle is not available or accessible at the scheduled time, the inspection may be rescheduled at our discretion with potential additional charges.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">5.4 Third-Party Mechanics</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    While we employ qualified inspectors, our reports do not replace the opinion of a licensed mechanic or manufacturer-authorized service center. We encourage clients to seek additional professional opinions for major purchases. EURO ENTERPRISES is not affiliated with any third-party repair shops and does not receive commissions for referrals.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 6: User Accounts */}
            <section id="accounts" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                6. User Accounts
              </h2>
              
              <div className="space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p>
                  To access certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p>
                  You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
                <p>
                  We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable. We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <div className="bg-muted/50 border rounded-lg p-3 md:p-4 mt-2">
                  <p className="text-xs md:text-sm">
                    <strong className="text-foreground">Account Security:</strong> You acknowledge that you are solely responsible for any activity that occurs on your account. EURO ENTERPRISES cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 7: Payments */}
            <section id="payments" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                7. Payments & Refunds
              </h2>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">7.1 Payment Methods</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    We accept various payment methods including credit cards, debit cards, bank transfers, and digital payment platforms as indicated at checkout. All payments are processed securely through our third-party payment processors. By providing payment information, you represent and warrant that you are authorized to use the designated payment method.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">7.2 Pricing & Fees</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    All prices are displayed in Pakistani Rupees (PKR) unless otherwise noted. Prices do not include applicable taxes, fees, or surcharges unless explicitly stated. We reserve the right to modify pricing at any time. Confirmed bookings and orders are locked at the price at the time of confirmation.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">7.3 Refund Policy</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Refunds are processed according to the specific service terms outlined in Sections 3, 4, and 5 above. Generally, refunds (where applicable) will be processed within 14 business days to the original payment method. We are not responsible for delays caused by banks or payment processors. Processing fees charged by third-party payment providers are non-refundable.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">7.4 Late Payments</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Failure to make timely payments may result in service suspension, cancellation of reservations, additional late fees, and collection proceedings. Interest on overdue amounts may be charged at the rate of 1.5% per month or the maximum rate permitted by law, whichever is less.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 8: Prohibited Activities */}
            <section id="prohibited" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Ban className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                8. Prohibited Activities
              </h2>
              <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of our Services, you agree not to:
              </p>
              
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {prohibitedActivities.map((activity, i) => (
                  <div key={i} className="flex items-start gap-2 md:gap-3 bg-red-500/5 border border-red-500/10 px-3 py-2 md:px-4 md:py-3 rounded-md">
                    <Ban className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-xs md:text-sm text-muted-foreground">{activity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-5 bg-muted/50 border rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Consequences:</strong> Violation of any prohibited activity may result in immediate termination of your account, forfeiture of deposits, legal action, and reporting to appropriate authorities. You will be held fully financially and legally responsible for any damages, fines, or losses resulting from prohibited use.
                </p>
              </div>
            </section>

            <Separator />

            {/* Section 9: Limitation of Liability */}
            <section id="liability" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <ShieldAlert className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                9. Limitation of Liability
              </h2>
              
              <div className="space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p>
                  To the fullest extent permitted by applicable law, EURO ENTERPRISES, its affiliates, officers, directors, employees, agents, suppliers, or licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="space-y-2 list-disc list-inside pl-2">
                  <li>Your access to or use of or inability to access or use the Services</li>
                  <li>Any conduct or content of any third party on the Services</li>
                  <li>Any content obtained from the Services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  <li>Vehicle accidents, breakdowns, or mechanical failures during rental periods</li>
                  <li>Disputes between buyers and sellers of vehicles</li>
                  <li>Errors or omissions in inspection reports</li>
                </ul>
                <p>
                  In no event shall our total liability to you for all claims exceed the amount you have paid to us in the twelve (12) months preceding the event giving rise to liability, or one hundred thousand Pakistani Rupees (PKR 100,000), whichever is greater.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm">
                    <strong className="text-foreground">Essential Services Exception:</strong> Nothing in these Terms shall limit or exclude our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under applicable law.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 10: Warranty Disclaimer */}
            <section id="warranty" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                10. Warranty Disclaimer
              </h2>
              
              <div className="space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p>
                  Your use of the Services is at your sole risk. The Services are provided on an &quot;<strong>AS IS</strong>&quot; and &quot;<strong>AS AVAILABLE</strong>&quot; basis. The Services are provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                </p>
                <p>
                  EURO ENTERPRISES, its subsidiaries, affiliates, and licensors do not warrant that:
                </p>
                <ul className="space-y-2 list-disc list-inside pl-2">
                  <li>The Services will function uninterrupted, secure, or available at any particular time or location</li>
                  <li>Any errors or defects will be corrected</li>
                  <li>The Services are free of viruses or other harmful components</li>
                  <li>The results of using the Services will meet your requirements</li>
                  <li>Any vehicle sold, rented, or inspected will meet your specific needs or expectations</li>
                </ul>
                <p>
                  All vehicles sold are subject to the specific warranty terms, if any, set forth in the individual sales agreement. No other warranties, express or implied, are made regarding any vehicle.
                </p>
              </div>
            </section>

            <Separator />

            {/* Section 11: Indemnification */}
            <section id="indemnification" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <HandCoins className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                11. Indemnification
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                You agree to defend, indemnify, and hold harmless EURO ENTERPRISES and its subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your breach of these Terms or the documents they incorporate by reference, or your violation of any law or the rights of a third-party, including but not limited to:
              </p>
              <ul className="mt-3 md:mt-4 space-y-2 list-disc list-inside pl-2 text-muted-foreground text-sm md:text-base">
                <li>Traffic violations, fines, or tolls incurred during vehicle rental</li>
                <li>Damage to rented vehicles caused by your negligence or misuse</li>
                <li>Accidents involving rented vehicles where you are at fault</li>
                <li>Misrepresentation in vehicle sale transactions</li>
                <li>Any content you submit, post, or transmit through the Services</li>
                <li>Your use of the Services in violation of these Terms</li>
              </ul>
            </section>

            <Separator />

            {/* Section 12: Termination */}
            <section id="termination" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <UserX className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                12. Termination
              </h2>
              
              <div className="space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Services will immediately cease.
                </p>
                <p>
                  If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
                <p>
                  In the event of termination due to your breach, any outstanding payments, fees, or damages owed to EURO ENTERPRISES shall become immediately due and payable. We reserve the right to pursue all available legal remedies to recover such amounts.
                </p>
              </div>
            </section>

            <Separator />

            {/* Section 13: Governing Law */}
            <section id="governing" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Gavel className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                13. Governing Law
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of the <strong className="text-foreground">Islamic Republic of Pakistan</strong>, without regard to its conflict of law provisions. You agree that any legal action or proceeding between you and EURO ENTERPRISES shall be brought exclusively in the courts located in <strong className="text-foreground">Karachi, Sindh, Pakistan</strong>. You hereby submit to the personal jurisdiction of such courts for the purpose of litigating all such claims.
              </p>
            </section>

            <Separator />

            {/* Section 14: Dispute Resolution */}
            <section id="disputes" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Scale className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                14. Dispute Resolution
              </h2>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">14.1 Informal Resolution</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Before filing any claim against EURO ENTERPRISES, you agree to try to resolve the dispute informally by contacting us at <Link href="mailto:info@euroenterprises.rent" className="text-primary hover:underline">info@euroenterprises.rent</Link>. We'll try to resolve the dispute informally by contacting you via email. If a dispute is not resolved within 30 days of submission, you or EURO ENTERPRISES may bring a formal proceeding.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">14.2 Arbitration Agreement</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    You and EURO ENTERPRISES agree that any dispute, claim, or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation, or validity thereof, or to the use of the Services, shall be determined by binding arbitration in Karachi, Pakistan, before a single arbitrator. The arbitration shall be administered by the <strong className="text-foreground">Karachi Centre for Dispute Resolution (KCDR)</strong> in accordance with its Commercial Arbitration Rules.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base">14.3 Class Action Waiver</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    You and EURO ENTERPRISES agree that any proceedings to resolve disputes will be conducted only on an individual basis and not in a class, consolidated, or representative action. You agree to waive any right to participate in class actions, private attorney general actions, or other representative proceedings.
                  </p>
                </div>

                <div className="bg-muted/50 border rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Exceptions to Arbitration:</strong> Notwithstanding the foregoing, either party may bring an individual action in small claims court or seek injunctive or other equitable relief in a court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of a party's copyrights, trademarks, trade secrets, patents, or other intellectual property rights.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 15: Changes */}
            <section id="changes" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <RefreshCw className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                15. Changes to These Terms
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Services.
              </p>
            </section>

            <Separator />

            {/* Section 16: Contact */}
            <section id="contact" className="scroll-mt-20 md:scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <HelpCircle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                16. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                If you have any questions about these Terms, please contact us:
              </p>

              <Card className="border shadow-sm bg-muted/30">
                <CardContent className="p-4 md:p-6 space-y-2 md:space-y-3">
                  <p className="font-semibold text-foreground text-base md:text-lg">EURO ENTERPRISES</p>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <div className="space-y-0.5 text-xs md:text-sm">
                      <p>Office 3, Plot B-38</p>
                      <p>Clifton Block 1</p>
                      <p>KARACHI, Sindh 75600</p>
                      <p>Pakistan</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground pt-1 md:pt-2">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    <Link href="mailto:info@euroenterprises.rent" className="text-xs md:text-sm text-primary hover:underline">
                      info@euroenterprises.rent
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Footer Note */}
            <div className="pt-6 md:pt-8 pb-4 text-center">
              <p className="text-[10px] md:text-xs text-muted-foreground">
                These Terms of Service were prepared for EURO ENTERPRISES and are effective as of July 14, 2026.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}