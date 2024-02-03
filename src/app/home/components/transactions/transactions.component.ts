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

  @ViewChild('myChart') chartCanvas!: ElementRef;
  constructor(
    private financeService: FinanceService,
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

  //Configuring chart
  showChart(): void {
    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      const financeData = this.financeService.getFinanceDataForChart();
      console.log('Finance Data:', financeData);

      const existingChart = Chart.getChart(this.chartCanvas.nativeElement);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(this.chartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: financeData.map((entry) => entry.date),
          datasets: [
            {
              label: 'Expense',
              data: financeData.map((entry) => entry.expense),
              backgroundColor: 'green',
              tension: 0.2,
            },
            {
              label: 'Income',
              data: financeData.map((entry) => entry.income),
              backgroundColor: 'red', 
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
    } else {
      console.error('Chart canvas or its native element is not available.');
    }
  }
}
