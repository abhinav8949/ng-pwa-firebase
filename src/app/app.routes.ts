import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { BudgetComponent } from './features/budget/budget.component';
import { AddExpenseComponent } from './features/expenses/add-expense/add-expense.component';
import { EditExpenseComponent } from './features/expenses/edit-expense/edit-expense.component';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';
import { ReportsComponent } from './features/reports/reports.component';
import { authGuard } from './core/guards/auth.guard';
import { authReverseGuard } from './core/guards/auth-reverse.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [authReverseGuard],
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [authReverseGuard],
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: BudgetComponent
            },
            {
                path: 'expense-list',
                component: ExpenseListComponent
            },
            {
                path: 'add-expense',
                component: AddExpenseComponent
            },
            {
                path: 'edit-expense/:id',
                component: EditExpenseComponent
            },
            {
                path: 'report',
                component: ReportsComponent
            }
        ]
    },
];
