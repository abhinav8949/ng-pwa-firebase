import { Timestamp } from "firebase/firestore";

export interface Expense {
    id?: string;         // Firestore Document ID
    userId: string;      // The user who owns the expense
    amount: number;      // Amount spent
    category: string;    // Food, Travel, etc.
    date: string;        // ✅ Store date as an ISO string (e.g., "2025-03-21T10:30:00.000Z")
    description?: string; // Optional description
}

export interface UserDetail {
    id: string;
    email: string;
    name: string;
    photoUrl: string;
}
