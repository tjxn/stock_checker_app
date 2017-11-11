import {Injectable} from '@angular/core';  
import {Http} from '@angular/http';

@Injectable()
export class AlphaVantageFinanceService {  
    constructor(private http: Http) {
    }
    
    getStockInfo(symbol) {
        let stockInfo = this.http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=LWMHQ6HS351BTI11`);
        return stockInfo;
    }
}