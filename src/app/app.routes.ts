import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { AddExpenseComponent } from './features/expenses/add-expense/add-expense.component';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';
import { ReportsComponent } from './features/reports/reports.component';
import { authGuard } from './core/guards/auth.guard';
import { authReverseGuard } from './core/guards/auth-reverse.guard';
import { BudgetDashboardComponent } from './features/budget-dashboard/budget-dashboard.component';
import { AddBudgetComponent } from './features/expenses/add-budget/add-budget.component';

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
                component: BudgetDashboardComponent
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
                path: 'add-budget',
                component: AddBudgetComponent
            },
            {
                path: 'edit-expense/:id',
                component: AddExpenseComponent
            },
            {
                path: 'report',
                component: ReportsComponent
            }
        ]
    },
];
