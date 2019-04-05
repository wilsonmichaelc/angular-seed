import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from '../settings.service';

export class User {
  first: string;
  last: string;
  email: string;
}

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  isLoading: boolean;
  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.createForm();
    this.settingsService.getUser().then((user: User) => {
      this.profileForm.patchValue(user);
    });
  }

  updateProfile(): void {
    this.isLoading = true;
    this.settingsService.updateUser(this.profileForm.value as User).then((res: any) => {
      this.isLoading = false;
    });
  }

  private createForm(): void {
    this.profileForm = this.formBuilder.group({
      first: ['', []],
      last: ['', []],
      email: ['', []]
    });
  }
}
