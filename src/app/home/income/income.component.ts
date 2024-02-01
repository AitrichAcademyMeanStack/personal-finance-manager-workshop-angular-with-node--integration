import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from '../services/income.service';
import { Income } from '../models/Income';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit {
  income: Income | any;
  incomeForm!: FormGroup;

  constructor(private fb: FormBuilder, private incomeService: IncomeService) {}

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      title: ['', [Validators.required]],
      amount: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      date: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.getIncome();
  }

  // Posting Income
  addIncome() {
    if (this.incomeForm.valid) {
      this.incomeService.addIncome(this.incomeForm.value).subscribe((res) => {
          // this.income = res
          this.incomeForm.reset() // clearing form
          this.getIncome() // Updating DOM after Posting Data
      });
      }
  }

  // Adding card
  getIncome() {
    this.incomeService.fetchIncome().subscribe((res) => {
      this.income = res;
    });
  }

  // Deleting Income
  removeIncome(id: string) {
    this.incomeService.deleteIncome(id).subscribe((res) => {
      if (res) {
        console.log('Income removed');
        this.getIncome()
      }
    });
  }

    totalIncome = () => {
    let totalIncome = 0;
    this.income.forEach((income: Income) => {
      totalIncome = totalIncome + income.amount; 
    });
    return totalIncome;
  };
}
