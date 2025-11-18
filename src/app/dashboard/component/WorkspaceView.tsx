import React from 'react';
import SettingsView from '@/components/shared/dashboard/SettingView';
import TeamView from '@/components/shared/dashboard/TeamView';
import BookingsView from '@/components/shared/dashboard/booking/BookingsView';
import RoomsView from '@/components/shared/dashboard/room/RoomsView';

interface WorkspaceViewProps {
  activeView: string;
  isOwner: boolean;
}

function WorkspaceView({ activeView, isOwner }: WorkspaceViewProps) {
  switch (activeView) {
    case 'bookings':
      return <BookingsView isOwner={isOwner} />;
    case 'rooms':
      return <RoomsView isOwner={isOwner} />;
    case 'team':
      return isOwner ? <TeamView /> : null;
    case 'settings':
      return <SettingsView isOwner={isOwner} />;
    default:
      return <BookingsView isOwner={isOwner} />;
  }
}

export default WorkspaceView;