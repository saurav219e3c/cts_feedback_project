import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService, Recognition } from '../service/employee.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-received-recognition',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './received-recognition.component.html',
  styleUrl: './received-recognition.component.css'
})
export class ReceivedRecognitionComponent implements OnInit {

 
  // 1. Inject Service
  constructor(private empService: EmployeeService) {}

  // 2. Raw Data Signal
  rawRecognitions = signal<Recognition[]>([]);

  // 3. Computed View Signal (The efficient part)
  recognitionView = computed(() => {
    const raw = this.rawRecognitions();

    return raw.map(item => ({
      ...item,
      // Calculate Names ONCE here
      senderName: this.empService.getEmployeeName(item.fromUserId),
      receivedName: this.empService.getEmployeeName(item.toUserId)
    }));
  });

  ngOnInit(): void {
    
    
    // 4. Load Data DIRECTLY into the Signal
    const data = this.empService.getMyRecognitions();
    this.rawRecognitions.set(data);
  }

  

  // 5. Helper for Badge Theme (Keep this, it's purely visual logic)
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