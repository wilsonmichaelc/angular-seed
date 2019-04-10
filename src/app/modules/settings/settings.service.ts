import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './settings.entities';

@Injectable()
export class SettingsService {
  constructor(private httpClient: HttpClient) {}

  getUser(): Promise<User> {
    return this.httpClient.get<User>('/users').toPromise();
  }

  updateUser(user: User): Promise<User> {
    return this.httpClient.post<User>('/users', user).toPromise();
  }
}
