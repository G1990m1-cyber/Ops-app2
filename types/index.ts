export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'caretaker' | 'cleaner';
  propertyIds: string[];
  phone?: string;
  active: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  bedrooms: number;
  maxGuests: number;
  type: 'cottage' | 'lodge' | 'villa' | 'apartment' | 'barn';
  active: boolean;
  imageUrl?: string;
  notes?: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  propertyId: string | null;
  dueDate: string;
  category: 'compliance' | 'maintenance' | 'safety' | 'admin' | 'cleaning';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedTo?: string;
  completedAt?: string;
  completedBy?: string;
  notes?: string;
  approvalRequired: boolean;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface StocktakeItem {
  id: string;
  name: string;
  category: 'shelf' | 'cleaning';
  unit: string;
  minStock: number;
  currentStock?: number;
}

export interface StocktakeEntry {
  id: string;
  propertyId: string;
  date: string;
  submittedBy: string;
  items: { itemId: string; quantity: number }[];
  status: 'draft' | 'submitted';
  notes?: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  notes?: string;
  source: 'direct' | 'airbnb' | 'booking.com' | 'vrbo';
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  notes?: string;
}

export interface PreCheckIn {
  id: string;
  bookingId: string;
  propertyId: string;
  scheduledDate: string;
  completedAt?: string;
  completedBy?: string;
  status: 'pending' | 'completed';
  checklist: ChecklistItem[];
  notes?: string;
  damageReported: boolean;
  damageNotes?: string;
}

export interface PostCheckOut {
  id: string;
  bookingId: string;
  propertyId: string;
  scheduledDate: string;
  completedAt?: string;
  completedBy?: string;
  status: 'pending' | 'completed';
  checklist: ChecklistItem[];
  notes?: string;
  damageReported: boolean;
  damageNotes?: string;
  cleaningRequired: boolean;
}

export interface WeeklyCheck {
  id: string;
  propertyId: string;
  weekStart: string;
  completedAt?: string;
  completedBy?: string;
  status: 'pending' | 'in_progress' | 'completed';
  checklist: ChecklistItem[];
  notes?: string;
  issuesFound: boolean;
}

export interface MonthlyCheck {
  id: string;
  propertyId: string;
  month: string;
  year: number;
  completedAt?: string;
  completedBy?: string;
  status: 'pending' | 'in_progress' | 'completed';
  checklist: ChecklistItem[];
  meterReadings: {
    electric?: number;
    gas?: number;
    water?: number;
  };
  notes?: string;
}

export interface Approval {
  id: string;
  title: string;
  description: string;
  propertyId: string;
  submittedBy: string;
  submittedAt: string;
  amount: number;
  category: 'maintenance' | 'supplies' | 'emergency' | 'upgrade' | 'other';
  status: 'in_progress' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  receipts?: string[];
  history: ApprovalHistoryEntry[];
}

export interface ApprovalHistoryEntry {
  id: string;
  action: 'submitted' | 'reviewed' | 'approved' | 'rejected' | 'commented';
  by: string;
  at: string;
  notes?: string;
}

export interface WorkTicket {
  id: string;
  title: string;
  description: string;
  propertyId: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  category: 'maintenance' | 'cleaning' | 'repair' | 'inspection' | 'other';
  estimatedHours?: number;
  actualHours?: number;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface DashboardStats {
  checkInsToday: number;
  checkInsTomorrow: number;
  checkOutsToday: number;
  openActionItems: number;
  pendingApprovals: number;
  openWorkTickets: number;
  damageReportsThisMonth: number;
  propertiesOccupied: number;
  propertiesTotal: number;
}
