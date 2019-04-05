import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JwtService } from '@app/shared/services/jwt.service';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;

  const fakeRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtService, AuthenticationService, { provide: Router, useValue: fakeRouter }]
    });
  });

  beforeEach(inject([AuthenticationService], (_authService: AuthenticationService) => {
    authService = _authService;
  }));

  describe('signup', () => {
    it('should have been called', () => {
      authService.signup({ email: '', password: '' }).then((response: Object) => {
        expect(response).toBeDefined();
      });
    });
  });

  describe('re-send activation email', () => {
    it('should have been called', () => {
      authService.resendActivationEmail({ email: '' }).then((response: Object) => {
        expect(response).toBeDefined();
      });
    });
  });

  describe('login', () => {
    it('should have been called', () => {
      authService.login({ username: '', password: '' }).subscribe((response: boolean) => {
        expect(response).toBeDefined();
      });
    });
  });

  describe('logout', () => {
    it('should have been called', () => {
      spyOn(authService, 'logout').and.callThrough();
      authService.logout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('initiate forgot password', () => {
    it('should have been called', () => {
      authService.initiateForgotPassword('').then((response: Object) => {
        expect(response).toBeDefined();
      });
    });
  });

  describe('complete password reset', () => {
    it('should have been called', () => {
      authService.completeForgotPassword({ username: '', code: '', password: '' }).then((response: Object) => {
        expect(response).toBeDefined();
      });
    });
  });

  describe('change password', () => {
    it('should have been called', () => {
      authService.changePassword('', '').then((response: Object) => {
        expect(response).toBeDefined();
      });
    });
  });

  describe('get current user', () => {
    it('should have been called', () => {
      const result = authService.getCurrentUser();
      expect(result).toBeDefined();
    });
  });

  describe('get id token', () => {
    it('should have been called', () => {
      const result = authService.getIdToken();
      expect(result).toBeDefined();
    });
  });

  describe('get current user email', () => {
    it('should have been called', () => {
      const result = authService.getCurrentUserEmail();
      expect(result).toBeDefined();
    });
  });

  describe('get current user groups', () => {
    it('should have been called', () => {
      const result = authService.getCurrentUserGroups();
      expect(result).toBeDefined();
    });
  });

  describe('get authentication state', () => {
    it('should have been called', () => {
      const result = authService.getAuthenticationState();
      expect(result).toBeDefined();
    });
  });

  describe('is authenticated', () => {
    it('should have been called', () => {
      const result = authService.isAuthenticated();
      expect(result).toBeDefined();
    });
  });
});
