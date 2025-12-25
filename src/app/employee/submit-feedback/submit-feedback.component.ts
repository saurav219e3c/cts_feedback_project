import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-feedback',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule], // Removed duplicate CommonModule
  templateUrl: './submit-feedback.component.html',
  styleUrl: './submit-feedback.component.css'
})
export class SubmitFeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  
  employees = ['John Doe (Eng)', 'Jane Smith (HR)', 'Mike Ross (Legal)', 'Rachel Zane (Design)'];
  categories = ['Work Culture', 'Management', 'Facilities', 'Career Growth', 'Other'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      searchEmployee: [''],
      employeeId: ['', Validators.required],
      category: ['', Validators.required],
      comments: ['', [Validators.required, Validators.minLength(10)]],
      isAnonymous: [false],
      submissionDate: [new Date().toISOString().substring(0, 10), Validators.required]
    });

    this.feedbackForm.get('isAnonymous')?.valueChanges.subscribe(isAnon => {
      const idControl = this.feedbackForm.get('employeeId');
      if (isAnon) {
        idControl?.disable();
        idControl?.setValue('ANONYMOUS');
      } else {
        idControl?.enable();
        idControl?.setValue('');
      }
    });
  }

  // --- ADD THIS METHOD TO FIX THE ERROR ---
  onSubmit(): void {
    if (this.feedbackForm.valid) {
      // Use getRawValue() so you get the employeeId even if it is disabled (Anonymous mode)
      const formData = this.feedbackForm.getRawValue();
      console.log('Feedback Data Submitted:', formData);
      
      alert('Success! Your feedback has been recorded.');
      
      // Optional: Reset form after submission
      this.feedbackForm.reset({
        submissionDate: new Date().toISOString().substring(0, 10),
        isAnonymous: false
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.feedbackForm.markAllAsTouched();
    }
  }
}