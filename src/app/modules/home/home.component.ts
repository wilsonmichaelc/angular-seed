import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading: boolean;
  searchTerm: string;

  constructor(private homeService: HomeService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  onSubmit() {
    this.isLoading = true;
    this.homeService
      .search()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((msg: any) => {
        const searchResult = `API Version: ${msg.apiVersion}`;

        this.snackBar.open(searchResult, 'Dismiss');
      });
  }
}
