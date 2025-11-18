"use client";

import { Button } from "@/components/ui/button";
import { Bolt, CalendarDays, Search } from "lucide-react"; 
import { useRouter } from "next/navigation";

function Features() {
  const router = useRouter();

  return (
    <section id="music-rooms" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Explore Our partner room now.
          </h2>
          <Button variant="default" size="lg" className="flex mb-12 font-bold cursor-pointer" onClick={() => router.push(`/organization`)}>
            Browse Music Rooms
          </Button>
        </div>
        {/* <Button variant="default" size="sm" className="ml-2 font-bold font-color:white" asChild onClick={() => router.push(`/login`)}>
                    <a href="/login">Login/Sign up</a>
                  </Button> */}

      </div>
    </section>
  );
}

export default Features;