import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CurrencyApiProp } from "../types/types";

@Injectable({
  providedIn: "root",
})
export class CurrencyLocalStore {
  private currenciesInfoSubject = new BehaviorSubject<CurrencyApiProp[]>([]);
  currenciesInfo$ = this.currenciesInfoSubject.asObservable();

  setCurrenciesInfo(currenciesInfo: CurrencyApiProp[]) {
    this.currenciesInfoSubject.next(currenciesInfo);
  }
}
