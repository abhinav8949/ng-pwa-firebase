import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../core/services/expense.service';
import { Expense } from '../../../core/models/expense';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseMessagingService } from '../../../core/services/firebase-messaging.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css',
  providers:[DatePipe]
})
export class ExpenseListComponent implements OnInit {

  expenseArray: Expense[] = [];
  filteredExpenses: Expense[] = [];
  uniqueYears: number[] = [];
  selectedYear: number | null = null;

  expenseForm: FormGroup | any;
  categories: string[] = ['Food', 'Transport', 'Bills', 'Entertainment', 'Others'];
  expenseId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private fcmService: FirebaseMessagingService,
    private toast:ToastrService,
    private datePipe:DatePipe

  ) { }

  ngOnInit() {
    this.getExpenses();

    this.expenseForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
      description: ['']
    });
  }

  async saveExpense() {
    if (this.expenseForm.invalid) return;
    const expenseData = this.expenseForm.value;
    if (this.expenseId) {
      await this.expenseService.updateExpense(this.expenseId, expenseData);
    } else {
      await this.expenseService.addExpense(expenseData);
    }
    this.expenseForm.reset();
    this.expenseId = null;
    
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      (window as any).bootstrap.Modal.getInstance(modalElement)?.hide();
    }
    this.getExpenses();
    this.router.navigate(['/home/expense-list']);
    
    const formattedDate = this.datePipe.transform(expenseData.date, 'dd MMM yyyy');
    this.toast.success(`Expense of ₹${expenseData.amount} recorded for ${formattedDate}`, 'Success', {
      timeOut: 10000 
    }); 
    const fcmUniqueKey = `Save-${formattedDate}`
    this.fcmService
    .sendFCMNotification(
      "New Expense Added", 
      `An expense of ₹${expenseData.amount} has been recorded for 
      ${formattedDate}.`,
      fcmUniqueKey
    );   
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
    if (!expenseId) {
      this.toast.error('Invalid Expense Id: ' + expenseId, 'Error');
      return;
    }
  
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this expense?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      try {
        console.log('Deleting expense with id:', expenseId);
        await this.expenseService.deleteExpense(expenseId);
        Swal.fire('Deleted!', 'The expense has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while deleting the expense.', 'error');
        console.error('Error deleting expense:', error);
      }
    }
  }
}
