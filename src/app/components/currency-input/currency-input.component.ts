import { Component, HostListener, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-currency-input",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./currency-input.component.html",
  styleUrl: "./currency-input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CurrencyInputComponent,
    },
  ],
})
export class CurrencyInputComponent implements ControlValueAccessor {
  @Input()
  get value(): number {
    return this.currentValue;
  }

  set value(value: number) {
    this.currentValue = value;
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  @HostListener("keypress", ["$event"])
  onKeypress(event: KeyboardEvent) {
    if (event.key < "0" || event.key > "9") {
      event.preventDefault();
    }
  }

  currentValue: number = 0;

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
      this.value = value;
      this.onChange(this.value);
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener("paste", this.onPaste);
    document.removeEventListener("keypress", this.onKeypress);
  }

  // Value accessor methods start
  onChange = (currenctValue: number) => {};
  onTouched = () => {};

  public writeValue(value: number) {
    this.currentValue = value;
  }
  public registerOnChange(fn: any) {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
