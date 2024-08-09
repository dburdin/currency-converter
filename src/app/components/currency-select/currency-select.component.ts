import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-currency-select",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./currency-select.component.html",
  styleUrl: "./currency-select.component.scss",
})
export class CurrencySelectComponent {
  @Input() options: [string][] = [];
  @Input() hotOptions: [string][] = [];

  @Input() disabledOption: string = "";

  @Input()
  get value(): string {
    return this.currentValue;
  }
  set value(v: string) {
    this.currentValue = v;
  }

  @Output() onChange = new EventEmitter<string>();

  currentValue = "";
  isDropdownOpen = false;

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  select(value: string) {
    if (value !== this.disabledOption) {
      this.currentValue = value;
      this.closeDropdown();
      this.onChange.emit(this.currentValue);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  get showedValue(): string {
    return this.currentValue;
  }
}
