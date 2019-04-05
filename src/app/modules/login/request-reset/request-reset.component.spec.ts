import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule, AuthenticationService } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

import { RequestResetComponent } from './request-reset.component';
import { By } from '@angular/platform-browser';
import { LoginService } from '../login.service';
import { click } from '@app/testing/utils';

describe('RequestResetComponent', () => {
  let component: RequestResetComponent;
  let fixture: ComponentFixture<RequestResetComponent>;
  let router: Router;
  let authService: AuthenticationService;

  function getElements() {
    return {
      email: fixture.debugElement.query(By.css('#email')),
      initResetBtn: fixture.debugElement.query(By.css('#init-reset-btn')).nativeElement as HTMLButtonElement,
      initResetError: fixture.debugElement.query(By.css('.init-reset-error'))
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
      declarations: [RequestResetComponent],
      providers: [AuthenticationService, LoginService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResetComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    authService = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  describe('RequestResetComponent', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not enable Send Reset Link button if email is not provided', () => {
      const elements = getElements();
      expect(elements.initResetBtn.disabled).toBeTruthy();
    });

    it('should enable the Send Reset Link button if a valid email is provided', () => {
      const elements = getElements();
      component.initResetForm.patchValue({ email: 'test@twd.com' });
      fixture.detectChanges();
      expect(elements.initResetBtn.disabled).toBeFalsy();
    });

    it('should navigate to reset-password page if Send Reset Link response is successful', fakeAsync(() => {
      spyOn(authService, 'initiateForgotPassword').and.returnValue(Promise.resolve({ CodeDeliveryDetails: 'yes' }));
      const routerSpy = spyOn(router, 'navigate');
      component.initResetForm.patchValue({ email: 'test@twd.com' });
      fixture.detectChanges();
      const elements = getElements();
      click(elements.initResetBtn);
      fixture.detectChanges();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['reset-password']);
    }));

    it('should display an error message if Send Reset Link response indicates user is not found', fakeAsync(() => {
      spyOn(authService, 'initiateForgotPassword').and.returnValue(Promise.resolve({ code: 'UserNotFoundException', message: 'error' }));
      const routerSpy = spyOn(router, 'navigate');
      component.initResetForm.patchValue({ email: 'test@example.com' });
      fixture.detectChanges();
      let elements = getElements();
      click(elements.initResetBtn);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      elements = getElements();
      expect(elements.initResetError.nativeElement.innerText).toContain('error');
    }));

    it('should display an error message if Send Reset Link response is unsuccessful', fakeAsync(() => {
      spyOn(authService, 'initiateForgotPassword').and.returnValue(Promise.resolve({ message: 'error' }));
      component.initResetForm.patchValue({ email: 'test@example.com' });
      fixture.detectChanges();
      let elements = getElements();
      click(elements.initResetBtn);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      elements = getElements();
      expect(elements.initResetError.nativeElement.innerText).toContain('error');
    }));
  });
});
