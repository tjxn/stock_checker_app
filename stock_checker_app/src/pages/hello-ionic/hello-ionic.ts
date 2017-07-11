import { Component } from '@angular/core';
import { GoogleFinanceService } from '../../services/googleFinance';

const NUMBER_OF_STOCK = 143108.00; // + 13940
const COST_OF_STOCK = 21773.29; // + 8245.8

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [GoogleFinanceService]
})
export class HelloIonicPage {
  public stockSymbol = "MYM";
  public stockPrice = 1;
  public profit = "1";
  public revenue = "1";

  getStockInfo(): void{
      this.googleFinaceService.getStockInfo(this.stockSymbol).subscribe(
        data => {
               let json: string = data.text();
               json = json.replace('// [', "");
               json = json.replace(']', "");

               let obj = JSON.parse(json);

               this.stockPrice = obj.l;
               this.profit ='$' + ( this.stockPrice*NUMBER_OF_STOCK - COST_OF_STOCK).toLocaleString();
               this.revenue = '$' + ( this.stockPrice*NUMBER_OF_STOCK).toLocaleString();
            },
        err => console.error(err),
        );
  }

  constructor(private googleFinaceService: GoogleFinanceService) {
    this.getStockInfo();
    setInterval(this.getStockInfo.bind(this), 5000);
  }


}
