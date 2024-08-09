import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CurrencyApiProp } from "../../../types/types";
import { LoaderComponent } from "../../common/loader/loader.component";
import { CurrencyLocalStore } from "../../../store/store.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  constructor(private currencyLocalStore: CurrencyLocalStore) {}

  @Input() isLoading: boolean = false;

  headerCurrencies: CurrencyApiProp[] = [];

  ngOnInit() {
    this.currencyLocalStore.currenciesInfo$.subscribe((currenciesInfo) => {
      const response = currenciesInfo.filter((currency) => currency.cc === "USD" || currency.cc === "EUR");
      this.headerCurrencies = response;
    });
  }
}
