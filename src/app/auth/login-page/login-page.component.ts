
// src/app/auth/login-page/login-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginService } from '../service/login.service';
// ⬇️ Add AuthService to set auth state for guards
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginPageComponent implements OnInit {
  role?: string;
  form: FormGroup;
  admin_logged = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private auth: AuthService, // ⬅️ added
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

  // Submit handler
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
        // ✅ Set auth state so guards allow access
        // Safe fallback: if ?role is missing, use user.role or default to 'employee'
        const r = (this.role ?? user.role ?? 'employee').toString().toLowerCase();
        const normalizedRole =
          r === 'admin' ? 'Admin' :
          r === 'manager' ? 'Manager' :
          'Employee';

        this.auth.loginWithUser({
          id: user.userId ?? user.id ?? 'unknown',
          name: user.name ?? this.form.value.username,
          email: user.email ?? '',
          roles: [normalizedRole]
        });

        // ✅ Respect redirect param if guard sent us here
        const redirect = this.route.snapshot.queryParamMap.get('redirect');
        if (redirect) {
          this.router.navigateByUrl(redirect);
          return;
        }

        // ✅ Otherwise navigate based on role
        const target =
          normalizedRole === 'Admin'   ? '/admin'   :
          normalizedRole === 'Manager' ? '/manager' :
                                         '/employee';

        this.router.navigate([target]);

        // (Optional) If you still want to mark admin_logged or show a toast, you can do it here.
        // this.admin_logged = normalizedRole === 'Admin';

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
