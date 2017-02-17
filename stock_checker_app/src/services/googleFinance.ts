import {Injectable} from '@angular/core';  
import {Http} from '@angular/http';

@Injectable()
export class GoogleFinanceService {  
    constructor(private http: Http) {
    }

    getStockInfo(symbol) {
        let stockInfo = this.http.get(`http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A${symbol}`);
        return stockInfo;
    }
}