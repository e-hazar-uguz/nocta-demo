import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantListService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'https://66a161c07053166bcabedc90.mockapi.io/transactions/transactions';

  getAllMerchant(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }
}
