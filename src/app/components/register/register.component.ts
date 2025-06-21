import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  signupForm: FormGroup;
  message = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        fullname: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password')!.value === group.get('confirmPassword')!.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
  if (this.signupForm.valid) {
    this.isLoading = true;
    this.message = ''; 

    const { confirmPassword, ...user } = this.signupForm.value;
    this.authService.signup(user as User).subscribe({
      next: () => {
        this.message = 'Successfully Signed Up! Redirecting to Sign In...';
        setTimeout(() => {
          this.router.navigate(['/login']);
          this.isLoading = false; 
        }, 2000);
      },
      error: () => {
        this.message = 'Sign Up failed. Try again.';
        this.isLoading = false; 
      }
    });
  } else {
    this.message = 'Form invalid or passwords do not match.';
  }
}

}