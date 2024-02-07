import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart , CategoryScale , LinearScale, Title , Tooltip , Legend, ArcElement  } from 'chart.js/auto';
import { FinanceService } from '../../services/finance.service';
import { ExpenseComponent } from '../../expense/expense.component';
import { Expense } from '../../models/Expense';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  totalExpense: number = 0;
  totalIncome: number = 0;
  totalBalance: number = 0;

  @ViewChild('myChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  constructor(
    private financeService: FinanceService,
  ) {}

  totalExp: Expense | any;

  ngOnInit(): void {
    this.financeService.totalExpense$.subscribe((total) => {
      this.totalExpense = total; // Subscribing from observable
      this.updateTotalBalance(); // Updating Balance
    });
    this.financeService.updateTotalExpense(); // Updating total Expense
    this.financeService.totalIncome$.subscribe((total) => {
      this.totalIncome = total; // Subscribing from observable
      this.updateTotalBalance(); // Updating Balance
    });
    this.financeService.updateTotalIncome(); // Updating total Income
    // Fetching chart logic from Service
    this.financeService.getFinanceDataForChart().subscribe((financeData) => {
      const dates = financeData.map((data) => data.date);
      const expenses = financeData.map((data) => data.expense);
      const incomes = financeData.map((data) => data.income);

      this.showChart(dates, expenses, incomes);
    });
  }

  // Fetching total balance
  updateTotalBalance() {
    this.totalBalance = this.financeService.getTotalBalance();
  }

  //Configuring chart
  showChart(dates: any[], expenses: any[] , incomes: any[]): void {
  new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Expense',
            data: expenses,
            backgroundColor: 'red',
            tension: 0.2,
          },
          {
            label: 'Income',
            data: incomes,
            backgroundColor: 'green',
            tension: 0.2,
          },
        ],
      },
       options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    } 
}
