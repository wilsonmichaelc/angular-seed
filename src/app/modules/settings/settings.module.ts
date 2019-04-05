import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SettingsComponent, UpdateProfileComponent, ChangePasswordComponent],
  providers: [SettingsService]
})
export class SettingsModule {}
