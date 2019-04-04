import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LoginContext } from '@app/shared/entities/auth.entities';
import { JwtService } from '@app/shared/services/jwt.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { AuthenticationDetails, CognitoUserPool, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';

@Injectable()
export class AuthenticationService {
  private _cognitoUser: any = null;
  private _authState = new Subject<any>();
  private _poolData = { UserPoolId: environment.poolData.UserPoolId, ClientId: environment.poolData.ClientId };

  constructor(private router: Router, private jwtService: JwtService) {}

  signup(context: any) {
    const attribute = { Name: 'email', Value: context.email };
    const attributeEmail = new CognitoUserAttribute(attribute);
    const attributeList = [attributeEmail];
    const userPool = new CognitoUserPool(this._poolData);
    return new Promise(resolve => {
      userPool.signUp(context.email, context.password, attributeList, null, (err, result) => {
        if (err) {
          resolve(err);
        }
        resolve(result);
      });
    });
  }

  resendActivationEmail(context: any) {
    const userPool = new CognitoUserPool(this._poolData);
    const userData = { Username: context.email, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          resolve(err);
        }
        resolve(result);
      });
    });
  }

  login(context: LoginContext): Observable<boolean> {
    return new Observable((observer: any) => {
      const authenticationData = {
        Username: context.username,
        Password: context.password
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      const userPool = new CognitoUserPool(this._poolData);
      const userData = { Username: context.username, Pool: userPool };
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result: any) => {
          this._authState.next(true);
          observer.next(result);
          observer.complete();
        },
        onFailure: (err: any) => {
          this._authState.next(false);
          observer.next(err);
          observer.complete();
        }
      });
    });
  }

  logout(): void {
    const cognitoUser = this.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.signOut();
    }
    this._cognitoUser = null;
    this._authState.next(false);
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  initiateForgotPassword(username: string) {
    const userPool = new CognitoUserPool(this._poolData);
    const userData = { Username: username, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result: any) => {
          resolve(result);
        },
        onFailure: (err: any) => {
          resolve(err);
        }
      });
    });
  }

  completeForgotPassword(context: any) {
    const userPool = new CognitoUserPool(this._poolData);
    const userData = { Username: context.username, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);
    return new Promise(resolve => {
      cognitoUser.confirmPassword(context.code, context.password, {
        onSuccess: () => {
          resolve();
        },
        onFailure: (err: any) => {
          resolve(err);
        }
      });
    });
  }

  getCurrentUser() {
    if (!this._cognitoUser) {
      const userPool = new CognitoUserPool(this._poolData);
      this._cognitoUser = userPool.getCurrentUser();
    }
    return this._cognitoUser;
  }

  getIdToken() {
    const cognitoUser = this.getCurrentUser();
    if (!cognitoUser) {
      return '';
    }
    return cognitoUser.getSession((err: any, session: any) => {
      return session.getIdToken().getJwtToken();
    });
  }

  getCurrentUserEmail(): string {
    const cognitoUser = this.getCurrentUser();
    if (!cognitoUser) {
      return '';
    }
    return cognitoUser.getSession((err: any, session: any) => {
      const idToken = session.getIdToken().getJwtToken();
      return this.jwtService.decode(idToken)['email'];
    });
  }

  getCurrentUserGroups(): Array<any> {
    const cognitoUser = this.getCurrentUser();
    if (!cognitoUser) {
      return null;
    }
    return cognitoUser.getSession((err: any, session: any) => {
      const idToken = session.getIdToken().getJwtToken();
      const groups = this.jwtService.decode(idToken)['cognito:groups'];
      return groups;
    });
  }

  getAuthenticationState(): Observable<any> {
    return this._authState.asObservable();
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }
    const groups: Array<any> = this.getCurrentUserGroups();
    return groups.some(role => authorities.includes(role));
  }

  isAuthenticated(): boolean {
    const cognitoUser = this.getCurrentUser();
    if (!cognitoUser) {
      return false;
    }
    return cognitoUser.getSession((err: any, session: any) => {
      if (err) {
        return false;
      }
      if (session.isValid()) {
        return true;
      }
    });
  }
}
