import React from 'react';
import { Bolt } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <Bolt className="h-6 w-6 text-foreground" />
            <span className="font-bold text-lg">Bookable</span>
          </div>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</a>
            <a href="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</a>
            <a href="/support" className="text-sm text-muted-foreground hover:text-foreground">Support</a>
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bookable, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;