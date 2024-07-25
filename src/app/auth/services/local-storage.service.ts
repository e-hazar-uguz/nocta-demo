import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

//PLATFORM_ID, Angular’ın platform özelliklerini belirten bir semboldür ve tarayıcının (browser) veya sunucunun (server) hangi platformda çalıştığını anlamak için kullanılır.

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  //isPlatformBrowser(this.platformId) fonksiyonu, uygulamanın tarayıcıda çalışıp çalışmadığını kontrol eder. Eğer tarayıcıda çalışıyorsa, localStorage.getItem(key) ile yerel depolamadan değeri alır. Aksi takdirde null döner.
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  //isPlatformBrowser(this.platformId) ile tarayıcıda çalışıp çalışmadığını kontrol eder. Tarayıcıda çalışıyorsa, localStorage.setItem(key, value) ile veriyi depolar.
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }
}
