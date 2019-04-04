import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { RoleGuard } from './role-guard.service';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, FlexLayoutModule, MaterialModule],
  declarations: [],
  providers: [RoleGuard]
})
export class RoleGuardsModule {}
