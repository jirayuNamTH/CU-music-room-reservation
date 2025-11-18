import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DayOfWeek, Schedule } from '@/lib/shared'; 

function AvailabilityPreview({ schedule }: { schedule: Schedule }) {
  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayMap: { [key: string]: string } = {
    Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', 
    Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun'
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => (
            <div key={day} className="text-center">
              <Label className="text-xs font-semibold">{dayMap[day]}</Label>
              <div className="h-48 w-full bg-muted rounded-lg mt-1 relative overflow-hidden">
                {/* This is a simple visual block. A real app would be more complex */}
                {schedule[day].enabled && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-green-200 opacity-70 flex items-center justify-center p-1">
                    <p className="text-green-800 text-[10px] font-medium text-center leading-tight">
                      {schedule[day].start}
                      <br />|<br />
                      {schedule[day].end}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default AvailabilityPreview;