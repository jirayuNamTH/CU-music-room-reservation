import { LucideIcon } from "lucide-react";

export type UserRole = "user" | "staff" | "admin";
export type OrgRole = "admin" | "staff";
export type ReservationStatus = "pending" | "approved" | "rejected" | "cancelled";
export type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export interface OrganizationMember {
  userId: string;
  role: OrgRole;
}

export interface User {
  _id: string;
  googleId: string;
  email: string;
  name: string;
  role: UserRole;
  organizations: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  members: OrganizationMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailableDate {
  dayOfWeek: DayOfWeek[];
  startTime: string;
  endTime: string;
}

export interface RoomRules {
  minAdvanceHours: number;
  maxHoursPerBooking: number;
  allowedUserType: string[];
  customConditions: { condition: string, autoApprove: boolean }[];
}

export interface Question {
  question: string;
  required: boolean;
}

export interface Room {
  _id: string;
  organizationId: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  needApproval: boolean;
  availableDates: AvailableDate[];
  rules: RoomRules;
  questionBox: Question[];
  googleCalendar: { calendarId: string, syncEnabled: boolean };
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  // Non-schema fields for mock UI
  img?: string; 
}

export interface Reservation {
  _id: string;
  roomId: string;
  organizationId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
  questionAnswers: { question: string, answer: string }[];
  createdAt: Date;
  updatedAt: Date;
  // Populated fields for mock UI
  user?: { name: string, email: string };
  room?: { name: string };
}

// Simple types for mock data not in share.ts
export interface Equipment {
  id: string;
  name: string;
}
export interface Contact {
  id: string;
  type: 'email' | 'phone' | 'website';
  value: string;
  icon: LucideIcon;
}
export interface PopulatedMember {
  id: string;
  name: string;
  email: string;
  role: OrgRole;
}
export interface OrgSwitcherItem {
  orgId: string;
  name: string;
}
export type Schedule = {
  [key in DayOfWeek]: {
    enabled: boolean;
    start: string;
    end: string;
  }
}