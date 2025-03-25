import { Component } from '@angular/core';
import { ExpenseOverviewComponent } from "../reports/expense-overview/expense-overview.component";

@Component({
  selector: 'app-dashboard',
  imports: [ExpenseOverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
