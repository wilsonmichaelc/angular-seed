import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './update-profile/update-profile.component';

@Injectable()
export class SettingsService {
  constructor(private httpClient: HttpClient) {}

  getUser(): Promise<any> {
    return this.httpClient.get('http://localhost:8083/users').toPromise();
  }

  updateUser(user: User): Promise<any> {
    return this.httpClient.post('http://localhost:8083/users', user).toPromise();
  }
}
