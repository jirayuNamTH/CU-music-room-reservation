import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import DayTimeline from './DayTimeLine';
import { Reservation } from '@/lib/shared';

function BookingCalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // --- UPDATED: Mock events using Reservation type ---
  const mockDayBookings: Reservation[] = [
    {
      _id: 'b3', roomId: 'room1', organizationId: 'org_acme', userId: 'user_sam',
      startTime: new Date(new Date().setHours(10, 0, 0, 0)),
      endTime: new Date(new Date().setHours(11, 0, 0, 0)),
      status: 'approved', questionAnswers: [], createdAt: new Date(), updatedAt: new Date(),
      user: { name: 'Sam Lee', email: 'sam@example.com' }, room: { name: 'Meeting Room 1' }
    },
    {
      _id: 'e2', roomId: 'room2', organizationId: 'org_acme', userId: 'user_studio',
      startTime: new Date(new Date().setHours(11, 0, 0, 0)),
      endTime: new Date(new Date().setHours(13, 0, 0, 0)), // 2 hour duration
      status: 'approved', questionAnswers: [], createdAt: new Date(), updatedAt: new Date(),
      user: { name: 'Studio Session', email: 'studio@example.com' }, room: { name: 'Podcast Studio A' }
    },
    {
      _id: 'e3', roomId: 'room1', organizationId: 'org_acme', userId: 'user_band',
      startTime: new Date(new Date().setHours(14, 30, 0, 0)), // 2:30 PM
      endTime: new Date(new Date().setHours(16, 0, 0, 0)), // 4:00 PM (1.5h duration)
      status: 'approved', questionAnswers: [], createdAt: new Date(), updatedAt: new Date(),
      user: { name: 'Band Practice', email: 'band@example.com' }, room: { name: 'Main Hall' }
    },
     { 
      _id: 'b1', roomId: 'room2', organizationId: 'org_acme', userId: 'user_alex',
      startTime: new Date(new Date().setHours(16, 0, 0, 0)), // 4:00 PM
      endTime: new Date(new Date().setHours(17, 0, 0, 0)), // 5:00 PM
      status: 'pending', questionAnswers: [], createdAt: new Date(), updatedAt: new Date(),
      user: { name: 'Alex Johnson', email: 'alex@example.com' }, room: { name: 'Podcast Studio A' }
    },
  ];
  // In a real app, you would filter bookings based on the selected `date`
  const filteredBookings = mockDayBookings;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Calendar</CardTitle>
        <CardDescription>Select a date to see the day's schedule.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">
            Schedule for {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '...'}
          </h3>
          {/* --- UPDATED: Pass real bookings to timeline --- */}
          <DayTimeline bookings={filteredBookings} />
        </div>
      </CardContent>
    </Card>
  );
}

export default BookingCalendarView;