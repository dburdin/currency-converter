import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-currency-select",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./currency-select.component.html",
  styleUrls: ["./currency-select.component.scss"],
})
export class CurrencySelectComponent {
  @Input() options: string[] = [];
  @Input() hotOptions: string[] = [];

  @Input() disabledOption: string = "";

  @Input()
  set value(value: string) {
    this.currentValue = value;
  }
  get value(): string {
    return this.currentValue;
  }

  @Output() onChange = new EventEmitter<string>();

  currentValue = "";
  isDropdownOpen = false;

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  select(value: string): void {
    if (value !== this.disabledOption) {
      this.currentValue = value;
      this.closeDropdown();
      this.onChange.emit(this.currentValue);
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
