import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-profile',
  imports: [],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})
export class ManagerProfileComponent {
  manager = {
    id:'MGR123',
    name: 'Roshan Khorate',
    email: 'roshan.khorate@example.com',
    
  };

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  }

}
