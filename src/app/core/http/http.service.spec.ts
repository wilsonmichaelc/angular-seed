import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

import { HttpService } from './http.service';
import { HttpCacheService } from './http-cache.service';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';
import { AuthTokenInterceptor } from './auth-token.interceptor';
import { AuthenticationService } from '../authentication/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtService } from '@app/shared/services/jwt.service';

describe('HttpService', () => {
  let httpCacheService: HttpCacheService;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        JwtService,
        AuthenticationService,
        ErrorHandlerInterceptor,
        CacheInterceptor,
        ApiPrefixInterceptor,
        AuthTokenInterceptor,
        HttpCacheService,
        {
          provide: HttpClient,
          useClass: HttpService
        }
      ]
    });
  });

  beforeEach(inject(
    [HttpClient, HttpTestingController, HttpCacheService],
    (_http: HttpClient, _httpMock: HttpTestingController, _httpCacheService: HttpCacheService) => {
      http = _http;
      httpMock = _httpMock;
      httpCacheService = _httpCacheService;
    }
  ));

  afterEach(() => {
    httpCacheService.cleanCache();
    httpMock.verify();
  });

  it('should use error handler, API prefix and no cache by default', () => {
    // Arrange
    let interceptors: HttpInterceptor[];
    const realRequest = http.request;
    spyOn(HttpService.prototype, 'request').and.callFake(function(this: any) {
      interceptors = this.interceptors;
      return realRequest.apply(this, arguments);
    });

    // Act
    const request = http.get('/toto');

    // Assert
    request.subscribe(() => {
      expect(http.request).toHaveBeenCalled();
      expect(interceptors.some(i => i instanceof ApiPrefixInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeFalsy();
      expect(interceptors.some(i => i instanceof AuthTokenInterceptor)).toBeTruthy();
    });
    httpMock.expectOne({}).flush({});
  });

  it('should use cache', () => {
    // Arrange
    let interceptors: HttpInterceptor[];
    const realRequest = http.request;
    spyOn(HttpService.prototype, 'request').and.callFake(function(this: any) {
      interceptors = this.interceptors;
      return realRequest.apply(this, arguments);
    });

    // Act
    const request = http.cache().get('/toto');

    // Assert
    request.subscribe(() => {
      expect(interceptors.some(i => i instanceof ApiPrefixInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof AuthTokenInterceptor)).toBeTruthy();
    });
    httpMock.expectOne({}).flush({});
  });

  it('should skip error handler', () => {
    // Arrange
    let interceptors: HttpInterceptor[];
    const realRequest = http.request;
    spyOn(HttpService.prototype, 'request').and.callFake(function(this: any) {
      interceptors = this.interceptors;
      return realRequest.apply(this, arguments);
    });

    // Act
    const request = http.skipErrorHandler().get('/toto');

    // Assert
    request.subscribe(() => {
      expect(interceptors.some(i => i instanceof ApiPrefixInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeFalsy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeFalsy();
      expect(interceptors.some(i => i instanceof AuthTokenInterceptor)).toBeTruthy();
    });
    httpMock.expectOne({}).flush({});
  });

  it('should not use API prefix', () => {
    // Arrange
    let interceptors: HttpInterceptor[];
    const realRequest = http.request;
    spyOn(HttpService.prototype, 'request').and.callFake(function(this: any) {
      interceptors = this.interceptors;
      return realRequest.apply(this, arguments);
    });

    // Act
    const request = http.disableApiPrefix().get('/toto');

    // Assert
    request.subscribe(() => {
      expect(interceptors.some(i => i instanceof ApiPrefixInterceptor)).toBeFalsy();
      expect(interceptors.some(i => i instanceof ErrorHandlerInterceptor)).toBeTruthy();
      expect(interceptors.some(i => i instanceof CacheInterceptor)).toBeFalsy();
      expect(interceptors.some(i => i instanceof AuthTokenInterceptor)).toBeTruthy();
    });
    httpMock.expectOne({}).flush({});
  });
});
