import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-recognition',
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './employee-recognition.component.html',
  styleUrl: './employee-recognition.component.css'
})
export class EmployeeRecognitionComponent {
recognitionForm: FormGroup;
  
  employees = [
    { id: 'EMP101', name: 'John Doe' },
    { id: 'EMP102', name: 'Jane Smith' },
    { id: 'EMP103', name: 'Robert Wilson' },
    { id: 'EMP104', name: 'Sarah Parker' }
  ];
  
  filteredEmployees: any[] = [];
  selectedEmp: any = null;

  constructor(private fb: FormBuilder) {
    this.recognitionForm = this.fb.group({
      employeeSearch: ['', Validators.required],
      employeeId: [{ value: '', disabled: true }], 
      badgeType: ['', Validators.required],
      // Defaulted points to 5 for the range slider feel
      points: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get f() { return this.recognitionForm.controls; }

  // Dynamic color helper for the UI
  getBadgeTheme() {
    const badge = this.recognitionForm.get('badgeType')?.value;
    if (badge === 'Leader') return 'border-danger text-danger';
    if (badge === 'Team Player') return 'border-success text-success';
    if (badge === 'Problem Solver') return 'border-info text-info';
    return 'border-primary';
  }

  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.selectedEmp = null; // Reset selection if they start typing again
    if (query.length > 1) {
      this.filteredEmployees = this.employees.filter(emp => 
        emp.name.toLowerCase().includes(query) || emp.id.toLowerCase().includes(query)
      );
    } else {
      this.filteredEmployees = [];
    }
  }

  selectEmployee(emp: any) {
    this.selectedEmp = emp;
    this.recognitionForm.patchValue({
      employeeSearch: emp.name,
      employeeId: emp.id
    });
    this.filteredEmployees = [];
  }

  onSubmit() {
    if (this.recognitionForm.valid && this.selectedEmp) {
      // getRawValue() ensures we get the disabled employeeId field
      const finalData = this.recognitionForm.getRawValue();
      console.log('Recognition Sent:', finalData);
      
      alert(`🎉 Recognition Sent to ${this.selectedEmp.name}!`);
      
      // Reset form to initial state
      this.recognitionForm.reset({
        points: 5,
        badgeType: '',
        employeeSearch: ''
      });
      this.selectedEmp = null;
    }
  }



}
