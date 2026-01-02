import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginPageComponent implements OnInit {
  role?: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    // Initialize form
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Subscribe to query parameters to get the role
    this.route.queryParamMap.subscribe(params => {
      this.role = params.get('role') ?? undefined;
    });
  }

  get f() {
    return this.form.controls;
  }

  onForgotPassword() {
    alert('Forgot password clicked.');
  }


// src/app/auth/login-page/login-page.component.ts
onLogin() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  // Include the role from the URL in the login check
  const credentials = { 
    ...this.form.value, 
    role: this.role 
  };

  this.loginService.login(credentials).subscribe(user => {
    if (user) {
      alert(`Login Successful! Welcome ${user.name}`);
      // Redirect to home or specific dashboard
      this.router.navigate(['/auth/home-page']); 
    } else {
      alert('Invalid credentials or role. Please try again.');
    }
  });
}

goToRegister() {
  // Navigate to the feature route
  this.router.navigate(['/auth/register-page']);
}
}