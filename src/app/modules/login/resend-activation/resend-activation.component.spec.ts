import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

import { ResendActivationComponent } from './resend-activation.component';

describe('ResendActivationComponent', () => {
  let component: ResendActivationComponent;
  let fixture: ComponentFixture<ResendActivationComponent>;
  let mockRouter: any;

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
      declarations: [ResendActivationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }]
    });

    fixture = TestBed.createComponent(ResendActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('login component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
