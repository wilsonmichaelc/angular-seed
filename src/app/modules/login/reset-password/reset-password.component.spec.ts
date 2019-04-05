import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule, AuthenticationService } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

import { LoginService } from '../login.service';
import { ResetPasswordComponent } from './reset-password.component';
import { click } from '@app/testing/utils';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let router: Router;
  let authService: AuthenticationService;

  function getElements() {
    return {
      username: fixture.debugElement.query(By.css('#username')),
      code: fixture.debugElement.query(By.css('#code')),
      password: fixture.debugElement.query(By.css('#password')),
      resetButton: fixture.debugElement.query(By.css('#reset-button')).nativeElement as HTMLButtonElement,
      resetError: fixture.debugElement.query(By.css('.reset-error'))
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
        CoreModule
      ],
      declarations: [ResetPasswordComponent],
      providers: [AuthenticationService, LoginService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    authService = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  describe('ResetPasswordComponent', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not enable Reset button if username and password are not provided', () => {
      const elements = getElements();
      expect(elements.resetButton.disabled).toBeTruthy();
    });

    it('should enable the Reset button if a valid username and password are provided', () => {
      const elements = getElements();
      component.form.patchValue({ username: 'test@example.com', code: '12345', password: 'Pa55uuord!' });
      fixture.detectChanges();
      expect(elements.resetButton.disabled).toBeFalsy();
    });

    it('should navigate to Login page if reset response is successful', fakeAsync(() => {
      spyOn(authService, 'completeForgotPassword').and.returnValue(Promise.resolve({}));
      const routerSpy = spyOn(router, 'navigate');
      component.form.patchValue({ username: 'test@example.com', code: '12345', password: 'Pa55uuord!' });
      fixture.detectChanges();
      const elements = getElements();
      click(elements.resetButton);
      fixture.detectChanges();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['login']);
    }));

    it('should display an error message if reset response is Unsuccessful', fakeAsync(() => {
      spyOn(authService, 'completeForgotPassword').and.returnValue(Promise.resolve({ code: 'code', message: 'error' }));
      component.form.patchValue({ username: 'test@example.com', code: '12345', password: 'Pa55uuord!' });
      fixture.detectChanges();
      let elements = getElements();
      click(elements.resetButton);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      elements = getElements();
      expect(elements.resetError.nativeElement.innerText).toEqual('error');
    }));
  });
});
