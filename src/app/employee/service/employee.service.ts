import { Injectable } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";


//for the submit feedback 
export interface Feedback {
  id?: number;
  feedbackId?: string;        // Unique ID for this specific message
  submittedByUserId: string;  // Who wrote this? (The logged-in user)
  targetUserId: string;
  searchEmployee?: string;
  // employeeId:string;
  category: string;
  comments: string;
  isAnonymous: boolean;
  submissionDate: string;
}

//for the send recognition 
export interface Recognition {
  id?: number;              // Database ID
  recognitionId?: string;   // Unique ID (REC-xxx)
  fromUserId: string;       // Sender
  toUserId: string;         // Receiver
  BadgeType: string;        // "Team Player", "Leader", etc.
  points: number;
  date: string;
  comment?: string;         // Added so "Appreciation Note" is saved
}

//inject di
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private storagekey = 'feedback_db';

  constructor(private authService: AuthService) { }

  // logged in user
  //private currentUserId = 'this.getCurrentUserId()';

  private recognitionKey = 'recognition_db';

  // Dummy Employees for your search bar
  private employeeData = [
    { name: 'John Doe ', id: 'EMP101' },
    { name: 'Jane Smith', id: 'EMP102' },
    { name: 'Mike Ross ', id: 'EMP103' },
    { name: 'Rachel Zane', id: 'EMP104' }
  ];


  //dummy feedback for received fb

  private dummyFeedbacks: Feedback[] = [
    {
      id: 1,
      submittedByUserId: "Sarah Jenkins",
      targetUserId: 'EMP102',
      category: "Leadership",
      comments: "Great job leading the sprint planning yesterday. You kept everyone on track!",
      submissionDate: "2023-10-15",
      isAnonymous: false
    },
    {
      id: 2,
      submittedByUserId: "Michael Chen",
      targetUserId: 'EMP102',
      category: "Technical",
      comments: "Your code review comments were incredibly helpful.",
      submissionDate: "2023-10-12",
      isAnonymous: false
    },
    {
      id: 3,
      submittedByUserId: "Emily Rodriguez",
      targetUserId: 'EMP102',
      category: "Teamwork",
      comments: "Thanks for jumping in to help with the client presentation.",
      submissionDate: "2023-10-10",
      isAnonymous: false
    },
    {
      id: 4,
      submittedByUserId: "Unknown",
      targetUserId: 'EMP102',
      category: "Teamwork",
      comments: "You really helped me out today. Thanks!",
      submissionDate: "2023-10-10",
      isAnonymous: true // Anonymous entry
    }
  ];

  //dummy recognition
  private dummyRecognitions: Recognition[] = [
    {
      recognitionId: 'REC-001',
      fromUserId: 'Admin',
      toUserId: 'EMP102', // Jane Smith (Current User)
      points: 9,
      BadgeType: 'Innovator', // Note: Case sensitive match to your UI Logic
      comment: 'The new API optimization is saving us 40% on server costs.',
      date: 'Dec 29, 2025'
    },
    {
      recognitionId: 'REC-002',
      fromUserId: 'Rahul V.',
      toUserId: 'EMP102',
      points: 7,
      BadgeType: 'Leader',
      comment: 'Exceptional leadership during the Q4 release pressure.',
      date: 'Dec 28, 2025'
    },
    {
      recognitionId: 'REC-003',
      fromUserId: 'Sarah C.',
      toUserId: 'EMP102',
      points: 5,
      BadgeType: 'Team Player',
      comment: 'Always goes out of the way to mentor junior developers.',
      date: 'Dec 27, 2025'
    }
  ];



  //get loggedin User
  // Get current logged-in user ID
  getCurrentUserId(): string | null {
    return this.authService.getCurrentUserId();
  }

  getCurrentUser(): string {
    return this.getCurrentUserId() ?? 'unknown';
  }

  getEmployeeName(submittedByUserId: string): string {
    const allEmployees = this.getDummyEmployees();

    const founduser = allEmployees.find(emp => emp.id === submittedByUserId);

    return founduser ? founduser.name : submittedByUserId;
  }





  //save FB

  saveFeedback(data: Feedback) {
    const currentData = this.getFeedbackHistory();

    data.feedbackId = 'FB-' + Date.now();

    currentData.push(data);//local

    localStorage.setItem(this.storagekey, JSON.stringify(currentData));
  }



  getFeedbackHistory(): Feedback[] {

    const data = localStorage.getItem(this.storagekey);

    return data ? JSON.parse(data) : [];
  }

  //for receieved feedback service logic
  getMyReceivedFeedback(): Feedback[] {

    //get real data from localstorage
    const currentuserId = this.getCurrentUserId();
    if (!currentuserId) {
      return [];
    }

    const localData = localStorage.getItem(this.storagekey);

    const realFeedbacks: Feedback[] = localData ? JSON.parse(localData) : [];

    //combine

    const combineList = [...this.dummyFeedbacks, ...realFeedbacks];

    //const allFeedback: Feedback[]= data ? JSON.parse(data):[];

    //filter

    return combineList.filter(f => f.targetUserId === currentuserId);

  }


  // save Recogntion
  saveRecognition(data: Recognition): void {
    const list = this.getAllRecognitions();

    const newEntry = {
      ...data,
      id: Date.now(),
      recognitionId: 'REC-' + Date.now()
    };

    list.push(newEntry);
    localStorage.setItem(this.recognitionKey, JSON.stringify(list));
  }

  getAllRecognitions(): Recognition[] {
    const data = localStorage.getItem(this.recognitionKey);
    return data ? JSON.parse(data) : [];
  }

  //get reconition 

  getMyRecognitions(): Recognition[] {
    // Get Real Data from LocalStorage
    const currentUserId = this.getCurrentUserId();
    if (!currentUserId) {
      return [];
    }
    const localData = localStorage.getItem(this.recognitionKey);
    const realData: Recognition[] = localData ? JSON.parse(localData) : [];

    // Merge Dummy + Real
    const combined = [...this.dummyRecognitions, ...realData];

    // Filter: Show only badges given TO the current user
    return combined.filter(r => r.toUserId === currentUserId);
  }
  getDummyEmployees() {

    //for usig local storage fetch employee data
    const registeredUsers = this.getRegisteredEmployees();

    //combine with dummy 
    const combined = [...this.employeeData, ...registeredUsers];

    //remove duplicates based on id
    const uniqueMap = new Map();
    combined.forEach(emp => {
      if (!uniqueMap.has(emp.id)) {
        uniqueMap.set(emp.id, emp);
      }
    });

    return Array.from(uniqueMap.values());
  }
  // Add this new method to get registered employees from localStorage
  private getRegisteredEmployees() {
    const STORAGE_KEY = 'feedback_project_users';
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    try {
      const users = JSON.parse(data);

      // Filter for employee role (case-insensitive) and exclude the current user
      const currentUserId = this.getCurrentUserId();

      return users
        .filter((u: any) => {
          const isEmployee = u.role && (u.role.toLowerCase() === 'employee' || u.role.toLowerCase() === 'manager');
          const notSelf = u.userId !== currentUserId; // Don't show self in the list
          return isEmployee && notSelf;
        })
        .map((u: any) => ({
          id: u.userId,
          name: u.name || u.username || 'Unknown'
        }))
        .filter((emp: any) => emp.id && emp.name); // Remove invalid entries
    } catch (error) {
      console.error('Error parsing registered employees:', error);
      return [];
    }
  }




}