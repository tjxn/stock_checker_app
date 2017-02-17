import { Component } from '@angular/core';
import { GoogleFinanceService } from '../../services/googleFinance';
//import { Http } from '@angular/http';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [GoogleFinanceService]
})
export class HelloIonicPage {
  public stockSymbol = "MYM";
  public stockPrice = 1;
  public profit = "1";

  getStockInfo(): void{
      this.googleFinaceService.getStockInfo(this.stockSymbol).subscribe(
        data => {
               let json: string = data.text();
               json = json.replace('// [', "");
               json = json.replace(']', "");

               let obj = JSON.parse(json);

               this.stockPrice = obj.l;
               this.profit ='$' + ( this.stockPrice*143108.00 - 21773.29).toLocaleString();
            },
        err => console.error(err),
        );
  }

  constructor(private googleFinaceService: GoogleFinanceService) {
    setInterval(this.getStockInfo.bind(this), 1000);
  }


}
