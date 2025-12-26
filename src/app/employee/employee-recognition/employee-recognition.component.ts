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
  
  // Mock Employee Data
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
      employeeSearch: [''],
      employeeId: [{ value: '', disabled: true }], // Locked until selection
      badgeType: ['', Validators.required],
      points: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get f() { return this.recognitionForm.controls; }

  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.length > 1) {
      this.filteredEmployees = this.employees.filter(emp => 
        emp.name.toLowerCase().includes(query)
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
    this.filteredEmployees = []; // Clear suggestions
  }

  onSubmit() {
    if (this.recognitionForm.valid && this.selectedEmp) {
      const finalData = {
        ...this.recognitionForm.getRawValue(),
        targetEmployeeId: this.selectedEmp.id
      };
      console.log('Recognition Sent:', finalData);
      alert(`Success! 10 points sent to ${this.selectedEmp.name}`);
      this.recognitionForm.reset();
      this.selectedEmp = null;
    }
  }

}
