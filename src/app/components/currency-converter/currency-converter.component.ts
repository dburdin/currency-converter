import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CurrencyLocalStore } from "../../store/store.component";
import { RatesProp, CurrencyApiProp } from "../../types/types";
import { CurrencyInputComponent } from "../currency-input/currency-input.component";
import { CurrencySelectComponent } from "../currency-select/currency-select.component";

@Component({
  standalone: true,
  selector: "app-currency-converter",
  templateUrl: "./currency-converter.component.html",
  styleUrls: ["./currency-converter.component.scss"],
  imports: [CurrencyInputComponent, CurrencySelectComponent, ReactiveFormsModule],
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public rates: RatesProp[] = [];
  public form: FormGroup;

  constructor(private currencyLocalStore: CurrencyLocalStore, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      valueFrom: [1],
      currencyFrom: ["USD"],
      valueTo: [0],
      currencyTo: ["UAH"],
    });
  }

  ngOnInit(): void {
    this.currencyLocalStore.currenciesInfo$.pipe(takeUntil(this.destroy$)).subscribe((currenciesInfo: CurrencyApiProp[]) => {
      this.rates = [{ cc: "UAH", rate: 1 }, ...currenciesInfo];
      this.convert();
    });

    this.form
      .get("valueFrom")
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.convert("from");
      });
    this.form
      .get("currencyFrom")
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.convert("from");
      });

    this.form
      .get("valueTo")
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.convert("to");
      });
    this.form
      .get("currencyTo")
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.convert("to");
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

  private getRate(currency: string): number {
    return this.rates.find((rate) => rate.cc === currency)?.rate || 1;
  }

  private convert(changedSide: "from" | "to" = "from"): void {
    const fromRate = this.getRate(this.form.get("currencyFrom")?.value);
    const toRate = this.getRate(this.form.get("currencyTo")?.value);

    const rate = fromRate / toRate;

    if (changedSide === "from") {
      this.updateValueTo(rate);
    } else {
      this.updateValueFrom(rate);
    }
  }

  private updateValueTo(rate: number): void {
    const valueFrom = this.form.get("valueFrom")?.value;
    const convertedValue = valueFrom ? Number((valueFrom * rate).toFixed(2)) : 0;
    if (this.form.get("valueTo")?.value !== convertedValue) {
      this.form.patchValue({ valueTo: convertedValue }, { emitEvent: false });
    }
  }

  private updateValueFrom(rate: number): void {
    const valueTo = this.form.get("valueTo")?.value;
    const convertedValue = valueTo ? Number((valueTo / rate).toFixed(2)) : 0;
    if (this.form.get("valueFrom")?.value !== convertedValue) {
      this.form.patchValue({ valueFrom: convertedValue }, { emitEvent: false });
    }
  }
}
