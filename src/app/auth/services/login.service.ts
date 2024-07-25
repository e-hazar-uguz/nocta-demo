import { Injectable } from '@angular/core';
import { LoginRequestInterface } from '../../shared/models/loginRequest.model';
import { CurrentUserInterface } from '../../shared/models/currentUser.model';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/auth/login';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getUser(response: CurrentUserInterface) {
    return response
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<CurrentUserInterface>(this.apiUrl, data, { headers: this.headers })
      .pipe(
        map(response => {
          return this.getUser(response);
        })
      );
  }

}
