import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Recognition {
  to: string;
  from: string;
  points: number; 
  badge: 'Team Player' | 'Leader' | 'Problem Solver' | 'Innovator';
  message: string;
  date: string;
}

@Component({
  selector: 'app-received-recognition',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './received-recognition.component.html',
  styleUrl: './received-recognition.component.css'
})
export class ReceivedRecognitionComponent {
  
  recognitions = signal<Recognition[]>([
    { to: 'Amit Sharma', from: 'Admin', points: 9, badge: 'Innovator', message: 'The new API optimization is saving us 40% on server costs. Brilliant!', date: 'Dec 29, 2025' },
    { to: 'Priya Kapoor', from: 'Rahul V.', points: 7, badge: 'Leader', message: 'Exceptional leadership during the Q4 release pressure.', date: 'Dec 28, 2025' },
    { to: 'John Doe', from: 'Sarah C.', points: 5, badge: 'Team Player', message: 'Always goes out of the way to mentor junior developers.', date: 'Dec 27, 2025' },
    { to: 'Abhishek', from: 'Tejas', points: 10, badge: 'Leader', message: 'U Are doing Great Job Brother', date: 'Dec 31, 2025' }
  ]);

  
  getBadgeTheme(badge: string, points: number) {
    // Mapping 
    const icons: Record<string, string> = {
      'Leader': 'bi-rocket-takeoff-fill',
      'Team Player': 'bi-people-fill',
      'Problem Solver': 'bi-cpu-fill',
      'Innovator': 'bi-lightbulb-fill'
    };

    // Logic for dynamic coloring based on points
    let themeColor: string;

    if (points >= 9) {
      themeColor = '#2ed573'; 
    } else if (points >= 6) {
      themeColor = '#ffa502'; 
    } else {
      themeColor = '#ff4757'; 
    }

    return {
      color: themeColor,
      icon: icons[badge] || 'bi-award'
    };
  }
}