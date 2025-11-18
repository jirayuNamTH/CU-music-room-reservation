import { Reservation, ReservationStatus } from "@/lib/shared";
import React from "react";

function DayTimeline({ bookings }: { bookings: Reservation[] }) {
  // Generate hours from 8 AM to 8 PM
  const START_HOUR = 8;
  const END_HOUR = 20; // 8 PM
  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR); // 8, 9, ... 19
  
  // Each 1-hour slot is 4rem (64px) high
  const ROW_HEIGHT_PX = 64; 

  /**
   * Calculates the top and height for an event.
   */
  const getEventPosition = (startTime: Date, endTime: Date) => {
    const startTotalMinutes = (startTime.getHours() * 60) + startTime.getMinutes();
    const endTotalMinutes = (endTime.getHours() * 60) + endTime.getMinutes();
    
    const startOffsetMinutes = (START_HOUR * 60);

    // Calculate top position
    const top = ((startTotalMinutes - startOffsetMinutes) / 60) * ROW_HEIGHT_PX;
    
    // Calculate height
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    const height = (durationMinutes / 60) * ROW_HEIGHT_PX;
    
    // Check if event is outside the visible range
    if (endTotalMinutes < startOffsetMinutes || startTotalMinutes > (END_HOUR * 60)) {
      return null;
    }
    
    return { top: Math.max(0, top), height };
  };

  const eventColors = [
    'bg-blue-600 border-blue-800', 
    'bg-green-600 border-green-800', 
    'bg-purple-600 border-purple-800', 
    'bg-yellow-600 border-yellow-800', 
    'bg-pink-600 border-pink-800'
  ];

  const getStatusColor = (status: ReservationStatus, baseColor: string) => {
    if (status === 'pending') {
      // Return a striped/transparent version
      return `${baseColor.split(' ')[0]} opacity-70 border-2 border-dashed ${baseColor.split(' ')[1]}`;
    }
    return `${baseColor} opacity-90`; // Solid
  }

  return (
    <div className="max-h-96 overflow-y-auto bg-background rounded-lg border">
      <div className="relative grid" style={{ gridTemplateColumns: 'auto 1fr' }}>
        {/* Hour markers & Grid Lines */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* Hour Label */}
            <div className="col-start-1 text-right pr-2 -mt-2.5">
              <span className="text-xs text-muted-foreground">
                {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
              </span>
            </div>
            {/* 1-hour grid cell */}
            <div className="col-start-2 border-t border-r border-dashed" style={{ height: `${ROW_HEIGHT_PX}px` }} />
          </React.Fragment>
        ))}
        {/* Final hour line */}
        <div className="col-start-1"></div>
        <div className="col-start-2 h-0 border-t border-r border-dashed" />

        {/* Events Container */}
        <div className="absolute col-start-2 row-start-1" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          {bookings.map((booking, index) => {
            const pos = getEventPosition(booking.startTime, booking.endTime);
            if (!pos) return null; // Don't render events outside the visible time

            const baseColor = eventColors[index % eventColors.length];
            const colorClasses = getStatusColor(booking.status, baseColor);

            return (
              <div
                key={booking._id}
                className={`absolute left-1 right-1 text-white p-1 rounded shadow overflow-hidden ${colorClasses}`}
                style={{
                  top: `${pos.top}px`,
                  height: `${pos.height}px`,
                  zIndex: 10 + index,
                }}
              >
                <p className="text-xs font-semibold truncate">{booking.room?.name || 'Booking'}</p>
                <p className="text-[10px] truncate">{booking.user?.name}</p>
                <p className="text-[10px] truncate opacity-80">
                  {booking.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                  {booking.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DayTimeline;