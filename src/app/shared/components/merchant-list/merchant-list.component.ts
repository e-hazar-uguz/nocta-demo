import { Component, OnInit, ViewChild } from '@angular/core';
import { MerchantListService } from '../../services/merchant-list.service';
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { Subject } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Transaction } from '../../models/merchant.model';

@Component({
  selector: 'app-merchant-list',
  standalone: true,
  imports: [DataTablesModule,CommonModule],
  templateUrl: './merchant-list.component.html',
  styleUrl: './merchant-list.component.css',
  providers: [DatePipe]
})
export class MerchantListComponent implements OnInit {

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  title = 'MERCHANT LIST'
  merchantList: Transaction[] = [];


  constructor(
    private merchantService:MerchantListService,
    private router: Router,
    private datePipe: DatePipe
    ) {}

    ngOnInit(): void {

      this.dtOptions = {
        paging: true,
        info: true,
        pagingType: 'full_numbers',
        pageLength: 10,
        dom: '<lf<t>ip>',
        destroy: true,
        order: [[0, 'asc']],
        searching: true,
        columns: [
          { title: 'ID', data: 'id' },
          { title: 'Merchant Name', data: 'merchantName' },
          { title: 'Merchant MCC', data: 'merchantMCC' },
          { title: 'Transaction Amount', data: 'transactionAmount' },
          { title: 'Transaction Date', data: 'transactionDate' }
        ]
      };
      this.getAllMerchant();
    }

    formatDate(date: any): string | null {
      return this.datePipe.transform(date, 'dd.MM.yyyy HH:mm:ss');
    }

    getAllMerchant() {
      this.merchantService.getAllMerchant().subscribe(data => {
        if (data) {
          this.merchantList = data.map((item: any) => {
            return {
              ...item,
              transactionDate: new Date(item.transactionDate),
              formattedDate: this.formatDate(new Date(item.transactionDate))
            };
          });
          const monthlyTotals = Array(12).fill(0);

          for (let month = 0; month < 12; month++) {
            const monthlyTransactions = this.merchantList.filter(item => {
              const date = new Date(item.transactionDate);
              return date.getMonth() === month;
            });

            const totalAmount = monthlyTransactions.reduce((sum, item) => {
              const amount = parseFloat(item.transactionAmount);
              return sum + (isNaN(amount) ? 0 : amount);
            }, 0);

            monthlyTotals[month] = totalAmount;
          }
          this.updatePieChart(monthlyTotals);

          this.dtTrigger.next('');
        }
      });
    }


    updatePieChart(monthlyTotals: number[]) {
      const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;

      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ],
            datasets: [{
              label: 'Monthly Transaction Amount',
              data: monthlyTotals,
              backgroundColor: [
                '#0033A0',
                '#FFD700',
                '#E7E9ED',
                '#FF6384',
                '#4BC0C0',
                '#8E5EA2',
                '#E91E63',
                '#FF5722',
                '#000000',
                '#FFCE56',
                '#F6D6AD',
                '#FFABAB'
              ]

              ,
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {

                    const value = (tooltipItem.raw as number).toFixed(2);
                    return `${tooltipItem.label}: ${value}`;
                  }
                }
              }
            }
          }
        });
      }
    }

  onRowClick(id: number): void {
    this.router.navigate(['/merchant-detail/',id]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  logout(){
    localStorage.clear();
    location.reload();
  }

}
