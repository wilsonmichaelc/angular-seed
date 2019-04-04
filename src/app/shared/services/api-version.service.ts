import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiVersionService {
  constructor(private httpClient: HttpClient) {}

  getApiVersion(): Observable<any> {
    return this.httpClient.get('/version').pipe(
      map((res: any) => res),
      catchError(err => of(''))
    );
  }
}
