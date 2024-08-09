import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from "../constants/constants";

import { CurrencyApiProp } from "../types/types";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CurrencyApiProp[]> {
    return this.http.get<CurrencyApiProp[]>(API_URL);
  }
}
