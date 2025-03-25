import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgApexchartsModule, ApexAxisChartSeries } from 'ng-apexcharts';
import { LineChartComponent } from "../charts/line-chart/line-chart.component";
import { Expense } from '../../../core/models/expense';

@Component({
  selector: 'app-expense-overview',
  imports: [NgApexchartsModule, LineChartComponent],
  templateUrl: './expense-overview.component.html',
  styleUrl: './expense-overview.component.css'
})
export class ExpenseOverviewComponent implements OnInit, AfterViewInit {

  currentYear = new Date().getFullYear();
  expenses$: Observable<Expense[]>;

  chartSeries!: ApexAxisChartSeries;
  categories: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(private firestore: Firestore) {
    const expensesCollection = collection(this.firestore, 'expenses');
    this.expenses$ = collectionData(expensesCollection) as Observable<Expense[]>;
  }

  ngOnInit() {
    this.initializeChart();
    this.expenses$.subscribe(expenses => this.updateChart(expenses));
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  initializeChart() {
    this.chartSeries = [{ name: "Expenses", data: new Array(12).fill(0) }];
  }

  updateChart(expenses: Expense[]) {
    const monthlyExpenses = new Array(12).fill(0);

    expenses.forEach((expense: Expense) => {
      const date = new Date(expense.date);
      if (date.getFullYear() === this.currentYear) {
        monthlyExpenses[date.getMonth()] += expense.amount;
      }
    });

    console.log("Updated chart data:", monthlyExpenses);
    this.chartSeries = [{ name: "Expenses", data: monthlyExpenses, color: "#FF4560" }];
  }
}
