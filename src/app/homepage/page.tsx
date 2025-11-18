"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Feather, Search } from "lucide-react";
import Header from '@/components/shared/Header';
import Hero from '@/components/shared/homepage/Hero';
import Features from '@/components/shared/homepage/MusicRoomCard';
import Footer from '@/components/shared/Footer';

function Homepage() {

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
    ); 
}

export default Homepage;