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


  constructor(private financeService: FinanceService , private expense: ExpenseService) {}

  
totalExp : Expense | any
  
  ngOnInit(): void {
    this.showChart();
    this.getAllExp()
    this.getTotalExpense()
    
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
  // get balance(): number {
  //   return this.financeService.getBalance();
  // }

  // get financeServiceData(): FinanceService {
  //   return this.financeService;
  // }

  // getIncome = () => {
  //   return this.expense.totalExpenses
  // }

  getAllExp(){
    this.expense.fetchExpenditure().subscribe((res) => {
      this.totalExp = res

    })
  }
  getTotalExpense(){
    this.financeService.updateTotalExpense()
  }


}
