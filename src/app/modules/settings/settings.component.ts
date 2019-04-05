import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { SettingsService } from './settings.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '@app/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isLoading: boolean;
  searchTerm: string;
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private settingsService: SettingsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.changePasswordForm.controls.confirmNewPassword.setValidators([Validators.required, this.passwordsMatch.bind(this)]);
  }

  changePassword() {
    this.authService
      .changePassword(this.changePasswordForm.controls.currentPassword.value, this.changePasswordForm.controls.newPassword.value)
      .then(res => {
        if (!res) {
          this.snackBar.open('Success! Your password has been changed.');
        } else {
          this.snackBar.open('Error: ' + res);
        }
      });
  }

  private createForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', []]
    });
  }

  private passwordsMatch(c: AbstractControl): { [key: string]: any } {
    const newPw = this.changePasswordForm.get('newPassword').value;
    if (newPw !== c.value) {
      return { passwordsDontMatch: 'Passwords do not match' };
    }
    return null;
  }
}
