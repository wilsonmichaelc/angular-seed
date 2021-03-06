import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { User } from '../settings.entities';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  isLoading: boolean;
  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private settingsService: SettingsService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.settingsService
      .getUser()
      .then((user: User) => {
        this.profileForm.patchValue(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateProfile(): void {
    this.isLoading = true;
    this.settingsService.updateUser(this.profileForm.value).then((res: User) => {
      this.isLoading = false;
    });
  }

  private createForm(): void {
    this.profileForm = this.formBuilder.group({
      first: ['', []],
      last: ['', []],
      email: ['', []],
      phone: ['', []],
      addressOne: ['', []],
      addressTwo: ['', []]
    });
  }
}
