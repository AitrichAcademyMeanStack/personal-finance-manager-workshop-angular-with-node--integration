import { Injectable } from '@angular/core';
import { Expense } from '../models/Expense';
import { Income } from '../models/Income';
import { ExpenseService } from './expense.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  expense: Expense | any;
  // totalIncome: Income | any;
  constructor(private expenseService: ExpenseService)  {}

  
  // getAllExpense() {
  //   this.expenseService.fetchExpenditure().subscribe((res) => {
  //    this.expense = res;
  //   });
  // }
  
  updateTotalExpense() {
    let totalExpense = 0;
    this.expense.forEach((expense: Expense) => {
      totalExpense = totalExpense + expense.amount;
      // this.getAllExpense(); 
    });
    return totalExpense;
  }
  
  // updateTotalIncome() {
  //   let totalIncome = 0;
  //   this.totalIncome.forEach((income: Income) => {
  //     totalIncome = totalIncome + income.amount;
  //   });
  //   return totalIncome;
  // }
  // getBalance(): number {
  //   // return this.totalIncome - this.expense;
  // }
}
