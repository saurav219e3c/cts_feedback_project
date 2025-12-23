
// src/app/auth/register-page/register-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

type Role =  'manager' | 'employee';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup;
  roleFromLogin?: Role; // role passed via query param (optional)

  roles: Role[] = ['manager', 'employee'];
  departments: string[] = [
    'Engineering',
    'Human Resources',
    'Finance',
    'Operations',
    'Sales',
    'Marketing',
    'IT Support',
    'Product'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // read role from query params if coming from login page
    this.route.queryParamMap.subscribe(params => {
      const role = params.get('role') as Role | null;
      this.roleFromLogin = role ?? undefined;
    });

    this.form = this.fb.group(
      {
        userId: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9_-]{4,20}$/)]],
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
        role: [this.roleFromLogin ?? 'employee', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        department: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // Custom validator: password === confirmPassword
  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (!password || !confirm) return null;
    return password === confirm ? null : { passwordMismatch: true };
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value;
    console.log('Register payload:', payload);

    // TODO: call registration API (service). For now, simulate success:
    alert('Registration successful!');
    // After register, redirect to login page and keep role in query (optional)
    this.router.navigate(['/auth/login-page'], {
      queryParams: { role: this.form.value.role },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/home-page'], {
      queryParams: this.roleFromLogin ? { role: this.roleFromLogin } : undefined,
    });
  }
}
