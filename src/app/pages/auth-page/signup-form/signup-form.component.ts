import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required),
    })
    this.signupForm.setValidators(this.confirmPasswordValidator())
  }

  onSubmit() {
    const formData = this.signupForm.value
    const user = new User(formData.username, formData.password, formData.email)
    this.authService.signup(user)
  }

  public confirmPasswordValidator() : ValidatorFn {
    console.log(this.signupForm)
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.controls['password'];
      const control2 = group.controls['confirmPassword'];
      if (control1.value !== control2.value) {
         control2.setErrors({notEquivalent: true});
      } else {
         control2.setErrors(null);
      }
      return null;
    }
  }
}
