import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoading: boolean;
  version: string;

  constructor(private homeService: HomeService, private snackBar: MatSnackBar) {}

  // getApiVersion() {
  //   this.isLoading = true;
  //   this.homeService.getApiVersion().subscribe((version: string) => {
  //     this.isLoading = false;
  //     this.version = version;
  //     this.snackBar.open(`API Version: ${version}`, 'Dismiss');
  //   });
  // }
}
