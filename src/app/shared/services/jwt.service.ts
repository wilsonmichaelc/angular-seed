import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
  constructor() {}

  decode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}
