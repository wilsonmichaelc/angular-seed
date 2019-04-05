import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { HomeComponent } from '@app/modules/home/home.component';
import { SharedModule } from '@app/shared';
import { click } from '@app/testing/utils';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthenticationService;

  function getElements() {
    return {
      username: fixture.debugElement.query(By.css('#username')),
      password: fixture.debugElement.query(By.css('#password')),
      loginButton: fixture.debugElement.query(By.css('#login-btn')).nativeElement as HTMLButtonElement,
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
        RouterTestingModule.withRoutes([{ path: 'home', component: HomeComponent }])
      ],
      declarations: [LoginComponent, HomeComponent],
      providers: [AuthenticationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    authService = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  describe('LoginComponent', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not enable Login button if username and password are not provided', () => {
      const elements = getElements();
      expect(elements.loginButton.disabled).toBeTruthy();
    });

    it('should enable the Login button if a valid username and password are provided', () => {
      const elements = getElements();
      component.loginForm.patchValue({ username: 'test@example.com', password: 'Pa55uuord!' });
      fixture.detectChanges();
      expect(elements.loginButton.disabled).toBeFalsy();
    });

    it('should navigate to home page if login response is successful', fakeAsync(() => {
      spyOn(authService, 'login').and.returnValue(of({ idToken: 'yes' }));
      const routerSpy = spyOn(router, 'navigate');
      component.loginForm.patchValue({ username: 'test@example.com', password: 'Pa55uuord!' });
      fixture.detectChanges();
      const elements = getElements();
      click(elements.loginButton);
      fixture.detectChanges();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['home']);
    }));

    it('should display an error message if login response indicates user is not confirmed', fakeAsync(() => {
      spyOn(authService, 'login').and.returnValue(of({ code: 'UserNotConfirmedException', message: 'login error' }));
      const routerSpy = spyOn(router, 'navigate');
      component.loginForm.patchValue({ username: 'test@example.com', password: 'Pa55uuord!' });
      fixture.detectChanges();
      let elements = getElements();
      click(elements.loginButton);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      elements = getElements();
      expect(elements.loginError.nativeElement.innerText).toContain('login error');
      tick(1001);
      expect(routerSpy).toHaveBeenCalledWith(['resend-activation']);
    }));

    it('should display an error message if login response is Unsuccessful', fakeAsync(() => {
      spyOn(authService, 'login').and.returnValue(of({ message: 'login error' }));
      component.loginForm.patchValue({ username: 'test@example.com', password: 'Pa55uuord!' });
      fixture.detectChanges();
      let elements = getElements();
      click(elements.loginButton);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      elements = getElements();
      expect(elements.loginError.nativeElement.innerText).toEqual('login error');
    }));
  });
});
