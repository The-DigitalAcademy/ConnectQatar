import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderComponent } from "../components/loader/loader.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';
  isLoading = false; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

onLogin() {
  if (this.loginForm.valid) {
    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (success) => {
        if (success) {
          this.message = 'Successfully Signed In! Redirecting to Feed...';
          setTimeout(() => {
            this.router.navigate(['/posts']);
            this.isLoading = false; 
          }, 1000);
        } else {
          this.message = 'Invalid username or password.';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.message = 'An error occurred during login.';
        this.isLoading = false; 
      }
    });
  }
}

}