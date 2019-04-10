import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { click } from '@app/testing/utils';

import { SettingsService } from '../settings.service';
import { UpdateProfileComponent } from './update-profile.component';

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  let settingsService: SettingsService;

  function getElements() {
    return {
      email: fixture.debugElement.query(By.css('#email')),
      updateProfileBtn: fixture.debugElement.query(By.css('#update-profile-btn')).nativeElement as HTMLButtonElement
    };
  }

  function getFakeUser() {
    return {
      first: 'John',
      last: 'Doe',
      email: 'test@abc.com',
      phone: '',
      addressOne: '',
      addressTwo: ''
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
      declarations: [UpdateProfileComponent],
      providers: [SettingsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('UpdateProfileComponent', () => {
    it('should create', () => {
      settingsService = TestBed.get(SettingsService);
      spyOn(settingsService, 'getUser').and.returnValue(Promise.resolve(getFakeUser()));
      expect(component).toBeTruthy();
    });

    it('should update user profile', fakeAsync(() => {
      const elements = getElements();
      const fakeUser = getFakeUser();
      settingsService = TestBed.get(SettingsService);
      fixture.detectChanges();
      spyOn(settingsService, 'updateUser').and.returnValue(Promise.resolve(fakeUser));
      fakeUser.email = 'jsmith@example.com';
      component.profileForm.patchValue(fakeUser);
      fixture.detectChanges();
      click(elements.updateProfileBtn);
      fixture.detectChanges();
      tick(1000);
      expect(settingsService.updateUser).toHaveBeenCalled();
    }));
  });
});
