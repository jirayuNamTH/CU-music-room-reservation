import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PendingBookingsCard from './PendingBookingsCard';
import AllBookingsCard from './AllBookingsCard';
import { Reservation } from '@/lib/shared';
import BookingCalendarView from './BookingCalendarView';

function BookingsView({ isOwner }: { isOwner: boolean }) {
  // Mock data - replace with API call
  const pendingBookings: Reservation[] = [
    { 
      _id: 'b1', roomId: 'room2', organizationId: 'org_acme', userId: 'user_alex',
      startTime: new Date(Date.now() + 3600000 * 4), // 4 hours from now
      endTime: new Date(Date.now() + 3600000 * 5), // 5 hours from now
      status: 'pending',
      questionAnswers: [{ question: 'Purpose?', answer: 'Podcast recording' }],
      createdAt: new Date(), updatedAt: new Date(),
      user: { name: 'Alex Johnson', email: 'alex@example.com' },
      room: { name: 'Podcast Studio A' }
    },
    { 
      _id: 'b2', roomId: 'room1', organizationId: 'org_acme', userId: 'user_maria',
      startTime: new Date(Date.now() + 86400000 * 1), // Tomorrow
      endTime: new Date(Date.now() + 86400000 * 1 + 3600000 * 2), // Tomorrow + 2 hours
      status: 'pending',
      questionAnswers: [{ question: 'Guests?', answer: 'Approx. 15' }],
      createdAt: new Date(), updatedAt: new Date(),
      user: { name: 'Maria Garcia', email: 'maria@example.com' },
      room: { name: 'Main Hall' }
    },
  ];
  
  const allBookings: (Reservation & { dateStr: string, timeStr: string })[] = [
    { 
      _id: 'b3', roomId: 'room1', organizationId: 'org_acme', userId: 'user_sam',
      startTime: new Date(new Date().setHours(10, 0, 0, 0)),
      endTime: new Date(new Date().setHours(11, 0, 0, 0)),
      status: 'approved', questionAnswers: [], createdAt: new Date(), updatedAt: new Date(),
      user: { name: 'Sam Lee', email: 'sam@example.com' }, room: { name: 'Meeting Room 1' },
      dateStr: 'Today', timeStr: '10:00 AM - 11:00 AM'
    },
    { 
      _id: 'b1', roomId: 'room2', organizationId: 'org_acme', userId: 'user_alex',
      startTime: new Date(Date.now() + 3600000 * 4), endTime: new Date(Date.now() + 3600000 * 5),
      status: 'pending', questionAnswers: [], createdAt: new Date(), updatedAt: new Date(),
      user: { name: 'Alex Johnson', email: 'alex@example.com' }, room: { name: 'Podcast Studio A' },
      dateStr: 'Today', timeStr: '4:00 PM - 5:00 PM'
    },
     { 
      _id: 'b7', roomId: 'room3', organizationId: 'org_acme', userId: 'user_jane',
      startTime: new Date(Date.now() - 86400000 * 2),
      endTime: new Date(Date.now() - 86400000 * 2 + 3600000),
      status: 'rejected', questionAnswers: [], createdAt: new Date(), updatedAt: new Date(),
      user: { name: 'Jane Doe', email: 'jane@example.com' }, room: { name: 'Focus Booth' },
      dateStr: 'Nov 16, 2025', timeStr: '11:00 AM - 12:00 PM'
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Bookings</h1>
      
      {/* Pending Bookings Section */}
      <PendingBookingsCard 
        bookings={pendingBookings} 
        isOwner={isOwner} 
      />
      
      {/* Calendar View - Placeholder */}
      <BookingCalendarView />
      
      {/* All Bookings List */}
      <AllBookingsCard 
        bookings={allBookings} 
      />
    </div>
  );
}

export default BookingsView;