import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageIcon, PlusCircle, Trash2 } from "lucide-react";
import { useState } from 'react';   
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { DayOfWeek, Equipment, Question, Room, Schedule } from '@/lib/shared';
import AvailabilityEditor from './AvailabilityEditor';
import AvailabilityPreview from './AvailabilityPreview';


interface RoomSettingsSheetProps {
  room?: Room;
  isOwner: boolean;
  children: ReactNode;
}

function RoomSettingsSheet({ room, isOwner, children }: RoomSettingsSheetProps) {
  const isNew = !room;
  const [activeTab, setActiveTab] = useState('general');

  // Mock data for equipment list
  const allEquipment: Equipment[] = [
    { id: 'eq1', name: 'Whiteboard' }, { id: 'eq2', name: 'Projector' },
    { id: 'eq3', name: 'TV Screen' }, { id: 'eq4', name: 'Microphone (Shure SM7B)' },
    { id: 'eq5', name: 'Audio Interface' }, { id: 'eq6', name: 'Conference Phone' },
  ];
  
  // Mock data for questions
  const [questions, setQuestions] = useState<Question[]>(
    room?.questionBox || [
      { question: 'What is the purpose of this booking?', required: true },
      { question: 'How many guests will you have?', required: false },
    ]
  );
  
  // --- NEW STATE for Availability ---
  const initialSchedule: Schedule = {
    Sunday: { enabled: false, start: '09:00', end: '17:00' },
    Monday: { enabled: true, start: '09:00', end: '17:00' },
    Tuesday: { enabled: true, start: '09:00', end: '17:00' },
    Wednesday: { enabled: true, start: '09:00', end: '17:00' },
    Thursday: { enabled: true, start: '09:00', end: '17:00' },
    Friday: { enabled: true, start: '09:00', end: '17:00' },
    Saturday: { enabled: false, start: '09:00', end: '17:00' },
  };
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule);

  const handleScheduleChange = (day: DayOfWeek, field: string, value: string | boolean) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };
  // --- END NEW STATE ---

  const addQuestion = () => {
    setQuestions([...questions, { question: '', required: false }]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>{isNew ? 'Create New Room' : 'Room Settings'}</SheetTitle>
          <SheetDescription>
            {isNew ? 'Set up a new bookable room for your organization.' : `Manage settings for ${room?.name}.`}
          </SheetDescription>
        </SheetHeader>
        
        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="flex gap-4 -mb-px">
            <button
              className={`py-3 px-4 text-sm font-medium ${activeTab === 'general' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button
              className={`py-3 px-4 text-sm font-medium ${activeTab === 'booking' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('booking')}
            >
              Booking
            </button>
            <button
              className={`py-3 px-4 text-sm font-medium ${activeTab === 'availability' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('availability')}
            >
              Availability
            </button>
          </nav>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto space-y-6 p-1">
          {activeTab === 'general' && (
            <div className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <div className="h-40 w-full bg-muted rounded-lg flex items-center justify-center">
                  <Button variant="outline" size="sm" disabled={!isOwner}>
                    <ImageIcon className="h-4 w-4 mr-2" /> Upload Image
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room-name">Room Name</Label>
                <Input id="room-name" defaultValue={room?.name} disabled={!isOwner} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue={room?.location} placeholder="e.g. Floor 2, Media Lab" disabled={!isOwner} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" type="number" defaultValue={room?.capacity} placeholder="e.g. 10" disabled={!isOwner} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Equipment List</Label>
                <div className="grid grid-cols-2 gap-2">
                  {allEquipment.map(eq => (
                    <div key={eq.id} className="flex items-center gap-2">
                      <Checkbox id={eq.id} disabled={!isOwner} />
                      <Label htmlFor={eq.id} className="font-normal">{eq.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'booking' && (
            <div className="space-y-6 pt-6">
              {/* Item 1: Require Approval */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="approval-switch" className="font-semibold">Require Approval</Label>
                  <p className="text-sm text-muted-foreground">Manually approve bookings before they are confirmed.</p>
                </div>
                <Switch id="approval-switch" defaultChecked={room?.needApproval} disabled={!isOwner} />
              </div>

              {/* Item 2: Booking Questions */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Booking Questions</Label>
                {questions.map((q, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded-md">
                    <Label htmlFor={`q-${index}`}>Question {index + 1}</Label>
                    <Input id={`q-${index}`} defaultValue={q.question} placeholder="e.g. What is the meeting topic?" disabled={!isOwner} />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`q-${index}-req`} checked={q.required} disabled={!isOwner} />
                        <Label htmlFor={`q-${index}-req`} className="font-normal">Required</Label>
                      </div>
                      {isOwner && <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                    </div>
                  </div>
                ))}
                {isOwner && <Button variant="outline" size="sm" onClick={addQuestion}><PlusCircle className="h-4 w-4 mr-2" /> Add Question</Button>}
              </div>

              {/* Item 3: Custom Conditions */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Custom Conditions</Label>
                <div className="p-4 border rounded-lg space-y-3">
                  <p className="text-sm text-muted-foreground">Only allow booking from users who match these conditions.</p>
                  <div className="flex gap-2">
                    <Select defaultValue="email" disabled={!isOwner}>
                      <SelectTrigger className="w-1/3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="answer">Answer to...</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="...ends with @acme.com" className="flex-1" disabled={!isOwner} />
                  </div>
                  {isOwner && <Button variant="outline" size="sm"><PlusCircle className="h-4 w-4 mr-2" /> Add Condition</Button>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="space-y-6 pt-6">
               <div className="space-y-4">
                <Label className="text-lg font-semibold">Available Times</Label>
                {/* --- NEW: Updated AvailabilityEditor --- */}
                <AvailabilityEditor 
                  schedule={schedule}
                  onScheduleChange={handleScheduleChange}
                  isOwner={isOwner} 
                />
              </div>
              
               <div className="space-y-4">
                <Label className="text-lg font-semibold">Booking Rules</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minimum advance time</Label>
                    <Input placeholder="e.g. 4 hours" disabled={!isOwner} />
                  </div>
                  <div className="space-y-2">
                    <Label>Max booking length</Label>
                    <Input placeholder="e.g. 2 hours" disabled={!isOwner} />
                  </div>
                  <div className="space-y-2">
                    <Label>Buffer time between</Label>
                    <Input placeholder="e.g. 15 minutes" disabled={!isOwner} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Availability Preview</Label>
                {/* --- NEW: Replaced placeholder with AvailabilityPreview --- */}
                <AvailabilityPreview schedule={schedule} />
              </div>
            </div>
          )}
        </div>
        
        {isOwner && (
          <SheetFooter className="mt-auto pt-4 border-t">
            <SheetClose asChild>
              <Button variant="ghost">Cancel</Button>
            </SheetClose>
            <Button>{isNew ? 'Create Room' : 'Save Changes'}</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default RoomSettingsSheet;  