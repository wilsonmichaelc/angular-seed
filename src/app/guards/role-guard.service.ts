import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/core';

@Injectable()
export class RoleGuard implements CanActivate {
  log = true;

  constructor(private _authService: AuthenticationService, private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const groups: Array<any> = this._authService.getCurrentUserGroups();
    if (!groups) {
      return false;
    }
    const hasAnyRole = groups.some(role => next.data.roles.includes(role));

    if (this.log) {
      console.log('Groups: ', groups);
    }
    if (this.log) {
      console.log('Roles: ', next.data.roles);
    }
    if (this.log) {
      console.log('Authenticated: ', this._authService.isAuthenticated());
    }
    if (this.log) {
      console.log('HasRole: ', hasAnyRole);
    }

    if (!this._authService.isAuthenticated() || !hasAnyRole) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
