import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, FlexLayoutModule, MaterialModule, HomeRoutingModule, FormsModule],
  declarations: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule {}
