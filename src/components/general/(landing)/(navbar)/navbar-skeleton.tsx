import { Skeleton } from "@/components/ui/skeleton";

const NavbarSkeleton = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Skeleton className="h-9 w-40 rounded-lg" />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Skeleton className="h-9 w-9 rounded-xl" />

          {/* Booking Icon */}
          <Skeleton className="hidden lg:block h-9 w-9 rounded-xl" />

          {/* User Avatar / Login Button */}
          <Skeleton className="h-9 w-24 rounded-xl lg:hidden" />
          <Skeleton className="hidden lg:block h-9 w-9 rounded-full" />

          {/* Mobile Menu */}
          <Skeleton className="lg:hidden h-9 w-9 rounded-xl" />
        </div>
      </nav>
    </header>
  );
};

export default NavbarSkeleton;