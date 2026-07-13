"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Eye, 
  Users, 
  Lock, 
  Clock, 
  Cookie, 
  Mail, 
  MapPin, 
  ChevronRight,
  FileText,
  Globe,
  Smartphone,
  Share2,
  Baby,
  Settings,
  RefreshCw,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "summary", title: "Summary of Key Points", icon: FileText },
  { id: "collect", title: "1. What Information Do We Collect?", icon: Eye },
  { id: "process", title: "2. How Do We Process Your Information?", icon: Settings },
  { id: "share", title: "3. When and With Whom Do We Share Your Personal Information?", icon: Share2 },
  { id: "third-party", title: "4. What Is Our Stance on Third-Party Websites?", icon: Globe },
  { id: "cookies", title: "5. Do We Use Cookies and Other Tracking Technologies?", icon: Cookie },
  { id: "social-logins", title: "6. How Do We Handle Your Social Logins?", icon: Users },
  { id: "retention", title: "7. How Long Do We Keep Your Information?", icon: Clock },
  { id: "security", title: "8. How Do We Keep Your Information Safe?", icon: Lock },
  { id: "minors", title: "9. Do We Collect Information From Minors?", icon: Baby },
  { id: "rights", title: "10. What Are Your Privacy Rights?", icon: Shield },
  { id: "dnt", title: "11. Controls for Do-Not-Track Features", icon: Smartphone },
  { id: "updates", title: "12. Do We Make Updates to This Notice?", icon: RefreshCw },
  { id: "contact", title: "13. How Can You Contact Us About This Notice?", icon: HelpCircle },
  { id: "request", title: "14. How Can You Review, Update, or Delete the Data We Collect From You?", icon: ExternalLink },
];

const thirdParties = [
  { category: "User Account Registration & Authentication", provider: "Clerk" },
  { category: "Website Hosting", provider: "Vercel" },
  { category: "Database Hosting", provider: "Database Hosting" },
  { category: "Email Delivery", provider: "Resend" },
  { category: "Analytics", provider: "Google Analytics" },
  { category: "File Storage", provider: "AWS S3" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-xs font-medium">
              Last updated July 13, 2026
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            This Privacy Notice for <strong className="text-foreground">EURO ENTERPRISES</strong> describes how and why we might access, collect, store, use, and/or share (&quot;process&quot;) your personal information when you use our services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Table of Contents
                  </h3>
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <nav className="space-y-1">
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

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-10">
            
            {/* Intro */}
            <section className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Notice for <strong className="text-foreground">EURO ENTERPRISES</strong> (&quot;<strong>we</strong>,&quot; &quot;<strong>us</strong>,&quot; or &quot;<strong>our</strong>&quot;), describes how and why we might access, collect, store, use, and/or share (&quot;<strong>process</strong>&quot;) your personal information when you use our services (&quot;<strong>Services</strong>&quot;), including when you:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Visit our website at <Link href="https://www.euroenterprises.rent/" className="text-primary hover:underline font-medium">https://www.euroenterprises.rent/</Link> or any website of ours that links to this Privacy Notice</li>
                <li>Use <strong className="text-foreground">EURO ENTERPRISES</strong> — an online automotive services platform specializing in car rentals, vehicle sales, and professional vehicle inspection services.</li>
                <li>Engage with us in other related ways, including any marketing or events</li>
              </ul>
              <div className="bg-muted/50 border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <Link href="mailto:info@euroenterprises.rent" className="text-primary hover:underline">info@euroenterprises.rent</Link>.
                </p>
              </div>
            </section>

            <Separator />

            {/* Section: Summary */}
            <section id="summary" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                Summary of Key Points
              </h2>
              <p className="text-sm text-muted-foreground italic mb-6">
                This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
              </p>
              
              <div className="grid gap-4">
                {[
                  { q: "What personal information do we process?", a: "When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use." },
                  { q: "Do we process any sensitive personal information?", a: "We do not process sensitive personal information." },
                  { q: "Do we collect any information from third parties?", a: "We do not collect any information from third parties." },
                  { q: "How do we process your information?", a: "We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent." },
                  { q: "In what situations and with which parties do we share personal information?", a: "We may share information in specific situations and with specific third parties." },
                  { q: "How do we keep your information safe?", a: "We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure." },
                  { q: "What are your rights?", a: "Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information." },
                  { q: "How do you exercise your rights?", a: "The easiest way to exercise your rights is by visiting https://euroenterprises.rent/contact-us, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws." },
                ].map((item, i) => (
                  <Card key={i} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground text-sm mb-1">{item.q}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Section 1 */}
            <section id="collect" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                1. What Information Do We Collect?
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Personal information you disclose to us</h3>
                  <p className="text-sm text-muted-foreground italic mb-3">
                    <strong>In Short:</strong> We collect personal information that you provide to us.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                  </p>
                  
                  <h4 className="font-semibold text-foreground mb-2">Personal Information Provided by You</h4>
                  <p className="text-muted-foreground mb-3">The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {["names", "phone numbers", "email addresses", "contact or authentication data"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-md">
                        <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-1">Sensitive Information</h4>
                  <p className="text-sm text-muted-foreground">We do not process sensitive information.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Social Media Login Data</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called <Link href="#social-logins" className="text-primary hover:underline">&quot;How Do We Handle Your Social Logins?&quot;</Link> below.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Information automatically collected</h3>
                  <p className="text-sm text-muted-foreground italic mb-3">
                    <strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice: <Link href="https://euroenterprises.rent/cookie-policy" className="text-primary hover:underline">https://euroenterprises.rent/cookie-policy</Link>.
                  </p>

                  <div className="space-y-4">
                    {[
                      { title: "Log and Usage Data", desc: "Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports, and hardware settings)." },
                      { title: "Device Data", desc: "We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information." },
                      { title: "Location Data", desc: "We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services." },
                    ].map((item) => (
                      <div key={item.title} className="border-l-2 border-primary pl-4">
                        <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 2 */}
            <section id="process" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                2. How Do We Process Your Information?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-6">
                <strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
              </p>
              <p className="text-muted-foreground mb-4 font-medium">We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
              
              <div className="grid gap-3">
                {[
                  { title: "To facilitate account creation and authentication", desc: "We may process your information so you can create and log in to your account, as well as keep your account in working order." },
                  { title: "To deliver and facilitate delivery of services to the user", desc: "We may process your information to provide you with the requested service." },
                  { title: "To respond to user inquiries/offer support to users", desc: "We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service." },
                  { title: "To send administrative information to you", desc: "We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information." },
                  { title: "To fulfill and manage your orders", desc: "We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services." },
                  { title: "To request feedback", desc: "We may process your information when necessary to request feedback and to contact you about your use of our Services." },
                  { title: "To send you marketing and promotional communications", desc: "We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time." },
                  { title: "To post testimonials", desc: "We post testimonials on our Services that may contain personal information." },
                  { title: "To protect our Services", desc: "We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention." },
                  { title: "To evaluate and improve our Services, products, marketing, and your experience", desc: "We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience." },
                  { title: "To identify usage trends", desc: "We may process information about how you use our Services to better understand how they are being used so we can improve them." },
                  { title: "To comply with our legal obligations", desc: "We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights." },
                ].map((item, i) => (
                  <Card key={i} className="border shadow-sm">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Section 3 */}
            <section id="share" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Share2 className="h-6 w-6 text-primary" />
                3. When and With Whom Do We Share Your Personal Information?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-6">
                <strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Vendors, Consultants, and Other Third-Party Service Providers</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may share your data with third-party vendors, service providers, contractors, or agents (&quot;third parties&quot;) who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your personal information. This means that they cannot do anything with your personal information unless we have instructed them to do it. They will also not share your personal information with any organization apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct.
                  </p>
                  
                  <h4 className="font-semibold text-foreground mb-3">The third parties we may share personal information with are as follows:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {thirdParties.map((party) => (
                      <Card key={party.category} className="border shadow-sm">
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{party.category}</p>
                          <p className="font-semibold text-foreground text-sm">{party.provider}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/50 border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Business Transfers</h4>
                  <p className="text-sm text-muted-foreground">
                    We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 4 */}
            <section id="third-party" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary" />
                4. What Is Our Stance on Third-Party Websites?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-4">
                <strong>In Short:</strong> We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third-party websites. Any data collected by third parties is not covered by this Privacy Notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions.
              </p>
            </section>

            <Separator />

            {/* Section 5 */}
            <section id="cookies" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                5. Do We Use Cookies and Other Tracking Technologies?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-4">
                <strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functi
ons.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice: <Link href="https://euroenterprises.rent/cookie-policy" className="text-primary hover:underline">https://euroenterprises.rent/cookie-policy</Link>.
              </p>

              <div className="bg-muted/50 border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-3">Google Analytics</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: <strong>Remarketing with Google Analytics</strong>, <strong>Google Display Network Impressions Reporting</strong>, and <strong>Google Analytics Demographics and Interests Reporting</strong>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To opt out of being tracked by Google Analytics across the Services, visit <Link href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline">https://tools.google.com/dlpage/gaoptout</Link>. You can opt out of Google Analytics Advertising Features through <Link href="https://adssettings.google.com/" className="text-primary hover:underline">Ads Settings</Link> and Ad Settings for mobile apps. Other opt out means include <Link href="http://optout.networkadvertising.org/" className="text-primary hover:underline">http://optout.networkadvertising.org/</Link> and <Link href="http://www.networkadvertising.org/mobile-choice" className="text-primary hover:underline">http://www.networkadvertising.org/mobile-choice</Link>. For more information on the privacy practices of Google, please visit the <Link href="https://policies.google.com/privacy" className="text-primary hover:underline">Google Privacy & Terms page</Link>.
                </p>
              </div>
            </section>

            <Separator />

            {/* Section 6 */}
            <section id="social-logins" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                6. How Do We Handle Your Social Logins?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-4">
                <strong>In Short:</strong> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
              </p>
            </section>

            <Separator />

            {/* Section 7 */}
            <section id="retention" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                7. How Long Do We Keep Your Information?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-4">
                <strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
              </p>
            </section>

            <Separator />

            {/* Section 8 */}
            <section id="security" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                8. How Do We Keep Your Information Safe?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-4">
                <strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
              </p>
            </section>

            <Separator />

            {/* Section 9 */}
            <section id="minors" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Baby className="h-6 w-6 text-primary" />
                9. Do We Collect Information From Minors?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-4">
                <strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent&apos;s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <Link href="mailto:info@euroenterprises.rent" className="text-primary hover:underline">info@euroenterprises.rent</Link>.
              </p>
            </section>

            <Separator />

            {/* Section 10 */}
            <section id="rights" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                10. What Are Your Privacy Rights?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-6">
                <strong>In Short:</strong> You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 underline underline-offset-4">Withdrawing your consent</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section &quot;How Can You Contact Us About This Notice?&quot; below.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 underline underline-offset-4">Opting out of marketing and promotional communications</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, replying &quot;STOP&quot; or &quot;UNSUBSCRIBE&quot; to the SMS messages that we send, or by contacting us using the details provided in the section &quot;How Can You Contact Us About This Notice?&quot; below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.
                  </p>
                </div>

                <div className="bg-muted/50 border rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-3">Account Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    If you would at any time like to review or change the information in your account or terminate your account, you can:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      Log in to your account settings and update your user account.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      Contact us using the contact information provided.
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 underline underline-offset-4">Cookies and similar technologies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. You may also <Link href="http://www.aboutads.info/choices/" className="text-primary hover:underline">opt out of interest-based advertising by advertisers</Link> on our Services. For further information, please see our Cookie Notice: <Link href="https://euroenterprises.rent/cookie-policy" className="text-primary hover:underline">https://euroenterprises.rent/cookie-policy</Link>.
                  </p>
                </div>

                <p className="text-muted-foreground">
                  If you have questions or comments about your privacy rights, you may email us at <Link href="mailto:info@euroenterprises.rent" className="text-primary hover:underline">info@euroenterprises.rent</Link>.
                </p>
              </div>
            </section>

            <Separator />

            {/* Section 11 */}
            <section id="dnt" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Smartphone className="h-6 w-6 text-primary" />
                11. Controls for Do-Not-Track Features
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
              </p>
            </section>

            <Separator />

            {/* Section 12 */}
            <section id="updates" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <RefreshCw className="h-6 w-6 text-primary" />
                12. Do We Make Updates to This Notice?
              </h2>
              <p className="text-sm text-muted-foreground italic mb-4">
                <strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Notice from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
              </p>
            </section>

            <Separator />

            {/* Section 13 */}
            <section id="contact" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-primary" />
                13. How Can You Contact Us About This Notice?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you have questions or comments about this notice, you may email us at <Link href="mailto:info@euroenterprises.rent" className="text-primary hover:underline">info@euroenterprises.rent</Link> or contact us by post at:
              </p>

              <Card className="border shadow-sm bg-muted/30">
                <CardContent className="p-6 space-y-2">
                  <p className="font-semibold text-foreground text-lg">EURO ENTERPRISES</p>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <div className="space-y-0.5 text-sm">
                      <p>Office 3, Plot B-38</p>
                      <p>Clifton Block 1</p>
                      <p>KARACHI, Sindh 75600</p>
                      <p>Pakistan</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground pt-2">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    <Link href="mailto:info@euroenterprises.rent" className="text-sm text-primary hover:underline">
                      info@euroenterprises.rent
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Section 14 */}
            <section id="request" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <ExternalLink className="h-6 w-6 text-primary" />
                14. How Can You Review, Update, or Delete the Data We Collect From You?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please visit: <Link href="https://euroenterprises.rent/contact-us" className="text-primary hover:underline">https://euroenterprises.rent/contact-us</Link>.
              </p>
            </section>

            {/* Footer Note */}
            <div className="pt-8 pb-4 text-center">
              <p className="text-xs text-muted-foreground">
                This Privacy Policy was created using Termly&apos;s <Link href="https://termly.io/products/privacy-policy-generator/" className="text-primary hover:underline">Privacy Policy Generator</Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}