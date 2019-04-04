import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, FlexLayoutModule, MaterialModule, SettingsRoutingModule, FormsModule],
  declarations: [SettingsComponent],
  providers: [SettingsService]
})
export class SettingsModule {}
