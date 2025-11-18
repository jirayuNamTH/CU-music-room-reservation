import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function Hero() {
  return (
    <section id="search" className="py-24 sm:py-32 lg:py-40 bg-muted">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground">
          Find and reserve your session!.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          From meeting rooms to music studios, discover and book the perfect space for any activity, all in one place.
        </p>
        
        {/* Search Bar */}
        <div className="mt-10 max-w-2xl mx-auto">
          <form className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="Enter the studio or organization name"
              className="h-12 text-base flex-grow"
            />
            <Button type="submit" size="lg" className="h-12 text-base sm:w-auto">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Hero;