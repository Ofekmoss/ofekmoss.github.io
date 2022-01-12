import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  profileEditForm: FormGroup;
  currentUser: User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser()
    this.profileEditForm = new FormGroup({
      'username': new FormControl(this.currentUser.username, Validators.required),
      'email': new FormControl(this.currentUser.email, [Validators.required, Validators.email]),
      // 'oldPassword': new FormControl('', Validators.required),
      'newPassword': new FormControl('', Validators.required),
      'confirmNewPassword': new FormControl('', Validators.required),
    })
    this.profileEditForm.setValidators(this.confirmPasswordValidator())
  }

  onSubmit() {
    console.log(this.profileEditForm.valid)
    const formData = this.profileEditForm.value
    const user = new User(formData.username, formData.newPassword, formData.email)
    this.authService.signup(user)
  }

  public confirmPasswordValidator() : ValidatorFn {
    console.log(this.profileEditForm)
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.controls['newPassword'];
      const control2 = group.controls['confirmNewPassword'];
      if (control1.value !== control2.value) {
         control2.setErrors({notEquivalent: true});
      } else {
         control2.setErrors(null);
      }
      return null;
    }
  }

}
