import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../core/services/expense.service';
import { Expense } from '../../../core/models/expense';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {

  expenseArray: Expense[] = [];
  filteredExpenses: Expense[] = [];
  uniqueYears: number[] = [];
  selectedYear: number | null = null;

  expenseForm: FormGroup | any;
  categories:string[] = ['Food', 'Transport', 'Bills', 'Entertainment', 'Others'];
  expenseId:string | null = null;

  constructor(
    private formBuilder:FormBuilder, 
    private expenseService:ExpenseService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit() {
    this.getExpenses();

    this.expenseForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
      description: ['']
    });

    // this.expenseId = this.route.snapshot.paramMap.get('id');
    // if(this.expenseId) {
    //   this.loadExpenseData();
    // }
  }

  // loadExpenseData(): void {
  //   this.expenseService.getExpenseById(this.expenseId!).subscribe(expense => {
  //     if (expense) {
  //       this.expenseForm.patchValue({
  //         amount: expense.amount,
  //         category: expense.category,
  //         date: expense.date, // Assuming it's already converted to Date
  //         description: expense.description
  //       });
  //     }
  //   });
  // }

  async saveExpense() {
    if (this.expenseForm.invalid) return;
    const expenseData = this.expenseForm.value;
    if (this.expenseId) {
      await this.expenseService.updateExpense(this.expenseId, expenseData);
      this.expenseForm.reset();
    } else {
      await this.expenseService.addExpense(expenseData);
      this.expenseForm.reset();
    }
    this.router.navigate(['/home/expense-list']);
  }

  async getExpenses() {
    this.expenseService.getUserExpenses().subscribe(expenses => {
      this.expenseArray = expenses;

      // Extract unique years from expenses
      this.uniqueYears = [...new Set(expenses.map(exp => new Date(exp.date).getFullYear()))].sort((a, b) => b - a);
      
      // Set default year to the latest year if available
      this.selectedYear = this.uniqueYears.length > 0 ? this.uniqueYears[0] : null;
      
      // Filter expenses by default selected year
      this.filterExpensesByYear(this.selectedYear);
    });
  }

  filterExpensesByYear(year: number | null) {
    this.selectedYear = year;
    if (year) {
      this.filteredExpenses = this.expenseArray.filter(exp => new Date(exp.date).getFullYear() === year);
    } else {
      this.filteredExpenses = this.expenseArray; // Show all if no year is selected
    }
  }

  async deleteExpense(expenseId: string) {
    if(!expenseId){
      console.error('Invalid Expense ID');
      return;
    }
    console.log('Deleting expense with id:', expenseId);
    await this.expenseService.deleteExpense(expenseId);
  }
}
