import { AfterViewInit, Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { BarChartComponent } from "../charts/bar-chart/bar-chart.component";

@Component({
  selector: 'app-expense-category',
  imports: [BarChartComponent],
  templateUrl: './expense-category.component.html',
  styleUrl: './expense-category.component.css'
})
export class ExpenseCategoryComponent implements OnInit, AfterViewInit{
  
  currentYear = new Date().getFullYear();
  expenses$: Observable<any[]>;

  categories: string[] = [];
  chartSeries!: ApexAxisChartSeries;

  constructor(private firestore: Firestore) {
    const expensesCollection = collection(this.firestore, 'expenses');
    this.expenses$ = collectionData(expensesCollection);
  }

  ngOnInit() {
    this.initializeChart();
    this.expenses$.subscribe(expenses => this.updateChart(expenses));
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  initializeChart() {
    this.chartSeries = [{ name: 'Expenses', data: [] }];
  }

  updateChart(expenses: any[]) {
    const categorySum = new Map<string, number>();

    // 🔹 Filter expenses for the current year & accumulate category-wise sums
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      if (date.getFullYear() === this.currentYear) {
        categorySum.set(expense.category, (categorySum.get(expense.category) || 0) + expense.amount);
      }
    });

    // 🔹 Convert map to arrays for the bar chart
    this.categories = Array.from(categorySum.keys());
    const dataValues = Array.from(categorySum.values());

    // 🔹 Update chart series dynamically
    this.chartSeries = [{ name: 'Expenses', data: dataValues }];
  }
}
