'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ModeToggle } from './Modetoggle';

const Navbar = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Templates", href: "/templates" },
    { name: "About", href: "/about" },
  ];

  const activeStyle = "text-primary font-semibold";

  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-10 border-b bg-background sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold tracking-tight">
        CraftMyCV<span className="text-primary">.</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition hover:text-primary ${pathname === link.href ? activeStyle : ""}`}
          >
            {link.name}
          </Link>
        ))}
        <ModeToggle />
        {isAuthenticated ? (
          <>
            <span className="text-sm text-muted-foreground">Hi, {user?.given_name}</span>
            <LogoutLink>
              <Button variant="outline" size="sm">Logout</Button>
            </LogoutLink>
          </>
        ) : (
          <>
            <LoginLink>
              <Button variant="ghost" size="sm">Login</Button>
            </LoginLink>
            <RegisterLink>
              <Button size="sm">Sign Up</Button>
            </RegisterLink>
          </>
        )}
      </nav>

      {/* Mobile Nav */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
        <SheetTitle className="text-lg font-semibold"> Craft My CV</SheetTitle>
          <nav className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${pathname === link.href ? activeStyle : ""}`}
              >
                {link.name}
              </Link>
            ))}
            <ModeToggle />
            <div className="mt-4">
              {isAuthenticated ? (
                <LogoutLink>
                  <Button variant="outline" className="w-full">Logout</Button>
                </LogoutLink>
              ) : (
                <>
                  <LoginLink>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button className="w-full mt-2">Sign Up</Button>
                  </RegisterLink>
                </>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
