import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '@app/core';
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
  title: string;
  username: string;

  constructor(
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private apiVersionService: ApiVersionService
  ) {
    this.title = this.titleService.getTitle();
    this.username = this.authenticationService.getCurrentUserEmail();
  }

  ngOnInit() {
    this.sub = this.apiVersionService.getApiVersion().subscribe(
      ver => {
        console.log(ver);
        this.version = ver;
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

  logout() {
    this.authenticationService.logout();
  }
}
