import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UsersIcon, CheckCircle } from "lucide-react";
import RoomSettingsSheet from './RoomSettingsSheet';
import { Room } from '@/lib/shared';

function RoomCard({ room, isOwner }: { room: Room, isOwner: boolean }) {
  return (
    <Card className="overflow-hidden">
      <img src={room.img} alt={room.name} className="h-48 w-full object-cover" />
      <CardHeader>
        <CardTitle className="truncate">{room.name}</CardTitle>
        <CardDescription className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <UsersIcon className="h-4 w-4" /> {room.capacity}
          </span>
          <span className={`flex items-center gap-1 ${room.needApproval ? 'text-yellow-600' : 'text-green-600'}`}>
            {room.needApproval ? <CheckCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            {room.needApproval ? 'Approval Req.' : 'Instant Book'}
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <RoomSettingsSheet room={room} isOwner={isOwner}>
          <Button variant="outline" className="w-full">
            {isOwner ? 'Edit' : 'View'} Settings
          </Button>
        </RoomSettingsSheet>
      </CardFooter>
    </Card>
  );
}

export default RoomCard; 