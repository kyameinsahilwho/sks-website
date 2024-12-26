"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "Read Me" },
  { href: "/wallpapers", label: "Wallpapers" },
  { href: "/reach-out", label: "Reach Out" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blogs", label: "Blogs" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-pacifico text-2xl relative group">
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-700 bg-clip-text text-transparent hover:opacity-90 transition-opacity duration-300">
            Sahil Kumar Singh
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-700 group-hover:w-full transition-all duration-300"></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-2 text-sm font-medium transition-colors group",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                  pathname === link.href && "scale-x-100"
                )}
              ></span>
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-accent/50 transition-colors duration-300"
          >
            {isOpen ? (
              <X className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "container md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col space-y-4 pb-6 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-lg px-4 py-2 rounded-md transition-all duration-300",
                pathname === link.href
                  ? "text-primary bg-accent/50"
                  : "text-muted-foreground hover:text-primary hover:bg-accent/30"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 px-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
