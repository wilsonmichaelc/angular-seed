import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { JwtService } from '@app/shared/services/jwt.service';
import { MockAuthenticationService } from './authentication.service.mock';

const credentialsKey = 'credentials';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let mockAuthService: MockAuthenticationService;

  const fakeRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtService, AuthenticationService, MockAuthenticationService, { provide: Router, useValue: fakeRouter }]
    });
  });

  beforeEach(inject(
    [AuthenticationService, MockAuthenticationService],
    (_authenticationService: AuthenticationService, _mockAuthService: MockAuthenticationService) => {
      authenticationService = _authenticationService;
      mockAuthService = _mockAuthService;
    }
  ));

  afterEach(() => {
    // Cleanup
    localStorage.removeItem(credentialsKey);
    sessionStorage.removeItem(credentialsKey);
  });

  describe('login', () => {
    // it('should return credentials', fakeAsync(() => {
    //   // Act
    //   authenticationService.loginWithToken(mockAuthService.credentials);
    //   tick();
    //   // Assert
    //   expect(authenticationService.credentials).toBeDefined();
    //   expect(authenticationService.credentials.id_token).toBeDefined();
    //   expect(authenticationService.credentials.access_token).toBeDefined();
    // }));
    // it('should authenticate user', fakeAsync(() => {
    //   expect(authenticationService.isAuthenticated()).toBe(false);
    //   // Act
    //   authenticationService.loginWithToken(mockAuthService.credentials);
    //   tick();
    //   // Assert
    //   expect(authenticationService.isAuthenticated()).toBe(true);
    //   expect(authenticationService.credentials).toBeDefined();
    //   expect(authenticationService.credentials).not.toBeNull();
    // }));
    // it('should return the decoded id_token', fakeAsync(() => {
    //   // Act
    //   authenticationService.loginWithToken(mockAuthService.credentials);
    //   tick();
    //   // Assert
    //   expect(authenticationService.isAuthenticated()).toBe(true);
    //   expect(authenticationService.credentials).toBeDefined();
    //   expect(authenticationService.credentials).not.toBeNull();
    //   expect(<any>authenticationService.id_token).toBeDefined();
    //   expect(<any>authenticationService.id_token).not.toBeNull();
    // }));
    // it('should return the decoded username', fakeAsync(() => {
    //   // Act
    //   authenticationService.loginWithToken(mockAuthService.credentials);
    //   tick();
    //   // Assert
    //   expect(authenticationService.isAuthenticated()).toBe(true);
    //   expect(authenticationService.credentials).toBeDefined();
    //   expect(authenticationService.credentials).not.toBeNull();
    //   expect(<string>authenticationService.username).toBeDefined();
    //   expect(<string>authenticationService.username).not.toBeNull();
    // }));
  });

  describe('logout', () => {
    // it('should clear user authentication', fakeAsync(() => {
    //   // Arrange
    //   authenticationService.loginWithToken(mockAuthService.credentials);
    //   tick();
    //   // Assert
    //   expect(authenticationService.isAuthenticated()).toBe(true);
    //   authenticationService.logout();
    //   tick();
    //   expect(authenticationService.isAuthenticated()).toBe(false);
    //   expect(authenticationService.credentials).toBeNull();
    //   expect(sessionStorage.getItem(credentialsKey)).toBeNull();
    //   expect(localStorage.getItem(credentialsKey)).toBeNull();
    // }));
    // it('should clear persisted user authentication', fakeAsync(() => {
    //   // Arrange
    //   authenticationService.loginWithToken(mockAuthService.credentials);
    //   tick();
    //   // Assert
    //   expect(authenticationService.isAuthenticated()).toBe(true);
    //   authenticationService.logout();
    //   tick();
    //   expect(authenticationService.isAuthenticated()).toBe(false);
    //   expect(authenticationService.credentials).toBeNull();
    //   expect(sessionStorage.getItem(credentialsKey)).toBeNull();
    //   expect(localStorage.getItem(credentialsKey)).toBeNull();
    // }));
  });
});
