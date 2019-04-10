import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { JwtService } from '@app/shared/services/jwt.service';

describe('AuthenticationService', () => {
  let jwtService: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtService, AuthenticationService]
    });
  });

  beforeEach(inject([JwtService], (_jwtService: JwtService) => {
    jwtService = _jwtService;
  }));

  describe('decode', () => {
    it('token should be decoded', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const decodedToken = jwtService.decode(token);
      expect(decodedToken).toBeDefined();
      expect(decodedToken.hasOwnProperty('name')).toBeTruthy();
    });
  });
});
