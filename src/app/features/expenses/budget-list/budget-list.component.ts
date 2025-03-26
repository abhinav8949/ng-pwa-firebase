import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Budget } from '../../../core/models/expense';
import { BudgetService } from '../../../core/services/budget.service';
import { ExpenseService } from '../../../core/services/expense.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseMessagingService } from '../../../core/services/firebase-messaging.service';

@Component({
  selector: 'app-budget-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent implements OnInit {

  months = [
    { value: "january", label: "January" }, { value: "february", label: "February" },
    { value: "march", label: "March" }, { value: "april", label: "April" },
    { value: "may", label: "May" }, { value: "june", label: "June" },
    { value: "july", label: "July" }, { value: "august", label: "August" },
    { value: "september", label: "September" }, { value: "october", label: "October" },
    { value: "november", label: "November" }, { value: "december", label: "December" }
  ];

  budgetForm: FormGroup | any;
  budgetList: Budget[] = [];
  filteredBudgets: Budget[] = [];
  uniqueYears: number[] = [];
  selectedYear: number | null = null;
  filteredExpenses: { month: string; totalAmount: number }[] = [];

  constructor(private fb: FormBuilder,
    private budgetService: BudgetService,
    private expenseService: ExpenseService,
    private toast: ToastrService,
    private fcmService: FirebaseMessagingService) { }

  ngOnInit() {
    this.getAllBudgets();

    this.budgetForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  async saveBudget() {
    if (this.budgetForm.invalid) return;
    const { year, month, amount } = this.budgetForm.value;
    await this.budgetService.addBudget(year, month, amount).then(() => {
      this.budgetForm.reset();
      this.getAllBudgets();
    });

    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      (window as any).bootstrap.Modal.getInstance(modalElement)?.hide();
    }
    const fcmUniqueKey = `Save-${month}-${year}`
    this.fcmService.sendFCMNotification(
      "New Budget Added", 
      `A budget of ₹${amount} has been recorded for ${month}-${year}`,
      fcmUniqueKey
    );
    this.toast.success(`Budget of ₹ ${amount} recorded for ${month}-${year}`, 'Success', {
      timeOut: 10000 
    });
  }

  async getAllBudgets() {
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

  async getMonthlyExpense(year: number) {
    this.expenseService.getMonthlyExpenseByYear(year).subscribe(expenses => {
      this.filteredExpenses = expenses;

      this.filteredBudgets.forEach(budget => {
        const monthExpense = this.getExpenseForMonth(budget.month);
        const threshold = budget.amount * 0.8;
        const fcmUniqueKey = `Budget-${budget.month}-${year}`;
        if (monthExpense >= threshold) {
          this.fcmService.sendFCMNotification(
            "Budget Warning", 
            `You have used 80% of your budget for ${budget.month}-${year}.`,
            fcmUniqueKey
          );
          this.showWarningNotification(budget.month, year, monthExpense, budget.amount);
        }
      });
    });
  }

  private warnedMonth = new Set<string>();

  showWarningNotification(month: string, year: number, expenseTotal: number, budgetAmount: number) {
    const percentUsed = ((expenseTotal / budgetAmount) * 100).toFixed(2);
    const warningMessage = `Oops! In ${month}-${year}, you have used ${percentUsed}% of your budget.`;
    const warningKey = `${month}-${year}`;
    if(this.warnedMonth.has(warningKey)) return;
    this.warnedMonth.add(warningKey);
    this.toast.warning(warningMessage, 'Warning',{
      timeOut: 10000
    })
  }

  getExpenseForMonth(month: string): number {
    return this.filteredExpenses.find(exp => exp.month === month)?.totalAmount || 0;
  }
}
