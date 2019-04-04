import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { SettingsService } from './settings.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isLoading: boolean;
  searchTerm: string;

  constructor(private settingsService: SettingsService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  onSubmit() {
    this.isLoading = true;
    this.settingsService
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
