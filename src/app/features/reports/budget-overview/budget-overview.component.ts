import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Budget } from '../../../core/models/expense';
import { Observable, Subscription } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { LineChartComponent } from "../charts/line-chart/line-chart.component";


@Component({
  selector: 'app-budget-overview',
  imports: [NgApexchartsModule, LineChartComponent],
  templateUrl: './budget-overview.component.html',
  styleUrl: './budget-overview.component.css'
})
export class BudgetOverviewComponent implements OnInit, AfterViewInit{

  currentYear = new Date().getFullYear();
  budgets$: Observable<Budget[]>;
  budgetsSubscription!: Subscription;

  chartSeries: any[] = [];
  categories: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  monthMap: { [key: string]: number } = {
    "january": 0, "february": 1, "march": 2, "april": 3, "may": 4, "june": 5,
    "july": 6, "august": 7, "september": 8, "october": 9, "november": 10, "december": 11
  };

  constructor(private firestore: Firestore) {
    const budgetsCollection = collection(this.firestore, 'budgets');
    this.budgets$ = collectionData(budgetsCollection) as Observable<Budget[]>;
  }

  ngOnInit() {
    this.initializeChart()
    this.budgetsSubscription = this.budgets$.subscribe(budgets => this.processBudgetData(budgets));
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  initializeChart() {
    this.chartSeries = [{ name: "Budget", data: new Array(12).fill(0) }];
  }

  // ngOnDestroy() {
  //   if (this.budgetsSubscription) {
  //     this.budgetsSubscription.unsubscribe(); // ✅ Prevent memory leaks
  //   }
  // }

  processBudgetData(budgets: Budget[]) {
    const budgetData = new Array(12).fill(0);

    budgets.forEach((budget: Budget) => {
      const monthIndex = this.monthMap[budget.month.toLowerCase()];
      if (budget.year === this.currentYear && monthIndex !== undefined) {
        budgetData[monthIndex] = budget.amount; // ✅ Assign directly, don't sum
      }
    });

    console.log("Updated Budget Data:", budgetData);
    this.chartSeries = [{ name: "Budget", data: budgetData }];
  }
}
