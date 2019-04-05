import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { SettingsComponent } from './settings.component';
import { Shell } from '@app/shell/shell.service';
import { RoleGuard } from '@app/guards/role-guard.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'settings',
      component: SettingsComponent,
      // canActivate: [RoleGuard],
      data: {
        roles: ['user'],
        title: extract('Settings')
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SettingsRoutingModule {}
