export interface Expense {
    id?: string;         // Firestore Document ID
    userId: string;      // The user who owns the expense
    amount: number;      // Amount spent
    category: string;    // Food, Travel, etc.
    date: string;        // ✅ Store date as an ISO string (e.g., "2025-03-21T10:30:00.000Z")
    description?: string; // Optional description
}

export interface Budget {
    id?: string;   // Firestore document ID (optional)
    userId: string; // Associated user
    year: number;  // Budget year (e.g., 2024)
    month: string; // Budget month (e.g., "03" for March)
    amount: number; // Monthly budget amount
}
