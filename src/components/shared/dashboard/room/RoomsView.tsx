import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import RoomCard from './RoomCard';
import RoomSettingsSheet from './RoomSettingsSheet';
import { Room, RoomRules } from '@/lib/shared';

function RoomsView({ isOwner }: { isOwner: boolean }) {
  // Mock data - replace with API call
  const rooms: Room[] = [
    { 
      _id: 'room1', organizationId: 'org_acme', name: 'Main Conference Room', 
      description: 'Large room with projector', location: 'Floor 1, West Wing', capacity: 20, 
      needApproval: true, img: 'https://placehold.co/300x200/e2e8f0/64748b?text=Room+1',
      availableDates: [], rules: {} as RoomRules, questionBox: [], googleCalendar: {} as any,
      createdBy: 'user_123', createdAt: new Date(), updatedAt: new Date()
    },
    { 
      _id: 'room2', organizationId: 'org_acme', name: 'Podcast Studio A', 
      description: 'Soundproofed with 2 mics', location: 'Floor 2, Media Lab', capacity: 4, 
      needApproval: false, img: 'https://placehold.co/300x200/e2e8f0/64748b?text=Room+2',
      availableDates: [], rules: {} as RoomRules, questionBox: [], googleCalendar: {} as any,
      createdBy: 'user_123', createdAt: new Date(), updatedAt: new Date()
    },
    { 
      _id: 'room3', organizationId: 'org_acme', name: 'Focus Booth', 
      description: 'Single-person quiet booth', location: 'Floor 2, Library', capacity: 1, 
      needApproval: false, img: 'https://placehold.co/300x200/e2e8f0/64748b?text=Room+3',
      availableDates: [], rules: {} as RoomRules, questionBox: [], googleCalendar: {} as any,
      createdBy: 'user_123', createdAt: new Date(), updatedAt: new Date()
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rooms</h1>
        {isOwner && (
          <RoomSettingsSheet isOwner={isOwner}>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </RoomSettingsSheet>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} isOwner={isOwner} />
        ))}
      </div>
    </div>
  );
}

export default RoomsView;