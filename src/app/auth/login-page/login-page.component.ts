import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  onLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { username, password } = this.form.value;
    console.log('Logging in:', { username, password, role: this.role });
    this.router.navigate(['/home-page']);
  }

  onForgotPassword() {
    alert('Forgot password clicked.');
  }

  goToRegister() {
    this.router.navigate(['/register-page']);
  }
}