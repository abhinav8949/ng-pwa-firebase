import { Component } from '@angular/core';
import { ExpenseOverviewComponent } from "../reports/expense-overview/expense-overview.component";
import { BudgetOverviewComponent } from "../reports/budget-overview/budget-overview.component";
import { BudgetExpenseOverviewComponent } from "../reports/budget-expense-overview/budget-expense-overview.component";
import { ExpenseCategoryComponent } from "../reports/expense-category/expense-category.component";
import { SummaryCardComponent } from "../reports/summary-card/summary-card.component";
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [ExpenseOverviewComponent, BudgetOverviewComponent, BudgetExpenseOverviewComponent, ExpenseCategoryComponent, SummaryCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentYear = new Date().getFullYear();
  currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase(); // Get the current month as a string (e.g., 'march')

  expenses$: Observable<any[]>;
  budget$: Observable<any[]>;

  budgetAmount = 0;
  expenseAmount = 0;
  annualExpense = 0;
  savingAmount = 0;
  savingPercentage = 0;

  constructor(private firestore: Firestore) {
    this.expenses$ = collectionData(collection(this.firestore, 'expenses'));
    this.budget$ = collectionData(collection(this.firestore, 'budgets'));
  }

  ngOnInit() {
    this.expenses$.subscribe(expenses => this.calculateExpenseSummary(expenses));
    this.budget$.subscribe(budgets => this.calculateBudgetSummary(budgets));
  }

  calculateExpenseSummary(expenses: any[]) {
    let totalExpense = 0;
    let annualTotal = 0;

    expenses.forEach(expense => {
      const date = new Date(expense.date);
      if (date.getFullYear() === this.currentYear) {
        annualTotal += expense.amount;
        if (date.getMonth() === new Date().getMonth()) {
          totalExpense += expense.amount;
        }
      }
    });

    this.expenseAmount = totalExpense;
    this.annualExpense = annualTotal;
    this.calculateSavings();
  }

  calculateBudgetSummary(budgets: any[]) {
    // Find the budget for the current year and current month (as string)
    const currentBudget = budgets.find(b => b.year === this.currentYear && b.month.toLowerCase() === this.currentMonth); // Compare month as string
    
    if (currentBudget) {
      this.budgetAmount = currentBudget.amount;
    } else {
      this.budgetAmount = 0;
    }

    this.calculateSavings();
  }

  calculateSavings() {
    this.savingAmount = this.budgetAmount - this.expenseAmount;
    this.savingPercentage = this.budgetAmount > 0 ? (this.savingAmount / this.budgetAmount) * 100 : 0;
  }
}
