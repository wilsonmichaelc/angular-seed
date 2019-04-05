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

import { ResendActivationComponent } from './resend-activation.component';
import { By } from '@angular/platform-browser';
import { click } from '@app/testing/utils';

describe('ResendActivationComponent', () => {
  let component: ResendActivationComponent;
  let fixture: ComponentFixture<ResendActivationComponent>;
  let router: Router;
  let authService: AuthenticationService;

  function getElements() {
    return {
      email: fixture.debugElement.query(By.css('#email')),
      resendBtn: fixture.debugElement.query(By.css('#resend-btn')).nativeElement as HTMLButtonElement,
      resendError: fixture.debugElement.query(By.css('.resend-activation-error'))
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
      declarations: [ResendActivationComponent],
      providers: [AuthenticationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendActivationComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    authService = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  describe('ResendActivationComponent', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not enable Resend Activation Email button if email is not provided', () => {
      const elements = getElements();
      expect(elements.resendBtn.disabled).toBeTruthy();
    });

    it('should enable the Resend Activation Email button if a valid email is provided', () => {
      const elements = getElements();
      component.resendActivationForm.patchValue({ email: 'test@twd.com' });
      fixture.detectChanges();
      expect(elements.resendBtn.disabled).toBeFalsy();
    });

    it('should navigate to reset-password page if Resend Activation Email response is successful', fakeAsync(() => {
      spyOn(authService, 'resendActivationEmail').and.returnValue(Promise.resolve({ user: 'yes' }));
      const routerSpy = spyOn(router, 'navigate');
      component.resendActivationForm.patchValue({ email: 'test@twd.com' });
      fixture.detectChanges();
      const elements = getElements();
      click(elements.resendBtn);
      fixture.detectChanges();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['login']);
    }));

    it('should display an error message if Resend Activation Email response is unsuccessful', fakeAsync(() => {
      spyOn(authService, 'resendActivationEmail').and.returnValue(Promise.resolve({ message: 'error' }));
      component.resendActivationForm.patchValue({ email: 'test@example.com' });
      fixture.detectChanges();
      let elements = getElements();
      click(elements.resendBtn);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      elements = getElements();
      expect(elements.resendError.nativeElement.innerText).toContain('error');
    }));
  });
});
