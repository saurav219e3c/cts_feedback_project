import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { EmployeeService, Feedback } from '../service/employee.service';
import { AuthService } from '../../core/services/auth.service';
// interface Feedback {
//   id: string;
//   employeeName: string;
//   category: string;
//   comment: string;
//   date: string;
//   isAnonymous: boolean;
// }

// interface Feedback {
//   id: number;
//   senderName: string;
//   category: string;
//   comments: string;
//   date: string;
//   isAnonymous: boolean;
// }

@Component({
  selector: 'app-employee-feedback',
  imports: [CommonModule],
  templateUrl: './employee-feedback.component.html',
  styleUrl: './employee-feedback.component.css'
})


export class EmployeeFeedbackComponent implements OnInit {

  feedbackList: Feedback[]=[];

  currentUser: string ='';
 

  constructor(private empService:EmployeeService
    
  ){}



  

  ngOnInit(): void { 
    this.currentUser=this.empService.getCurrentUser();
    // this.authService.user$.subscribe(user =>{
    //   if(user){
    //     this.currentUserName = user.name;
    //   }
    // });

    this.feedbackList = this.empService.getMyReceivedFeedback();

  }

  // Helper to get initials for the avatar
  getInitials(name: string): string {
    const safeName = name || 'Unknown';

    return safeName.split(' ').map(n => n[0]).join('').toLocaleUpperCase();
  }
}