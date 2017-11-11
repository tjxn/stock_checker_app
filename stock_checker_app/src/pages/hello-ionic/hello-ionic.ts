import { Component } from '@angular/core';
import { GoogleFinanceService } from '../../services/googleFinance';
import { YahooFinanceService } from '../../services/yahooFinance';
import { AlphaVantageFinanceService } from '../../services/alphaVantageFinance';
import { FixerCurrencyService } from '../../services/fixerCurrency';
import Rx from "rxjs/Rx";

const NUMBER_OF_STOCK = 157048.00;
const COST_OF_STOCK = 29868.97;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [GoogleFinanceService, YahooFinanceService, AlphaVantageFinanceService, FixerCurrencyService]
})
export class HelloIonicPage {
  public stockSymbolCAD = "MYM.CN";
  public stockSymbolUS = "MYMMF";
  public stockPrice = 1;
  public profit = "1";
  public revenue = "1";

  // Deprecated
  // Google Finance API no longer avaible to the public
  getStockInfoViaGoogle(): void{
    this.googleFinaceService.getStockInfo(this.stockSymbolCAD).subscribe(
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

  // Deprecated
  // Yahoo Finance API no longer avaible to the public
  getStockInfoViaYahoo(): void{
        this.yahooFinanceService.getStockInfo(this.stockSymbolCAD).subscribe(
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


  getStockInfoViaAlphaVantage(): void{

    // Alpha Vantage looks up the US stock price
    // We need to use the Fixer.io Api to look up the USD to CAD conversion
    Rx.Observable.zip(this.alphaVantageFinanceService.getStockInfo(this.stockSymbolUS), this.fixerCurrencyService.getCADToUSDrate())
    .subscribe(
      success => {
        let stockInfo = success[0].text();
        let currencyInfo = success[1].text();

        let jsonStockInfo = JSON.parse(stockInfo);
        let jsonCurrencyInfo = JSON.parse(currencyInfo);

        let USDtoCADrate = jsonCurrencyInfo.rates.CAD;        
        let usStockPrice = ((jsonStockInfo["Time Series (1min)"][Object.keys(jsonStockInfo["Time Series (1min)"])[0]])["4. close"]); // Quick and dirty way of getting the first/latest time in the object, may not always work
        this.stockPrice = +((usStockPrice * USDtoCADrate).toFixed(3)); // round to 3 decimal places

        this.profit ='$' + ( this.stockPrice*NUMBER_OF_STOCK - COST_OF_STOCK).toLocaleString();
        this.revenue = '$' + ( this.stockPrice*NUMBER_OF_STOCK).toLocaleString();
        
      },
      error => {
        console.log("Error: " + error);
      }
    )
}

  constructor(private googleFinaceService: GoogleFinanceService, private yahooFinanceService:YahooFinanceService, private alphaVantageFinanceService:AlphaVantageFinanceService, private fixerCurrencyService:FixerCurrencyService) {
    this.getStockInfoViaAlphaVantage();
    setInterval(this.getStockInfoViaAlphaVantage.bind(this), 5000);
  }


}
