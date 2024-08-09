import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { CurrencyLocalStore } from "../../store/store.component";
import { CurrencyInputComponent } from "./currency-input/currency-input.component";
import { CurrencySelectComponent } from "../currency-select/currency-select.component";

import { FormData, RatesProp, CurrencyApiProp } from "../../types/types";

@Component({
  selector: "app-currency-converter",
  standalone: true,
  imports: [FormsModule, CurrencyInputComponent, CurrencySelectComponent],
  templateUrl: "./currency-converter.component.html",
  styleUrl: "./currency-converter.component.scss",
})
export class CurrencyConverterComponent {
  rates: RatesProp[] = [];

  isFromInput: boolean = true;

  formData: FormData = {
    from: {
      currency: "Choose Currency",
      value: "0",
    },
    to: {
      currency: "Choose Currency",
      value: "0",
    },
  };

  constructor(private currencyLocalStore: CurrencyLocalStore) {}

  ngOnInit(): void {
    this.currencyLocalStore.currenciesInfo$.subscribe((currenciesInfo: CurrencyApiProp[]) => {
      this.rates = [
        {
          cc: "UAH",
          rate: 1,
        },
        ...currenciesInfo.map(({ cc, rate }) => ({ cc, rate })),
      ];
    });
  }

  get options(): [string][] {
    return this.rates.map((opt) => [opt.cc]);
  }

  updateCurrency(side: "from" | "to", currency: string) {
    side === "from" ? (this.formData.to.currency = currency) : (this.formData.from.currency = currency);
    this.isFromInput = side === "from";
    this.convert();
  }

  updateValue(side: "from" | "to", value: string) {
    side === "from" ? (this.formData.to.value = value) : (this.formData.from.value = value);
    this.isFromInput = side === "from";
    this.convert();
  }

  getRate(currency: string): number {
    return this.rates.filter((rate) => rate.cc === currency)[0].rate;
  }

  getCurrentFormValues() {
    let input = this.formData.to;
    let output = this.formData.from;

    if (!this.isFromInput) {
      input = this.formData.from;
      output = this.formData.to;
    }

    return [input, output];
  }

  convert() {
    const [input, output] = this.getCurrentFormValues();

    const inputRate = this.getRate(input.currency);
    const outputRate = this.getRate(output.currency);
    const rate = inputRate / outputRate;

    if (isNaN(Number(input.value)) || Number(input.value) === 0) {
      output.value = "0";
    } else {
      output.value = (Number(input.value) * rate).toFixed(2);
    }
  }
}
