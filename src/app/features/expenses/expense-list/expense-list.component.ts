import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../core/services/expense.service';
import { Expense } from '../../../core/models/expense';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {

  expenseArray: Expense[] = [];

  constructor(private expenseService:ExpenseService, private router:Router) { }

  ngOnInit() {
    this.getExpenses();
  }

  async getExpenses() {
    this.expenseService.getUserExpenses().subscribe(expenses => {
      this.expenseArray = expenses;
    });
  }

  editExpense(expenseId: string) {
    if(!expenseId){
      console.error('Invalid Expense ID');
      return;
    }
    console.log('Editing expense with id:', expenseId);
    this.router.navigate(['/home/edit-expense', expenseId]);
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
