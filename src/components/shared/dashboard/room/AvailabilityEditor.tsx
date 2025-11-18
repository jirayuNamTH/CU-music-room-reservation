import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DayOfWeek, Schedule } from '@/lib/shared'; 

interface AvailabilityEditorProps {
  schedule: Schedule;
  onScheduleChange: (day: DayOfWeek, field: string, value: string | boolean) => void;
  isOwner: boolean;
}

function AvailabilityEditor({ schedule, onScheduleChange, isOwner }: AvailabilityEditorProps) {
  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <p className="text-sm text-muted-foreground">Set the hours your room is available for booking.</p>
      {days.map(day => {
        const daySchedule = schedule[day];
        return (
          <div key={day} className="flex items-center gap-2">
            <Checkbox 
              id={`check-${day}`} 
              checked={daySchedule.enabled}
              onCheckedChange={(checked) => onScheduleChange(day, 'enabled', !!checked)}
              disabled={!isOwner}
            />
            <Label htmlFor={`check-${day}`} className="w-24">{day}</Label>
            <Input 
              type="time" 
              value={daySchedule.start}
              onChange={(e) => onScheduleChange(day, 'start', e.target.value)}
              className="w-28"
              disabled={!isOwner || !daySchedule.enabled}
            />
            <span>-</span>
            <Input 
              type="time" 
              value={daySchedule.end}
              onChange={(e) => onScheduleChange(day, 'end', e.target.value)}
              className="w-28"
              disabled={!isOwner || !daySchedule.enabled}
            />
          </div>
        );
      })}
    </div>
  );
}

export default AvailabilityEditor;