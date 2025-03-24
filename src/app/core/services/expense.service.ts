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
  
}
