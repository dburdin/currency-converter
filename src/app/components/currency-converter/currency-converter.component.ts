import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CurrencyLocalStore } from "../../store/store.component";
import { FormData, RatesProp, CurrencyApiProp } from "../../types/types";
import { CurrencyInputComponent } from "../currency-input/currency-input.component";
import { CurrencySelectComponent } from "../currency-select/currency-select.component";

@Component({
  standalone: true,
  selector: "app-currency-converter",
  templateUrl: "./currency-converter.component.html",
  styleUrls: ["./currency-converter.component.scss"],
  imports: [FormsModule, CurrencyInputComponent, CurrencySelectComponent],
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  rates: RatesProp[] = [];

  formData: FormData = {
    from: { currency: "USD", value: 1 },
    to: { currency: "UAH", value: 0 },
  };

  constructor(private currencyLocalStore: CurrencyLocalStore) {}

  ngOnInit(): void {
    this.currencyLocalStore.currenciesInfo$.pipe(takeUntil(this.destroy$)).subscribe((currenciesInfo: CurrencyApiProp[]) => {
      this.rates = [{ cc: "UAH", rate: 1 }, ...currenciesInfo];
      this.convert();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get options(): string[] {
    return this.rates.map((rate) => rate.cc);
  }

  get hotOptions(): string[] {
    return this.rates.filter(({ cc }) => ["USD", "EUR", "UAH"].includes(cc)).map(({ cc }) => cc);
  }

  updateCurrency(side: "from" | "to", currency: string): void {
    this.formData[side].currency = currency;
    this.convert(side);
  }

  updateValue(side: "from" | "to", value: number): void {
    this.formData[side].value = value;
    this.convert(side);
  }

  private getRate(currency: string): number {
    return this.rates.find((rate) => rate.cc === currency)?.rate || 1;
  }

  private convert(changedSide: "from" | "to" = "from"): void {
    const fromRate = this.getRate(this.formData.from.currency);
    const toRate = this.getRate(this.formData.to.currency);
    const rate = fromRate / toRate;

    if (changedSide === "from") {
      this.formData.to.value = this.formData.from.value ? Number((this.formData.from.value * rate).toFixed(2)) : 0;
    } else {
      this.formData.from.value = this.formData.to.value ? Number((this.formData.to.value / rate).toFixed(2)) : 0;
    }
  }
}
