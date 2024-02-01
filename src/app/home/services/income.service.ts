import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {

  private apiUrl = environment.apiEndPoint;

  constructor(private http: HttpClient) {}

  // Adding Income
  addIncome(data: any) {
    return this.http.post(`${this.apiUrl}/api/v1/income`, data);
  }

  // Fetching Income
  fetchIncome() {
    return this.http.get(`${this.apiUrl}/api/v1/income`);
  }

  // Deleting Income
  deleteIncome(_id: string) {
    return this.http.delete(`${this.apiUrl}/api/v1/income/${_id}`);
  }
}
