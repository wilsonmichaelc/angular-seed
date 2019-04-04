import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  search(): Observable<string> {
    return this.httpClient.get('/version', { responseType: 'json' }).pipe(
      map((res: any) => res),
      catchError(err => of(`Error executing search: ${err.message}`))
    );
  }
}
