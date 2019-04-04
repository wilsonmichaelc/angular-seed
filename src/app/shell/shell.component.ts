import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  authState = false;

  constructor(private media: MediaObserver, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    // Get the authentication state
    this.authState = this.authenticationService.isAuthenticated();
    // Automatically close side menu on screens > sm breakpoint
    this.media
      .asObservable()
      .pipe(filter((change: MediaChange[]) => change[0].mqAlias !== 'xs' && change[0].mqAlias !== 'sm'))
      .subscribe(() => this.sidenav.close());
  }
}
