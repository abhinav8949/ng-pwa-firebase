import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../../core/services/expense.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit{
  expenseForm: FormGroup | any;
  categories:string[] = ['Food', 'Transport', 'Bills', 'Entertainment', 'Others'];
  expenseId:string | null = null;

  constructor(
    private formBuilder:FormBuilder, 
    private expenseService:ExpenseService,
    private route:ActivatedRoute,
    private router:Router
  ){}


  ngOnInit(): void {
    this.expenseForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
      description: ['']
    });

    this.expenseId = this.route.snapshot.paramMap.get('id');
    if(this.expenseId) {
      this.loadExpenseData();
    }
  }

  loadExpenseData(): void {
    this.expenseService.getExpenseById(this.expenseId!).subscribe(expense => {
      if (expense) {
        this.expenseForm.patchValue({
          amount: expense.amount,
          category: expense.category,
          date: expense.date, // Assuming it's already converted to Date
          description: expense.description
        });
      }
    });
  }

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

}
