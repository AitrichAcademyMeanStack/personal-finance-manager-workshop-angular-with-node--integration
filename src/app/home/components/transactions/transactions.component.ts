import { Component, Input, OnInit } from '@angular/core';
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
  constructor(
    private financeService: FinanceService,
    private expense: ExpenseService
  ) {}

  totalExp: Expense | any;

  ngOnInit(): void {
      this.financeService.totalExpense$.subscribe((total) => {
        this.totalExpense = total; // Subscribing from observable
        this.updateTotalBalance(); // Updating Balance
        this.showChart();
      });
      this.financeService.updateTotalExpense(); // Updating total Expense
      this.financeService.totalIncome$.subscribe((total) => {
        this.totalIncome = total; // Subscribing from observable
        this.updateTotalBalance(); // Updating Balance
        this.showChart();
      });
      this.financeService.updateTotalIncome(); // Updating total Income
      this.showChart();

  }

  // Fetching total balance
  updateTotalBalance() {
    this.totalBalance = this.financeService.getTotalBalance();
  }
  showChart() {
    new Chart('myChart', {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
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
