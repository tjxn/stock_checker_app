import {Injectable} from '@angular/core';  
import {Http} from '@angular/http';

@Injectable()
export class YahooFinanceService {  
    constructor(private http: Http) {
    }

    getStockInfo(symbol) {
        let stockInfo = this.http.get(`http://finance.yahoo.com/d/quotes.csv?s=${symbol}&f=l1`);
        return stockInfo;
    }
}