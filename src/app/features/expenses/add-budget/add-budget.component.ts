import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../../core/services/budget.service';

@Component({
  selector: 'app-add-budget',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.css'
})
export class AddBudgetComponent implements OnInit {
  budgetAmount: number = 0;
  selectedMonth: string = '';
  currentBudget: number = 0;

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.selectedMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM;

    this.getBudgetForMonth();
  }

  saveBudget() {
    if (!this.selectedMonth || this.budgetAmount <= 0) {
      alert('Please select a month and enter a valid budget.');
      return;
    }

    this.budgetService.setMonthlyBudget(this.selectedMonth, this.budgetAmount)
      .then(() => {
        alert('Budget saved successfully!');
        this.getBudgetForMonth();
      })
      .catch(error => console.error('Error saving budget:', error));
  }

  getBudgetForMonth() {
    this.budgetService.getMonthlyBudget(this.selectedMonth).subscribe(budget => {
      this.currentBudget = budget?.amount || 0;
    });
  }
}
