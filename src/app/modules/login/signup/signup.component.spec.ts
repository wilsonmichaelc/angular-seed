import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { click } from '@app/testing/utils';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from './signup.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let router: Router;
  let authService: AuthenticationService;

  function getElements() {
    return {
      email: fixture.debugElement.query(By.css('#email')),
      password: fixture.debugElement.query(By.css('#password')),
      signUpButton: fixture.debugElement.query(By.css('#sign-up-button')).nativeElement as HTMLButtonElement,
      loginError: fixture.debugElement.query(By.css('.login-error'))
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        SharedModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        CoreModule,
        RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }])
      ],
      declarations: [SignUpComponent, LoginComponent],
      providers: [AuthenticationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    authService = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  describe('SignUpComponent', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not enable Sign Up button if email and password are not provided', () => {
      const elements = getElements();
      expect(elements.signUpButton.disabled).toBeTruthy();
    });

    it('should enable the Sign Up button if a valid email and password are provided', () => {
      const elements = getElements();
      component.signupForm.patchValue({ email: 'test@example.com', password: 'Ab1!Ab1!' });
      fixture.detectChanges();
      expect(elements.signUpButton.disabled).toBeFalsy();
    });

    it('should navigate to login page if signup response is successful', fakeAsync(() => {
      spyOn(authService, 'signup').and.returnValue(Promise.resolve({ user: 'yes' }));
      const routerSpy = spyOn(router, 'navigate');
      component.signupForm.patchValue({ email: 'test@example.com', password: 'Ab1!Ab1!' });
      fixture.detectChanges();
      const elements = getElements();
      click(elements.signUpButton);
      fixture.detectChanges();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['login']);
    }));

    it('should display an error message if signup response is UNsuccessful', fakeAsync(() => {
      spyOn(authService, 'signup').and.returnValue(Promise.resolve({ message: 'login error' }));
      const routerSpy = spyOn(router, 'navigate');
      component.signupForm.patchValue({ email: 'test@example.com', password: 'Ab1!Ab1!' });
      fixture.detectChanges();
      let elements = getElements();
      click(elements.signUpButton);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      elements = getElements();
      expect(elements.loginError.nativeElement.innerText).toEqual('login error');
    }));
  });
});
