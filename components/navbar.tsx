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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-14 items-center justify-between">
        {/* Mobile Menu Button - Left */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-accent/50 transition-colors duration-300"
          >
            {isOpen ? (
              <X className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
            ) : (
              <Menu className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
            )}
          </Button>
        </div>

        {/* Logo */}
        <Link href="/" className="font-pacifico text-xl relative group">
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-700 bg-clip-text text-transparent hover:opacity-90 transition-opacity duration-300">
            Sahil Kumar Singh
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-700 group-hover:w-full transition-all duration-300"></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
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
        </div>

        {/* Theme Toggle - Right */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "container md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col space-y-2 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base px-4 py-2 rounded-md transition-all duration-300",
                pathname === link.href
                  ? "text-primary-foreground bg-accent"
                  : "text-muted-foreground hover:text-primary hover:bg-accent/30"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}