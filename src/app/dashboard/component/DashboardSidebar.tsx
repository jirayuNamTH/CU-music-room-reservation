"use client";
import React from 'react';
import { CalendarDays, Construction, Users, Settings, Home } from "lucide-react";
import { Organization } from '@/app/types/types';
import { OrgSwitcherItem } from '@/lib/shared';
import OrgSwitcher from '@/components/shared/dashboard/OrgSwitcher';
import SidebarButton from './SidebarButton';

interface SidebarProps {
  orgs: OrgSwitcherItem[];
  currentOrg: Organization;
  activeView: string;
  onSelectView: (view: string) => void;
  isOwner: boolean;
}

function DashboardSidebar({ orgs, currentOrg, activeView, onSelectView, isOwner }: SidebarProps) {
  const navItems = [
    { id: 'bookings', label: 'Bookings', icon: CalendarDays },
    { id: 'rooms', label: 'Rooms', icon: Home },
    { id: 'team', label: 'Team', icon: Users, ownerOnly: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="w-64 h-full bg-background border-r flex flex-col">
      {/* Organization Switcher */}
      <div className="p-4 border-b">
        <OrgSwitcher orgs={orgs} currentOrg={currentOrg} />
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4">
        {navItems.map((item) => {
          if (item.ownerOnly && !isOwner) return null;
          return (
            <SidebarButton
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeView === item.id}
              onClick={() => onSelectView(item.id)}
            />
          );
        })}
      </div>
      
      {/* Sidebar Footer (optional) */}
      <div className="p-4 border-t">
        {/* <Button variant="outline" size="sm" className="w-full">Help</Button> */}
      </div>
    </nav>
  );
}

export default DashboardSidebar;

