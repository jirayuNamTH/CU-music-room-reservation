import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { Reservation } from "@/lib/shared";

function PendingBookingsCard({ bookings, isOwner }: { bookings: Reservation[], isOwner: boolean }) {
  return (
    <Card className="border-primary/50 border-2">
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
        <CardDescription>
          These bookings require your review before they are confirmed.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.length === 0 ? (
          <p className="text-muted-foreground">No pending bookings.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-semibold">{booking.room?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.user?.name} ({booking.user?.email})
                </p>
                <p className="text-sm font-medium">{booking.startTime.toLocaleString()}</p>
              </div>
              {isOwner && (
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default PendingBookingsCard;