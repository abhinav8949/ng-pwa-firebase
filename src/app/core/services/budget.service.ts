import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Budget } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  async addBudget(year: number, month: string, amount: number): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('User not found');
  
    const budgetData: Budget = { userId: user.uid, year, month, amount };
    const budgetRef = doc(this.firestore, `budgets/${user.uid}_${year}_${month}`);
  
    await setDoc(budgetRef, budgetData, { merge: true });
  }
  

  getAllBudgets(): Observable<Budget[]> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('User not found');

    const budgetCollection = collection(this.firestore, 'budgets');
    const userQuery = query(budgetCollection, where('userId', '==', user.uid));

    return collectionData(userQuery, { idField: 'id' }) as Observable<Budget[]>;
  }
}
