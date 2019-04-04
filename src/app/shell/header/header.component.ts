import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { I18nService, AuthenticationService } from '@app/core';
import { ApiVersionService } from '@app/shared/services/api-version.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidenav: MatSidenav;
  @Input() authState = false;

  version = '';
  sub: Subscription;

  constructor(
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private apiVersionService: ApiVersionService
  ) {}

  ngOnInit() {
    this.sub = this.apiVersionService.getApiVersion().subscribe(
      ver => {
        console.log(ver);
        this.version = ver.apiVersion;
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout();
  }

  get username(): string {
    return this.authenticationService.getCurrentUserEmail();
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
