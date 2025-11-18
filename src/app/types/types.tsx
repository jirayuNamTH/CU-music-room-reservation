// --- Type Aliases (สำหรับค่าที่เป็นไปได้) ---

/**
 * บทบาทของผู้ใช้งานในระบบ
 * user: ผู้ใช้งานทั่วไป
 * staff: เจ้าหน้าที่ขององค์กร
 * admin: ผู้ดูแลระบบ (อาจหมายถึง admin ขององค์กร หรือ admin สูงสุดของระบบ)
 */
export type UserRole = "user" | "staff" | "admin";

/**
 * บทบาทของสมาชิกในองค์กร
 * admin: ผู้ดูแลองค์กร (Owner)
 * staff: เจ้าหน้าที่
 */
export type OrgRole = "admin" | "staff";

/**
 * สถานะของการจอง
 * pending: รอดำเนินการ
 * approved: ได้รับการอนุมัติ
 * rejected: ถูกปฏิเสธ
 * cancelled: ถูกยกเลิก
 */
export type ReservationStatus = "pending" | "approved" | "rejected" | "cancelled";

/**
 * ประเภทของเหตุการณ์ในการแจ้งเตือน
 */
export type NotificationEvent = "reserve_created" | "reserve_approved" | "reserve_rejected" | "reserve_cancelled";

/**
 * สถานะการส่งการแจ้งเตือน
 */
export type NotificationStatus = "sent" | "failed";

/**
 * ประเภทของการดำเนินการใน Log
 */
export type LogAction = "createRoom" | "updateRoom" | "reserve" | "approve" | "cancel";

/**
 * วันในสัปดาห์ (แนะนำให้ใช้ค่าที่เจาะจง)
 */
export type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";


// --- Sub-interfaces (Interfaces ย่อยที่ใช้ประกอบ) ---

/**
 * ข้อมูลสมาชิกใน OrganizationSchema
 */
export interface OrganizationMember {
  userId: string; // ObjectId
  role: OrgRole;
}

/**
 * ข้อมูลวัน-เวลาที่ห้องว่างใน roomSchema
 */
export interface AvailableDate {
  dayOfWeek: DayOfWeek[]; // แนะนำให้ใช้ DayOfWeek[] แทน string[]
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "17:00"
}

/**
 * เงื่อนไขแบบกำหนดเองใน roomSchema
 */
export interface CustomCondition {
  condition: string;
  autoApprove: boolean;
}

/**
 * กฎการจองใน roomSchema
 */
export interface RoomRules {
  minAdvanceHours: number;
  maxHoursPerBooking: number;
  allowedUserType: string[];
  customConditions: CustomCondition[];
}

/**
 * คำถามสำหรับผู้จองใน roomSchema
 */
export interface Question {
  question: string;
  required: boolean;
}

/**
 * การเชื่อมต่อ Google Calendar ใน roomSchema
 */
export interface GoogleCalendarSync {
  calendarId: string;
  syncEnabled: boolean;
}

/**
 * คำตอบสำหรับคำถามใน reservationSchema
 */
export interface QuestionAnswer {
  question: string;
  answer: string;
}

/**
 * ข้อมูลเจ้าหน้าที่ผู้รับผิดชอบใน reservationSchema
 */
export interface AssignedStaff {
  staffId: string; // ObjectId
  name: string;
  email: string;
}

/**
 * ประวัติการอนุมัติใน reservationSchema
 */
export interface ApprovalLog {
  approvedBy: string; // ObjectId
  status: "approved" | "rejected";
  timestamp: Date;
  note: string;
}

/**
 * ข้อมูลผู้ส่งใน notificationSchema
 */
export interface NotificationSender {
  userId: string; // ObjectId
  name: string;
  email: string;
}


// --- Main Interfaces (Schema หลัก) ---

/**
 * 1. userSchema - เก็บส่วนข้อมูลของผู้ใช้งานประเภท ต่าง ๆ
 */
export interface User {
  _id: string; // ObjectId
  googleId: string;
  email: string;
  name: string;
  role: UserRole;
  organizations: string[]; // Array of ObjectId
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 2. OrganizationSchema - เก็บข้อมูลของหน่วยงานหรือชมรมดนตรีต่าง ๆ
 */
export interface Organization {
  _id: string; // ObjectId
  name: string;
  description: string;
  createdBy: string; // ObjectId (User)
  members: OrganizationMember[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 3. roomSchema - เก็บข้อมูลของห้องซ้อมห้องนั้น ๆ
 */
export interface Room {
  _id: string; // ObjectId
  organizationId: string; // ObjectId (Organization)
  name: string;
  description: string;
  location: string;
  capacity: number;
  needApproval: boolean;
  availableDates: AvailableDate[];
  rules: RoomRules;
  questionBox: Question[];
  googleCalendar: GoogleCalendarSync;
  createdBy: string; // ObjectId (User)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 4. reservationSchema - เก็บข้อมูลการจองห้องซ้อม
 */
export interface Reservation {
  _id: string; // ObjectId
  roomId: string; // ObjectId (Room)
  organizationId: string; // ObjectId (Organization)
  userId: string; // ObjectId (User)
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
  questionAnswers: QuestionAnswer[];
  assignedStaff?: AssignedStaff; // Optional
  approvalLog: ApprovalLog[];
  googleCalendarEventId?: string; // Optional
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 5. notificationSchema - เก็บข้อมูลการแจ้งเตือน
 */
export interface Notification {
  _id: string; // ObjectId
  recipientId: string; // ObjectId (User)
  organizationId: string; // ObjectId (Organization)
  roomId?: string; // ObjectId (Room) - Optional
  reservationId?: string; // ObjectId (Reservation) - Optional
  event: NotificationEvent;
  subject: string;
  body: string;
  sender: NotificationSender;
  status: NotificationStatus;
  sentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 6. logSchema - เก็บข้อมูลประวัติการทำงานต่าง ๆ ภายในระบบ
 */
export interface Log {
  _id: string; // ObjectId
  action: LogAction;
  userId: string; // ObjectId (User)
  roomId?: string; // ObjectId (Room) - Optional
  organizationId: string; // ObjectId (Organization)
  timestamp: Date;
  detail: string;
}