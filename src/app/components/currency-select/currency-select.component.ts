import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-currency-select",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./currency-select.component.html",
  styleUrls: ["./currency-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CurrencySelectComponent,
    },
  ],
})
export class CurrencySelectComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() hotOptions: string[] = [];
  @Input() disabledOption: string = "";

  currentValue = "";
  isDropdownOpen = false;

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  select(value: string): void {
    if (value !== this.disabledOption) {
      this.currentValue = value;
      this.closeDropdown();
      this.onChange(this.currentValue);
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onChange = (currentValue: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.currentValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
