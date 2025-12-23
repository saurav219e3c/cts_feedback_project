import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-employee',
  imports: [RouterOutlet,CommonModule],
  standalone:true,
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  // later: employee data from auth service
  isSidebarOpen=true;
  toggleSidebar(){
    this.isSidebarOpen =! this.isSidebarOpen;

  }
}
 