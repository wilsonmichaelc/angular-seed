import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule, AuthenticationService } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';

import { SettingsService } from '../settings.service';
import { ChangePasswordComponent } from './change-password.component';
import { By } from '@angular/platform-browser';
import { click } from '@app/testing/utils';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let authService: AuthenticationService;

  function getElements() {
    return {
      currentPassword: fixture.debugElement.query(By.css('#current-password')),
      newPassword: fixture.debugElement.query(By.css('#new-password')),
      confirmNewPassword: fixture.debugElement.query(By.css('#confirm-new-password')),
      changePwdBtn: fixture.debugElement.query(By.css('#change-password-btn')).nativeElement as HTMLButtonElement
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule
      ],
      declarations: [ChangePasswordComponent],
      providers: [AuthenticationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not enable the change password button if currentPassword/newPassword/confirmNewPassword are not provided', fakeAsync(() => {
    const elements = getElements();
    expect(elements.changePwdBtn.disabled).toBeTruthy();
  }));

  it('should not enable the change password button if passwords do not match', fakeAsync(() => {
    const elements = getElements();
    component.form.patchValue({ currentPassword: 'Ab1#Ab1#', newPassword: 'Ab1!Ab1!', confirmNewPassword: 'Ab1!Ab1!$$$' });
    fixture.detectChanges();
    expect(elements.changePwdBtn.disabled).toBeTruthy();
  }));

  it('should enable the change password button if passwords match and are provided', fakeAsync(() => {
    const elements = getElements();
    component.form.patchValue({ currentPassword: 'Ab1#Ab1#', newPassword: 'Ab1!Ab1!', confirmNewPassword: 'Ab1!Ab1!' });
    fixture.detectChanges();
    expect(elements.changePwdBtn.disabled).toBeFalsy();
  }));

  it('should return succes if password was changed', fakeAsync(() => {
    const elements = getElements();
    spyOn(authService, 'changePassword').and.returnValue(Promise.resolve());
    component.form.patchValue({ currentPassword: 'Ab1#Ab1#', newPassword: 'Ab1!Ab1!', confirmNewPassword: 'Ab1!Ab1!' });
    fixture.detectChanges();
    click(elements.changePwdBtn);
    fixture.detectChanges();
    tick(1000);
    expect(authService.changePassword).toHaveBeenCalled();
  }));

  it('should return failed if password was not changed', fakeAsync(() => {
    const elements = getElements();
    spyOn(authService, 'changePassword').and.returnValue(Promise.resolve({ error: 'yes' }));
    component.form.patchValue({ currentPassword: 'Ab1#Ab1#', newPassword: 'Ab1!Ab1!', confirmNewPassword: 'Ab1!Ab1!' });
    fixture.detectChanges();
    click(elements.changePwdBtn);
    fixture.detectChanges();
    tick(1000);
    expect(authService.changePassword).toHaveBeenCalled();
  }));
});
