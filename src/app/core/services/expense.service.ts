import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { addDoc, CollectionReference, Timestamp } from 'firebase/firestore';
import { Expense } from '../models/expense';
import { map, Observable } from 'rxjs';
import { BudgetService } from './budget.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseCollection: CollectionReference;

  constructor(private auth: Auth, private firestore: Firestore, private budgetService: BudgetService) {
    this.expenseCollection = collection(this.firestore, 'expenses');
  }

  // ✅ GetAll Expense
  getUserExpenses(): Observable<Expense[]> {
    const user = this.auth.currentUser;
    if (!user) return new Observable<Expense[]>();

    const q = query(this.expenseCollection, where('userId', '==', user.uid));
    return collectionData(q, { idField: 'id' }) as Observable<Expense[]>; // ✅ Cast to Expense[]
  }

  // ✅ Get Expense by ID
  getExpenseById(expenseId: string): Observable<Expense | undefined> {
    const expenseDoc = doc(this.firestore, `expenses/${expenseId}`);
    return docData(expenseDoc, { idField: 'id' }) as Observable<Expense | undefined>;
  }

  // ✅ Adding Expense
  async addExpense(expense: Expense): Promise<void> {
    const user = await this.auth.currentUser;
    if (!user) throw new Error('User not found');

    const expenseData = { 
      ...expense, 
      userId: user.uid, 
      date: new Date(expense.date).toISOString()
    };
    await addDoc(this.expenseCollection, expenseData);
  }

  // ✅ Edit Expense
  async updateExpense(expenseId: string, updatedData: Partial<Expense>): Promise<void> {
    const expenseDoc = doc(this.firestore, `expenses/${expenseId}`);
    await updateDoc(expenseDoc, updatedData);
  }

  // ✅ Delete Expense
  async deleteExpense(expenseId: string): Promise<void> {
    const expenseDoc = doc(this.firestore, `expenses/${expenseId}`);
    await deleteDoc(expenseDoc);
  }
  
  getMonthlyExpenseByYear(year: number): Observable<{ month: string; totalAmount: number }[]> {
    const user = this.auth.currentUser;
    if (!user) return new Observable();
  
    const q = query(this.expenseCollection, where('userId', '==', user.uid));
  
    return collectionData(q, { idField: 'id' }).pipe(
      map((expenses) => {
        return (expenses as Expense[]) // ✅ Explicitly cast Firestore data as Expense[]
          .filter(exp => new Date(exp.date).getFullYear() === year) // ✅ Filter by selected year
          .reduce((acc, exp) => {
            const month = new Date(exp.date).toLocaleString('default', { month: 'long' }).toLowerCase(); // "march"
            acc[month] = (acc[month] || 0) + exp.amount; // ✅ Sum amounts for each month
            return acc;
          }, {} as Record<string, number>);
      }),
      map(monthlyExpenses => Object.entries(monthlyExpenses).map(([month, totalAmount]) => ({ month, totalAmount })))
    );
  } 
  
}
