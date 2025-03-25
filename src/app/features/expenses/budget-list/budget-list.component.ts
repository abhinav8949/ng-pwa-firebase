import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Budget } from '../../../core/models/expense';
import { BudgetService } from '../../../core/services/budget.service';
import { ExpenseService } from '../../../core/services/expense.service';

@Component({
  selector: 'app-budget-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent implements OnInit{

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
  filteredExpenses: { month: string; totalAmount: number }[] = [];

  constructor(private fb: FormBuilder,
    private budgetService: BudgetService,
    private expenseService: ExpenseService) {
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
    this.getMonthlyExpense(year);
  }

  saveBudget() {
    if (this.budgetForm.invalid) return;
    const { year, month, amount } = this.budgetForm.value;
    this.budgetService.addBudget(year, month, amount).then(() => {
      this.budgetForm.reset();
      this.getAllBudgets();
    });
  }

  getMonthlyExpense(year:number){
    this.expenseService.getMonthlyExpenseByYear(year).subscribe(expenses => {
      this.filteredExpenses = expenses;
    });
  }

  getExpenseForMonth(month: string): number {
    return this.filteredExpenses.find(exp => exp.month === month)?.totalAmount || 0;
  }

}
