import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  isLoading = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.createForm();
    this.form.controls.confirmNewPassword.setValidators([Validators.required, this.passwordsMatch.bind(this)]);
  }

  changePassword() {
    this.authService.changePassword(this.form.controls.currentPassword.value, this.form.controls.newPassword.value).then(res => {
      this.form.reset();
      if (!res) {
        this.snackBar.open('Success! Your password has been changed.');
      } else {
        this.snackBar.open(res.toString());
      }
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', []]
    });
  }

  private passwordsMatch(c: AbstractControl): { [key: string]: any } {
    const newPw = this.form.get('newPassword').value;
    if (newPw !== c.value) {
      return { passwordsDontMatch: 'Passwords do not match' };
    }
    return null;
  }
}
