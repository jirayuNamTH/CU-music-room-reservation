"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {  Menu } from "lucide-react";
import { useRouter } from "next/navigation";
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 */}
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-bold text-lg">
          <img src="/korkor.svg" alt="Bookable Logo" className="h-12 w-auto" />
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#search" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Search
          </a>
          <a href="#music-rooms" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Music Rooms
          </a>
          <a href="" className="text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => router.push(`/dashboard`)}>
            Create room
          </a>
          <Button variant="default" size="sm" className="ml-2 font-bold font-color:white" asChild onClick={() => router.push(`/login`)}>
            <a href="/login">Login/Sign up</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background shadow-lg">
          <div className="flex flex-col space-y-2 p-4">
            <a href="#search" className="block rounded-md p-2 text-base font-medium text-muted-foreground hover:bg-muted">
              Search
            </a>
            <a href="#music-rooms" className="block rounded-md p-2 text-base font-medium text-muted-foreground hover:bg-muted">
              Music Rooms
            </a>
            <a href="" className="block rounded-md p-2 text-base font-medium text-muted-foreground hover:bg-muted" onClick={() => router.push(`/dashboard`)}>
              Create room
            </a>
            <Button variant="default" className="w-full justify-center" asChild onClick={() => router.push(`/login`)}>
              <a href="#list-your-space">Login/Sign up</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;