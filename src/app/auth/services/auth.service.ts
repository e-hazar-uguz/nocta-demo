import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService) {}

  isLoggedIn(): boolean {
    const token = this.localStorageService.getItem('token');
    return !!token;
  }
}
