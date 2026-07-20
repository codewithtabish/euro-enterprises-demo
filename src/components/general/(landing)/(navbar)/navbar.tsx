'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X, ChevronDown, LayoutDashboard, Calendar } from 'lucide-react';
import { ModeToggle } from '../../(themes)/theme-toggler';
import {
  Show,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import NavBarLogo from './navbar-logo';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Cars', href: '#', hasDropdown: true },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Teams', href: '/teams' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact-us' },
];

const carSubmenu = [
  { name: 'Rentals', href: '/cars/rental' },
  { name: 'Sales', href: '/cars/sales' },
];

// ─── Multiple Admin Emails ─────────────────────────────────────
const ADMIN_EMAILS = [
  "info@euroenterprises.rent",
  "alii.9000919@gmail.com",
];

// ─── UserMenu Component (DECLARED OUTSIDE) ─────────────────────
function UserMenu() {
  const { user } = useUser();

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  const isAdmin = userEmail ? ADMIN_EMAILS.includes(userEmail) : false;





  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "h-9 w-9 ring-2 ring-offset-2 ring-offset-background ring-border hover:ring-primary/50 transition-all",
        },
      }}
    >
      <UserButton.MenuItems>
        {/* Dashboard - ONLY for admins */}
        {isAdmin && (
          <UserButton.Link
            label="Dashboard"
            labelIcon={<LayoutDashboard className="h-4 w-4" />}
            href="/dashboard"
          />
        )}

        {/* My Bookings - for EVERYONE logged in */}
        <UserButton.Link
          label="My Bookings"
          labelIcon={<Calendar className="h-4 w-4" />}
          href="/bookings"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}

// ─── BookingIcon Component (visible when logged in) ────────────
function BookingIcon() {
  return (
    <Link
      href="/bookings"
      className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary transition-colors"
      title="My Bookings"
    >
      <Calendar className="h-4 w-4" />
    </Link>
  );
}

// ─── MobileDropdownButton Component ────────────────────────────
function MobileDropdownButton({ menuState, setMenuState }: { menuState: boolean; setMenuState: (v: boolean) => void }) {
  return (
    <button
      onClick={() => setMenuState(!menuState)}
      aria-label={menuState ? 'Close Menu' : 'Open Menu'}
      className="relative z-50 p-2 text-foreground hover:bg-accent rounded-xl transition-colors"
    >
      <ChevronDown 
        className={`size-5 transition-all duration-300 ${menuState ? 'rotate-180' : ''}`} 
      />
    </button>
  );
}

const APPNavBar = () => {
  const [menuState, setMenuState] = useState(false);
  const [carsOpen, setCarsOpen] = useState(false);
  const pathname = usePathname();

  // ✅ HIDE on dashboard AND on any blog detail page (/blogs/[slug])
  const shouldHide = pathname.startsWith("/dashboard") || pathname.startsWith("/blogs/");

  if (shouldHide) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        data-state={menuState ? 'active' : undefined}
        className="border-b border-border bg-white/95 backdrop-blur-lg dark:bg-zinc-950/95 transition-all duration-300"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between gap-6 py-4 lg:py-5">

            {/* Logo - DESKTOP ONLY (hidden on mobile) */}
            <div className="hidden lg:block">
              <NavBarLogo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 gap-10">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => setCarsOpen(!carsOpen)}
                      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 focus:outline-none"
                      aria-expanded={carsOpen}
                    >
                      {item.name}
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${carsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Cars Dropdown */}
                  {item.hasDropdown && carsOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-52 rounded-2xl bg-white dark:bg-zinc-900 border border-border shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {carSubmenu.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.href}
                          className="block px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl mx-2 transition-all"
                          onClick={() => {
                            setCarsOpen(false);
                            setMenuState(false);
                          }}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">

              {/* Mode Toggle - ALWAYS visible */}
              <ModeToggle />

              {/* DESKTOP: Booking Icon + Auth */}
              <div className="hidden lg:flex items-center gap-3">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <Button className={'md:px-5 px-4 md:py-6 py-4 cursor-pointer'} variant={'secondary'}>
                      Get Started
                    </Button>
                  </SignInButton>
                </Show>

                <Show when="signed-in">
                  <BookingIcon />
                  <UserMenu />
                </Show>
              </div>

              {/* MOBILE: All icons + Dropdown Button */}
              <div className="lg:hidden flex items-center gap-2">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <span className="text-xs font-medium">Log in</span>
                    </Button>
                  </SignInButton>
                  <MobileDropdownButton menuState={menuState} setMenuState={setMenuState} />
                </Show>

                <Show when="signed-in">
                  <BookingIcon />
                  <UserMenu />
                  <MobileDropdownButton menuState={menuState} setMenuState={setMenuState} />
                </Show>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden border-t border-border bg-white dark:bg-zinc-950 px-6 shadow-xl transition-all duration-300 overflow-hidden ${menuState ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
        >
          <ul className="space-y-6 text-base font-medium py-6">
            {menuItems.map((item, index) => (
              <li key={index} className="border-b border-border last:border-0 pb-6 last:pb-0">
                {item.hasDropdown ? (
                  <div>
                    <div className="font-semibold text-foreground mb-4">Cars</div>
                    <div className="pl-6 space-y-5">
                      {carSubmenu.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.href}
                          className="block text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setMenuState(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-foreground hover:text-primary transition-colors py-1"
                    onClick={() => setMenuState(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default APPNavBar;