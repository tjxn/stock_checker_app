import {Injectable} from '@angular/core';  
import {Http} from '@angular/http';

@Injectable()
export class FixerCurrencyService {  
    constructor(private http: Http) {
    }
    
    getCADToUSDrate() {
        let currencyInfoObs = this.http.get(`https://api.fixer.io/latest?base=USD&symbols=CAD`);
        return currencyInfoObs;
    }
}