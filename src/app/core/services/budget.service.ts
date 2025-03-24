import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private firestore:Firestore, private auth:Auth) {}

  // ✅ Set Budget for Specific Month
  async setMonthlyBudget(month: string, amount: number): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('User not found');

    const budgetDocRef = doc(this.firestore, `budgets/${user.uid}_${month}`);
    await setDoc(budgetDocRef, { userId: user.uid, month, amount });
  }

  // ✅ Get Budget for Selected Month
  getMonthlyBudget(month: string): Observable<{ amount: number } | undefined> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('User not found');

    const budgetDocRef = doc(this.firestore, `budgets/${user.uid}_${month}`);
    return docData(budgetDocRef) as Observable<{ amount: number } | undefined>;
  }
}
