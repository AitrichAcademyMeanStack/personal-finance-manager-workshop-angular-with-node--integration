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

  // Fetching data for Chart
  getFinanceDataForChart(): any[] {
    const expenseData = this.expenseService.fetchExpenditure() || [];
    const incomeData = this.incomeService.fetchIncome() || [];

    console.log('expense', expenseData);
    console.log('incone', incomeData);

    const financeData: any[] = [];
    console.log('finacnceData', financeData);

    expenseData.forEach((expense: any) => {
      if (expense.date && expense.amount !== undefined) {
        financeData.push({
          date: expense.date,
          expense: expense.amount,
          income: 0,
        });
      }
    });

    incomeData.forEach((income: any) => {
      if (income.date && income.amount !== undefined) {
        const entryToUpdate = financeData.find(
          (entry) => entry.date === income.date
        );

        if (entryToUpdate) {
          entryToUpdate.income = income.amount;
        } else {
          financeData.push({
            date: income.date,
            income: income.amount,
            expense: 0,
          });
        }
      }
    });
    financeData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return financeData;
  }
}
