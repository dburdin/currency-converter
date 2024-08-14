import { Component, HostListener, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-currency-input",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./currency-input.component.html",
  styleUrl: "./currency-input.component.scss",
})
export class CurrencyInputComponent {
  @Input()
  get value(): number {
    return this.currentValue;
  }

  set value(value: number) {
    this.currentValue = value;
  }

  @Output() onChange = new EventEmitter<number>();

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

  ngOnDestroy(): void {
    document.removeEventListener("paste", this.onPaste);
    document.removeEventListener("keypress", this.onKeypress);
  }

  currentValue: number = 0;

  onInput() {
    this.onChange.emit(this.currentValue);
  }
}
