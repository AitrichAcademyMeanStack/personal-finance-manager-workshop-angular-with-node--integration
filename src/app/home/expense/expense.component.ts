import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/Expense';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  public expense: Expense | any;
  public display: boolean = false;
  constructor(private expenseService: ExpenseService){}

  ngOnInit(): void {
    
  }

  addExpense(data: Expense){
    console.log(data);
    // this.expenseService.addExpenditure(data).subscribe((res) => {
    //   this.expense = res
    
    // })
    this.display = true
    

  }

}
