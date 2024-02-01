import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/Expense';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  expense: Expense | any;
  expenseForm!: FormGroup;
  
  exp: any
  
  constructor(
    private expenseService: ExpenseService,
    private fb: FormBuilder,
    private service: FinanceService
    ) {}
    
    ngOnInit(): void {
      this.expenseForm = this.fb.group({
        title: ['', [Validators.required]],
        amount: [
          '',
          [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
        date: ['', [Validators.required]],
        category: ['', [Validators.required]],
        description: ['', [Validators.required]],
      });
      // this.totalExpenses();
      this.getExpense();
      // this.service.getAllExpense()  /////////////////////////////////////////////////////
      // this.getMyEx()  
    }
    
    // Adding Expense
    addExpense() {
    if (this.expenseForm.valid) {
      this.expenseService
        .addExpenditure(this.expenseForm.value)
        .subscribe((res) => {
          this.expense = res;
          this.expenseForm.reset(); // Resting form
          this.getExpense(); // Updating DOM after adding expense
          // this.service.getAllExpense()
          // this.getMyEx()
          // this.totalExpenses()
        });
      }
  }

  // Adding Card
  getExpense() {
    this.expenseService.fetchExpenditure().subscribe((res) => {
      this.expense = res;
    });
  }

  // Deleting Expense
  removeExpense(id: string) {
    this.expenseService.deleteExpenditure(id).subscribe((res) => {
      if (res) {
        this.getExpense();
        // this.service.getAllExpense(); 
        // this.getMyEx()
      }
    });
  }

  // getMyEx(){
  //    return this.service.updateTotalExpense()
  // } 

     totalExpense = () => {
    let totalExpense = 0;
    this.expense.forEach((expense: Expense) => {
      totalExpense = totalExpense + expense.amount; 
    });
    return totalExpense;
  };

}
