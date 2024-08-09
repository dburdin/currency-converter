import { ApiService } from "./services/api.service";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { FooterComponent } from "./components/layout/footer/footer.component";
import { HeaderComponent } from "./components/layout/header/header.component";

import { CurrencyLocalStore } from "./store/store.component";

import { CurrencyApiProp } from "./types/types";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "currency-converter";

  isLoading: boolean = false;
  currenciesInfo: CurrencyApiProp[] = [];

  constructor(private apiService: ApiService, private currencyLocalStore: CurrencyLocalStore) {}

  ngOnInit() {
    this.isLoading = true;
    this.apiService.getAll().subscribe((res) => {
      this.currenciesInfo = res;
      this.currencyLocalStore.setCurrenciesInfo(res);
      this.isLoading = false;
    });
  }
}
