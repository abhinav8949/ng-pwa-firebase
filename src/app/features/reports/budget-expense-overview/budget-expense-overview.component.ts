import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { combineLatest, map, Observable } from 'rxjs';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { LineChartComponent } from "../charts/line-chart/line-chart.component";

@Component({
  selector: 'app-budget-expense-overview',
  imports: [LineChartComponent],
  templateUrl: './budget-expense-overview.component.html',
  styleUrl: './budget-expense-overview.component.css'
})
export class BudgetExpenseOverviewComponent implements OnInit {
currentYear = new Date().getFullYear();
  expenses$: Observable<any[]>;
  budgets$: Observable<any[]>;
  chartSeries!: ApexAxisChartSeries;
  categories: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(private firestore: Firestore) {
    const expensesCollection = collection(this.firestore, 'expenses');
    const budgetsCollection = collection(this.firestore, 'budgets');

    this.expenses$ = collectionData(expensesCollection);
    this.budgets$ = collectionData(budgetsCollection);
  }

  ngOnInit() {
    this.initializeChart();

    // ✅ Combine expenses & budgets observables
    combineLatest([this.expenses$, this.budgets$]).pipe(
      map(([expenses, budgets]) => this.updateChart(expenses, budgets))
    ).subscribe();
  }

  initializeChart() {
    this.chartSeries = [
      { name: "Expenses", data: new Array(12).fill(0) },
      { name: "Budgets", data: new Array(12).fill(0) }
    ];
  }

  monthMap: { [key: string]: number } = {
    "january": 0, "february": 1, "march": 2, "april": 3, "may": 4, "june": 5,
    "july": 6, "august": 7, "september": 8, "october": 9, "november": 10, "december": 11
  };
  
  updateChart(expenses: any[], budgets: any[]) {
    const monthlyExpenses = new Array(12).fill(0);
    const monthlyBudgets = new Array(12).fill(0);

    expenses.forEach(expense => {
      const date = new Date(expense.date);
      if (date.getFullYear() === this.currentYear) {
        monthlyExpenses[date.getMonth()] += expense.amount;
      }
    });

    budgets.forEach(budget => {
      // if (budget.year === this.currentYear) {
      //   const monthIndex = this.categories.findIndex(m => m.toLowerCase() === budget.month.toLowerCase());
      //   if (monthIndex !== -1) {
      //     monthlyBudgets[monthIndex] = budget.amount; // Direct assignment (Unique budget per month)
      //   }
      // }

      const monthIndex = this.monthMap[budget.month.toLowerCase()];
      if (budget.year === this.currentYear && monthIndex !== undefined) {
        monthlyBudgets[monthIndex] = budget.amount; // ✅ Assign directly, don't sum
      }
    });

    this.chartSeries = [
      { name: "Expenses", data: monthlyExpenses, color: "#FF4560" }, // Red Line
      { name: "Budgets", data: monthlyBudgets, color: "#008FFB" } // Blue Line
    ];
  }
}
