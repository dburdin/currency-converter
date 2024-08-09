import { Component, HostListener, Input, Output, EventEmitter } from "@angular/core";
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
  get value(): string {
    return this.currentValue;
  }

  set value(v: string) {
    if (v !== this.currentValue) {
      this.currentValue = v;
    }
  }

  @Output() onChange = new EventEmitter<string>();

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
  constructor() {}
  currentValue: string = "";

  onInput() {
    if (this.currentValue === "") {
      this.currentValue = "0";
    }
    this.onChange.emit(this.currentValue);
  }
}
