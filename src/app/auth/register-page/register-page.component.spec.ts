import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/admin/admin-reports/admin-reports.component.spec.ts
import { AdminReportsComponent } from './admin-reports.component';

describe('AdminReportsComponent', () => {
  let component: AdminReportsComponent;
  let fixture: ComponentFixture<AdminReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportsComponent);
========
import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
>>>>>>>> feature/try-abhishek:src/app/auth/register-page/register-page.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
