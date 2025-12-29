import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Recognition {
  to: string;
  from: string;
  points: number; // 1 to 10
  badge: 'Team Player' | 'Leader' | 'Problem Solver' | 'Innovator';
  message: string;
  date: string;
}
@Component({
  selector: 'app-received-recognition',
  imports: [RouterLink,CommonModule],
  templateUrl: './received-recognition.component.html',
  styleUrl: './received-recognition.component.css'
})
export class ReceivedRecognitionComponent {
 recognitions = signal<Recognition[]>([
    { to: 'Amit Sharma', from: 'Admin', points: 9, badge: 'Innovator', message: 'The new API optimization is saving us 40% on server costs. Brilliant!', date: 'Dec 29, 2025' },
    { to: 'Priya Kapoor', from: 'Rahul V.', points: 10, badge: 'Leader', message: 'Exceptional leadership during the Q4 release pressure.', date: 'Dec 28, 2025' },
    { to: 'John Doe', from: 'Sarah C.', points: 8, badge: 'Team Player', message: 'Always goes out of the way to mentor junior developers.', date: 'Dec 27, 2025' }
  ]);

  getBadgeTheme(badge: string) {
    const themes: any = {
      'Leader': { color: '#ff4757', icon: 'bi-rocket-takeoff-fill' },
      'Team Player': { color: '#2ed573', icon: 'bi-people-fill' },
      'Problem Solver': { color: '#1e90ff', icon: 'bi-cpu-fill' },
      'Innovator': { color: '#ffa502', icon: 'bi-lightbulb-fill' }
    };
    return themes[badge] || { color: '#747d8c', icon: 'bi-award' };
  }

}
