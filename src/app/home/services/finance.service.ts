import { Injectable } from '@angular/core';
import { ExpenseService } from './expense.service';
import { IncomeService } from './income.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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
  getFinanceDataForChart(): Observable<
    { date: any; expense: any; income: any }[]
  > {
    return combineLatest([
      this.expenseService.fetchExpenditure(),
      this.incomeService.fetchIncome(),
    ]).pipe(
      map(([expenses, incomes]) => {
        const financeData: { date: any; expense: any; income: any }[] = [];

        // Ensure expenses is an array
        if (Array.isArray(expenses)) {
          expenses.forEach((expense: any) => {
            if (expense.date && expense.amount !== undefined) { 
              // Cast incomes to the appropriate type to support the 'find' method
              const incomesArray: any[] = incomes as any[];
              // Find corresponding income data for the expense date
              const correspondingIncome = incomesArray.find(
                (income: any) => income.date === expense.date
              );

              financeData.push({  
                date: expense.date,
                expense: expense.amount,
                income: correspondingIncome ? correspondingIncome.amount : 0,
              });
            }
          });
        }

        console.log('Finance data in service:', financeData);
        return financeData;
      })
    );
  }
}
