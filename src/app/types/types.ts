export interface CurrencyApiProp {
  cc: string;
  exchangedate: string;
  r030: number;
  rate: number;
  txt: string;
}

export interface InputSelectGroup {
  currency: string;
  value: number;
}
export interface FormData {
  from: InputSelectGroup;
  to: InputSelectGroup;
}

export interface RatesProp {
  cc: string;
  rate: number;
}
