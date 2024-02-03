import { Injectable } from '@angular/core';
import { ExpenseService } from './expense.service';
import { IncomeService } from './income.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  
  totalIncomeSubject = new BehaviorSubject<number>(0);
  totalIncome$ = this.totalIncomeSubject.asObservable();
  totalExpenseSubject = new BehaviorSubject<number>(0);
  totalExpense$ = this.totalExpenseSubject.asObservable();
  totalIncome: number = 0;
  totalExpense: number = 0;

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {}

  // Subscribing after emiting total expense
  updateTotalExpense(): void {
    this.expenseService.fetchExpenditure().subscribe((expenses: any) => {
      this.totalExpense = expenses.reduce(
        (acc: any, expense: any) => acc + expense.amount,
        0
      );
      this.totalExpenseSubject.next(this.totalExpense);
    });
  }

  // Subscribing after emiting total income
  updateTotalIncome(): void {
    this.incomeService.fetchIncome().subscribe((income: any) => {
      this.totalIncome = income.reduce(
        (acc: any, income: any) => acc + income.amount,
        0
      );
      this.totalIncomeSubject.next(this.totalIncome);
    });
  }

  // returning total income
  getTotalExpense(): number {
    return this.totalExpense;
  }

  // Returing total income
  getTotalIncome(): number {
    return this.totalIncome;
  }

  // returning total balance
  getTotalBalance(): number {
    return this.totalIncome - this.totalExpense;
  }
}
