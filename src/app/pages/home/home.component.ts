import { Component } from "@angular/core";
import { CurrencyConverterComponent } from "../../components/currency-converter/currency-converter.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CurrencyConverterComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
