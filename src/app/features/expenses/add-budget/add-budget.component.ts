import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../../../core/services/budget.service';
import { Budget } from '../../../core/models/expense';

@Component({
  selector: 'app-add-budget',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.css'
})
export class AddBudgetComponent implements OnInit {

  months = [
    { value: "january", label: "January" }, { value: "february", label: "February" },
    { value: "march", label: "March" }, { value: "april", label: "April" },
    { value: "may", label: "May" }, { value: "june", label: "June" },
    { value: "july", label: "July" }, { value: "august", label: "August" },
    { value: "september", label: "September" }, { value: "october", label: "October" },
    { value: "november", label: "November" }, { value: "december", label: "December" }
  ];

  budgetForm: FormGroup;
  budgetList: Budget[] = [];
  filteredBudgets: Budget[] = [];
  uniqueYears: number[] = [];
  selectedYear: number | null = null;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.getAllBudgets();
  }

  getAllBudgets() {
    this.budgetService.getAllBudgets().subscribe((budgets) => {
      this.budgetList = budgets;
      this.extractUniqueYears();
      if (this.uniqueYears.length > 0) {
        this.filterBudgetsByYear(this.uniqueYears[0]); // Default to first year
      }
    });
  }

  extractUniqueYears() {
    this.uniqueYears = [...new Set(this.budgetList.map(b => b.year))].sort((a, b) => b - a);
  }

  filterBudgetsByYear(year: number) {
    this.selectedYear = year;
    this.filteredBudgets = this.budgetList.filter(b => b.year === year);
  }

  saveBudget() {
    if (this.budgetForm.invalid) return;
    const { year, month, amount } = this.budgetForm.value;
    this.budgetService.addBudget(year, month, amount).then(() => {
      this.budgetForm.reset();
      this.getAllBudgets();
    });
  }
}
