import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

import { HasAnyAuthorityDirective } from './directives/has-any-authority.directive';
import { LoaderComponent } from './loader/loader.component';
import { JwtService } from './services/jwt.service';
import { ApiVersionService } from './services/api-version.service';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, HasAnyAuthorityDirective],
  exports: [LoaderComponent, HasAnyAuthorityDirective],
  providers: [JwtService, ApiVersionService]
})
export class SharedModule {}
