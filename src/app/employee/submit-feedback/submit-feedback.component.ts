import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-submit-feedback',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './submit-feedback.component.html',
  styleUrl: './submit-feedback.component.css'
})
export class SubmitFeedbackComponent {
  // Logic for form submission will go here
}