"use client";

import React, { useState, useMemo, ReactNode } from 'react';
// --- In a real app, you would use these ---
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// --- Shadcn/ui Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// --- NEW Imports for Dialog and Form ---
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// --- Lucide Icons ---
import {
  Users, MapPin, Clock, CalendarDays, ArrowLeft, Building, UsersIcon, CheckCircle
} from "lucide-react";
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

// --- TYPES (Mocked from libs/share.ts) ---
// We'll use the same types you provided
export type OrgRole = "admin" | "staff";
export type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export interface OrganizationMember {
  userId: string;
  role: OrgRole;
}

export interface Organization {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  members: OrganizationMember[];
  createdAt: Date;
  updatedAt: Date;
  // Mock field for UI
  img?: string;
}

export interface AvailableDate {
  dayOfWeek: DayOfWeek[];
  startTime: string; // "09:00"
  endTime: string; // "17:00"
}

// --- NEW: Added questionBox to Room type ---
export interface Question {
  question: string;
  required: boolean;
}

export interface Room {
  _id: string;
  organizationId: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  needApproval: boolean;
  availableDates: AvailableDate[];
  questionBox: Question[]; // <-- ADDED THIS
  // Mock field for UI
  img?: string;
}

export interface Reservation {
  _id: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
}
// --- END MOCK TYPES ---


// --- MOCK DATA ---
const mockOrgs: Organization[] = [
  {
    _id: 'org_acme',
    name: 'Acme Music Club',
    description: 'The best music club in town. We provide top-tier rooms.',
    img: 'https://placehold.co/400x200/6366f1/e0e7ff?text=Acme+Music',
    createdBy: 'user_123',
    members: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'org_beta',
    name: 'Beta Sound Hub',
    description: 'A community-driven sound hub for all artists.',
    img: 'https://placehold.co/400x200/10b981/d1fae5?text=Beta+Sound',
    createdBy: 'user_999',
    members: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'org_gamma',
    name: 'Gamma Rehearsals',
    description: 'Affordable rehearsal spaces, 24/7 access.',
    img: 'https://placehold.co/400x200/f59e0b/fef3c7?text=Gamma',
    createdBy: 'user_888',
    members: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const mockRooms: Room[] = [
  { 
    _id: 'room1', organizationId: 'org_acme', name: 'Main Conference Room', 
    description: 'Large room with projector', location: 'Floor 1, West Wing', capacity: 20, 
    needApproval: true, img: 'https://placehold.co/300x200/e2e8f0/64748b?text=Room+1',
    availableDates: [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], startTime: '09:00', endTime: '17:00' }
    ],
    questionBox: [ // Questions for this room
      { question: 'What is the purpose of this meeting?', required: true },
      { question: 'How many attendees (max 20)?', required: true }
    ]
  },
  { 
    _id: 'room2', organizationId: 'org_acme', name: 'Podcast Studio A', 
    description: 'Soundproofed with 2 mics', location: 'Floor 2, Media Lab', capacity: 4, 
    needApproval: false, img: 'https://placehold.co/300x200/e2e8f0/64748b?text=Room+2',
    availableDates: [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], startTime: '10:00', endTime: '20:00' }
    ],
    questionBox: [ // Questions for this room
      { question: 'Will you need our audio engineer?', required: false }
    ]
  },
];

// Mock bookings for 'Podcast Studio A' (room2)
const mockBookings: Reservation[] = [
  {
    _id: 'b1',
    roomId: 'room2',
    startTime: new Date(new Date().setHours(11, 0, 0, 0)), // Today at 11:00 AM
    endTime: new Date(new Date().setHours(12, 0, 0, 0)), // Today at 12:00 PM
  },
  {
    _id: 'b2',
    roomId: 'room2',
    startTime: new Date(new Date().setHours(14, 0, 0, 0)), // Today at 2:00 PM
    endTime: new Date(new Date().setHours(16, 0, 0, 0)), // Today at 4:00 PM
  }
];
// --- END MOCK DATA ---


// --- MAIN FLOW COMPONENT ---
export default function SearchAndBookingFlow() {
  const [view, setView] = useState<'search' | 'org' | 'room'>('search');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleSelectOrg = (org: Organization) => {
    setSelectedOrg(org);
    setView('org');
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setView('room');
  };

  const handleBack = () => {
    if (view === 'room') {
      setView('org');
      setSelectedRoom(null);
    } else if (view === 'org') {
      setView('search');
      setSelectedOrg(null);
    }
  };

  const handleBookingComplete = () => {
    // After booking, go back to the org page
    alert("Booking Submitted!");
    setView('org');
    setSelectedRoom(null);
  }
  
  // This mimics the Next.js router
  return (
    <div>
      <Header />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {view === 'search' && (
            <SearchPage onSelectOrg={handleSelectOrg} />
          )}
          {view === 'org' && selectedOrg && (
            <OrganizationPage 
              org={selectedOrg} 
              onSelectRoom={handleSelectRoom} 
              onBack={handleBack} 
            />
          )}
          {view === 'room' && selectedRoom && (
            <BookingPage 
              room={selectedRoom} 
              onBack={handleBack}
              onBookingComplete={handleBookingComplete} // Pass handler
            />
          )}
        </div>
      <Footer />
    </div>
  );
}


// --- 1. SEARCH PAGE ---
function SearchPage({ onSelectOrg }: { onSelectOrg: (org: Organization) => void }) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Explore Organizations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOrgs.map(org => (
          <OrgCard key={org._id} org={org} onClick={() => onSelectOrg(org)} />
        ))}
      </div>
    </div>
  );
}

function OrgCard({ org, onClick }: { org: Organization, onClick: () => void }) {
  return (
    <Card 
      onClick={onClick}
      className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <img 
        src={org.img || 'https://placehold.co/400x200'} 
        alt={org.name} 
        className="h-40 w-full object-cover rounded-t-lg"
      />
      <CardHeader>
        <CardTitle className="truncate">{org.name}</CardTitle>
        <CardDescription className="line-clamp-2 h-[40px]">
          {org.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button variant="outline" className="w-full">
          View Rooms
        </Button>
      </CardFooter>
    </Card>
  );
}


// --- 2. ORGANIZATION PAGE ---
function OrganizationPage({ org, onSelectRoom, onBack }: {
  org: Organization;
  onSelectRoom: (room: Room) => void;
  onBack: () => void;
}) {
  // Filter rooms for this org
  const rooms = mockRooms.filter(r => r.organizationId === org._id);
  
  return (
    <div className="space-y-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all organizations
      </Button>
      
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 border">
          <AvatarImage src={org.img} />
          <AvatarFallback>{org.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{org.name}</h1>
          <p className="text-lg text-muted-foreground">{org.description}</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.length > 0 ? (
          rooms.map(room => (
            <ClientRoomCard 
              key={room._id} 
              room={room} 
              onClick={() => onSelectRoom(room)} 
            />
          ))
        ) : (
          <p className="text-muted-foreground">No rooms available for this organization.</p>
        )}
      </div>
    </div>
  );
}

function ClientRoomCard({ room, onClick }: { room: Room, onClick: () => void }) {
  return (
    <Card 
      onClick={onClick}
      className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img 
        src={room.img || 'https://placehold.co/300x200'} 
        alt={room.name} 
        className="h-48 w-full object-cover rounded-t-lg"
      />
      <CardHeader>
        <CardTitle className="truncate">{room.name}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <UsersIcon className="h-4 w-4" /> {room.capacity}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {room.location}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 h-[40px]">
          {room.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}


// --- 3. BOOKING PAGE (with Time Slot Picker) ---
function BookingPage({ room, onBack, onBookingComplete }: {
  room: Room;
  onBack: () => void;
  onBookingComplete: () => void; // New prop
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {mockOrgs.find(o => o._id === room.organizationId)?.name}
      </Button>
      
      <h1 className="text-3xl font-bold">Book: {room.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Calendar */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            // You can add logic here to disable non-available days
          />
        </div>
        
        {/* Right Side: Time Slot Picker */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Select a Time</h2>
          <TimeSlotPicker 
            key={selectedDate?.toISOString()} // Force re-render on date change
            selectedDate={selectedDate || new Date()} 
            room={room} 
            bookings={mockBookings.filter(b => b.roomId === room._id)}
            onBookingComplete={onBookingComplete} // Pass handler down
          />
        </div>
      </div>
    </div>
  );
}

// --- UPDATED TIME SLOT PICKER COMPONENT ---

interface TimeSlotPickerProps {
  selectedDate: Date;
  room: Room;
  bookings: Reservation[];
  onBookingComplete: () => void; // New prop
}

function TimeSlotPicker({ selectedDate, room, bookings, onBookingComplete }: TimeSlotPickerProps) {
  // --- UPDATED: State for multiple slots ---
  const [selectedSlots, setSelectedSlots] = useState<Date[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dayMap: DayOfWeek[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // 1. Generate all possible time slots for the selected date
  const timeSlots = useMemo(() => {
    const slots: { time: Date, isAvailable: boolean }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if selected date is in the past
    if (selectedDate < today) {
      return []; // No slots for past dates
    }

    // Get availability for the selected day of the week
    const dayOfWeek = dayMap[selectedDate.getDay()];
    const availability = room.availableDates.find(d => d.dayOfWeek.includes(dayOfWeek));

    if (!availability) {
      return []; // Room is closed on this day
    }
    
    const slotDuration = 60; // 60 minutes
    const [startHour, startMin] = availability.startTime.split(':').map(Number);
    const [endHour, endMin] = availability.endTime.split(':').map(Number);
    
    let currentSlot = new Date(selectedDate);
    currentSlot.setHours(startHour, startMin, 0, 0);
    
    const endTime = new Date(selectedDate);
    endTime.setHours(endHour, endMin, 0, 0);

    const now = new Date();
    
    while(currentSlot < endTime) {
      const slotTime = new Date(currentSlot);
      
      // Check if slot is already booked
      const isBooked = bookings.some(booking => 
        slotTime >= booking.startTime && slotTime < booking.endTime
      );
      
      // Check if slot is in the past (e.g., today at 9 AM when it's already 11 AM)
      const isPast = slotTime < now;
      
      slots.push({
        time: slotTime,
        isAvailable: !isBooked && !isPast
      });
      
      // Move to the next slot
      currentSlot.setMinutes(currentSlot.getMinutes() + slotDuration);
    }
    
    return slots;
    
  }, [selectedDate, room.availableDates, bookings]);

  // --- NEW: Handler for toggling slots ---
  const handleToggleSlot = (time: Date) => {
    setSelectedSlots(prev => {
      const isSelected = prev.some(slot => slot.getTime() === time.getTime());
      if (isSelected) {
        // Filter out (deselect)
        return prev.filter(slot => slot.getTime() !== time.getTime());
      } else {
        // Add to selection and sort
        const newSlots = [...prev, time];
        newSlots.sort((a, b) => a.getTime() - b.getTime());
        return newSlots;
      }
    });
  };

  if (timeSlots.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8 border rounded-lg bg-muted">
        <p className="text-muted-foreground">No available slots for this day.</p>
      </div>
    );
  }

  return (
    // --- UPDATED: Wraps picker and button ---
    <div className="border rounded-lg h-[450px] flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map(({ time, isAvailable }) => {
            const isSelected = selectedSlots.some(slot => slot.getTime() === time.getTime());
            return (
              <Button
                key={time.toISOString()}
                variant={isSelected ? "default" : "outline"}
                disabled={!isAvailable}
                onClick={() => handleToggleSlot(time)}
              >
                {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* --- NEW: Book button and Dialog --- */}
      {selectedSlots.length > 0 && (
        <div className="p-4 border-t bg-background sticky bottom-0">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg">
                Book {selectedSlots.length} Slot(s)
              </Button>
            </DialogTrigger>
            <DialogContent>
              <BookingFormDialog 
                room={room}
                selectedSlots={selectedSlots}
                onClose={() => setDialogOpen(false)}
                onBookingComplete={onBookingComplete}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

// --- NEW BOOKING FORM DIALOG COMPONENT ---

interface BookingFormDialogProps {
  room: Room;
  selectedSlots: Date[];
  onClose: () => void;
  onBookingComplete: () => void;
}

function BookingFormDialog({ room, selectedSlots, onClose, onBookingComplete }: BookingFormDialogProps) {
  // State to hold answers, e.g., { "Question text": "My answer" }
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for required questions
    for (const q of room.questionBox) {
      if (q.required && !answers[q.question]) {
        alert(`Please answer the required question: "${q.question}"`);
        return;
      }
    }
    
    // --- API CALL WOULD GO HERE ---
    console.log("Submitting booking with:", {
      roomId: room._id,
      slots: selectedSlots,
      answers: answers,
    });
    
    // On success:
    onBookingComplete(); // Call the handler from the top
    onClose(); // Close this dialog
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Book: {room.name}</DialogTitle>
        <DialogDescription>
          Please provide the following information to complete your booking.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        {/* Selected Slots */}
        <div>
          <Label className="font-semibold">Selected Slots</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedSlots.map(slot => (
              <Badge key={slot.toISOString()} variant="secondary">
                {slot.toLocaleDateString()} @ {slot.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </Badge>
            ))}
          </div>
        </div>

        {/* Dynamic Questions */}
        {room.questionBox.length > 0 && (
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
            {room.questionBox.map((q, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`q-${index}`}>
                  {q.question}
                  {q.required && <span className="text-destructive">*</span>}
                </Label>
                <Input
                  id={`q-${index}`}
                  value={answers[q.question] || ""}
                  onChange={(e) => handleAnswerChange(q.question, e.target.value)}
                  placeholder="Your answer..."
                  required={q.required}
                />
              </div>
            ))}
          </form>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit" form="booking-form">
          Submit Booking
        </Button>
      </DialogFooter>
    </>
  );
}