import { Component } from '@angular/core';
import { GoogleFinanceService } from '../../services/googleFinance';
import { YahooFinanceService } from '../../services/yahooFinance';

const NUMBER_OF_STOCK = 143108.00; // + 13940
const COST_OF_STOCK = 21773.29; // + 8245.8

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [GoogleFinanceService, YahooFinanceService]
})
export class HelloIonicPage {
  public stockSymbol = "MYM.CN";
  public stockPrice = 1;
  public profit = "1";
  public revenue = "1";

  // Deprecated
  // Google Finance API no longer avaible to the public
  getStockInfoViaGoogle(): void{
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

  getStockInfoViaYahoo(): void{
        this.yahooFinanceService.getStockInfo(this.stockSymbol).subscribe(
          success => {
            this.stockPrice = parseFloat(success.text());
            this.profit ='$' + ( this.stockPrice*NUMBER_OF_STOCK - COST_OF_STOCK).toLocaleString();
            this.revenue = '$' + ( this.stockPrice*NUMBER_OF_STOCK).toLocaleString();
          },
          error => {
            console.error(error);
          }
        ) 
  }

  constructor(private googleFinaceService: GoogleFinanceService, private yahooFinanceService:YahooFinanceService) {
    this.getStockInfoViaYahoo();
    setInterval(this.getStockInfoViaYahoo.bind(this), 5000);
  }


}
