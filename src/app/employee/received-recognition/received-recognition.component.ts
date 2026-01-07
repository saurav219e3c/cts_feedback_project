import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService, Recognition } from '../service/employee.service';

// interface Recognition {
//   to: string;
//   from: string;
//   points: number; 
//   badge: 'Team Player' | 'Leader' | 'Problem Solver' | 'Innovator';
//   message: string;
//   date: string;
// }

@Component({
  selector: 'app-received-recognition',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './received-recognition.component.html',
  styleUrl: './received-recognition.component.css'
})
export class ReceivedRecognitionComponent implements OnInit {
  
 // 2. Use Service Interface
  recognitions: Recognition[] = []; 
  currentUser: string = '';

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.currentUser = this.empService.getCurrentUser();

    // 3. Load Data from Service
    this.recognitions = this.empService.getMyRecognitions();
    
    // Sort so newest (top of list) appears first? Optional.
    // this.recognitions.reverse(); 
  }

  // 4. Update Helper for Badge Theme
  // Note: Argument 'badge' type changed to string to match interface
 getBadgeTheme(badge: string, points: number) {
    const icons: Record<string, string> = {
      'Leader': 'bi-rocket-takeoff-fill',
      'Team Player': 'bi-people-fill',
      'Problem Solver': 'bi-cpu-fill',
      'Innovator': 'bi-lightbulb-fill',
      'Rising Star': 'bi-star-fill',
      'Spot Award': 'bi-trophy-fill'
    };

    let themeColor: string;

    // YOUR LOGIC:
    // 8 to 10 -> Green
    // 6 to 7  -> Yellow
    // 1 to 5  -> Red
    
    if (points >= 8) {
      themeColor = '#2ed573'; // Green
    } else if (points >= 6) {
      themeColor = '#ffa502'; // Yellow/Orange
    } else {
      themeColor = '#ff4757'; // Red
    }

    return {
      color: themeColor,
      icon: icons[badge] || 'bi-award'
    };
  }
}