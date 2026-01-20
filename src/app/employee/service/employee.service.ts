import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { Observable, of } from "rxjs";

// ==============================================================================
// 1. INTERFACES
// ==============================================================================

export interface Feedback {
  id?: number;
  feedbackId?: string;
  submittedByUserId: string;
  targetUserId: string;
  searchEmployee?: string;
  category: string;
  comments: string;
  isAnonymous: boolean;
  submissionDate: string;
}

export interface Recognition {
  id?: number;
  recognitionId?: string;
  fromUserId: string;
  toUserId: string;
  BadgeType: string;
  points: number;
  date: string;
  comment?: string;
}

// Added this interface to fix your error
export interface Employee {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private authService = inject(AuthService);

  // Storage Keys
  private readonly KEYS = {
    FEEDBACK: 'feedback_db',
    RECOGNITION: 'recognition_db',
    USERS: 'feedback_project_users'
  };

  // State Variables (The Cache)
  private feedbackList: Feedback[] = [];
  private recognitionList: Recognition[] = [];

  constructor() { 
    this.loadData();
  }

  // --- 2. INTERNAL HELPERS ---

  private loadData() {
    // Load Feedback
    const fbData = localStorage.getItem(this.KEYS.FEEDBACK);
    this.feedbackList = fbData ? JSON.parse(fbData) : [];

    // Load Recognition
    const recData = localStorage.getItem(this.KEYS.RECOGNITION);
    this.recognitionList = recData ? JSON.parse(recData) : [];
  }

  private saveToStorage() {
    localStorage.setItem(this.KEYS.FEEDBACK, JSON.stringify(this.feedbackList));
    localStorage.setItem(this.KEYS.RECOGNITION, JSON.stringify(this.recognitionList));
  }

  getCurrentUserId(): string | null {
    return this.authService.getCurrentUserId() ?? '';
  }

  getCurrentUser(): string {
    return this.getCurrentUserId() ?? 'unknown';
  }

  // --- 3. FEEDBACK LOGIC ---

  getAllFeedback() { 
    return this.feedbackList; 
  }

  getMyReceivedFeedback() {
    const myId = this.getCurrentUserId();
    return this.feedbackList.filter(f => f.targetUserId === myId);
  }

  getMySentFeedback() {
    const myId = this.getCurrentUserId();
    return this.feedbackList.filter(f => f.submittedByUserId === myId);
  }

  saveFeedback(data: Feedback) {
    data.feedbackId = 'FB-' + Date.now();
    data.id = Date.now();
    
    this.feedbackList.push(data);
    this.saveToStorage(); 
  }

  // --- 4. RECOGNITION LOGIC ---

  getAllRecognitions() {
    return this.recognitionList;
  }

  getMyRecognitions() {
    const myId = this.getCurrentUserId();
    return this.recognitionList.filter(r => r.toUserId === myId);
  }

  getMySentRecognition() {
    const myId = this.getCurrentUserId();
    return this.recognitionList.filter(r => r.fromUserId === myId);
  }

  saveRecognition(data: Recognition) {
    const newEntry = {
      ...data,
      id: Date.now(),
      recognitionId: 'REC-' + Date.now()
    };

    this.recognitionList.push(newEntry);
    this.saveToStorage();
  }

  // --- 5. DASHBOARD STATS ---

  getDasboardStats(): Observable<any[]> {
    const sentFb = this.getMySentFeedback().length;
    const receivedFb = this.getMyReceivedFeedback().length;
    const sentRec = this.getMySentRecognition().length;
    
    const totalPoints = this.getMyRecognitions().reduce((sum, item) => sum + (item.points || 0), 0);

    return of([
      { label: 'Feedback Given', value: sentFb, trend: 12, icon: 'bi-pencil-square', bgClass: 'bg-primary-soft' },
      { label: 'Feedback Received', value: receivedFb, trend: 5, icon: 'bi-chat-left-dots', bgClass: 'bg-warning-soft' },
      { label: 'Recognition Given', value: sentRec, trend: 8, icon: 'bi-star', bgClass: 'bg-info-soft' },
      { label: 'Points Earned', value: totalPoints, trend: 20, icon: 'bi-award', bgClass: 'bg-success-soft' }
    ]);
  }

  // --- 6. EMPLOYEE LIST ---

  // I added ': Employee[]' here so TypeScript knows what this returns
  getAllEmployees(): Employee[] {
    const data = localStorage.getItem(this.KEYS.USERS);
    if (!data) return [];
    
    try {
      const users = JSON.parse(data);
      const myId = this.getCurrentUserId();
      
      return users
        .filter((u: any) => u.userId !== myId && ['employee', 'manager'].includes(u.role?.toLowerCase()))
        .map((u: any) => ({ id: u.userId, name: u.name || u.username }));
    } catch { 
      return []; 
    }
  }

  getEmployeeName(id: string): string {
    // Now TypeScript knows 'e' is an Employee, so 'e.id' is valid
    const emp = this.getAllEmployees().find(e => e.id === id);
    return emp ? emp.name : id;
  }

}

//   //get employee name by id 

//   getEmployeeName(submittedByUserId: string): string {
//     const allEmployees = this.getDummyEmployees();

//     const founduser = allEmployees.find(emp => emp.id === submittedByUserId);

//     return founduser ? founduser.name : submittedByUserId;
//   }





//   //save FB
//   saveFeedback(data: Feedback) {
//     const currentData = this.getFeedbackHistory();

//     data.feedbackId = 'FB-' + Date.now();

//     currentData.push(data);//local

//     localStorage.setItem(this.storagekey, JSON.stringify(currentData));
//   }


//  // get all feedback 
//   getFeedbackHistory(): Feedback[] {

//     const data = localStorage.getItem(this.storagekey);

//     return data ? JSON.parse(data) : [];
//   }

//   //for receieved feedback according to logged in user
//   getMyReceivedFeedback(): Feedback[] {

//     //get real data from localstorage
//     const currentuserId = this.getCurrentUserId();
//     if (!currentuserId) {
//       return [];
//     }

//     const localData = localStorage.getItem(this.storagekey);

//     const realFeedbacks: Feedback[] = localData ? JSON.parse(localData) : [];

//     //combine

//     const combineList = [...this.dummyFeedbacks, ...realFeedbacks];

//     //filter
//     return combineList.filter(f => f.targetUserId === currentuserId);

//   }


//   // save Recogntion
//   saveRecognition(data: Recognition): void {
//     const list = this.getAllRecognitions();

//     const newEntry = {
//       ...data,
//       id: Date.now(),
//       recognitionId: 'REC-' + Date.now()
//     };

//     list.push(newEntry);
//     localStorage.setItem(this.recognitionKey, JSON.stringify(list));
//   }
//    //get all recogntion
//   getAllRecognitions(): Recognition[] {
//     const data = localStorage.getItem(this.recognitionKey);
//     return data ? JSON.parse(data) : [];
//   }

//   //get reconition by logged in user

//   getMyRecognitions(): Recognition[] {
//     // Get Real Data from LocalStorage
//     const currentUserId = this.getCurrentUserId();
//     if (!currentUserId) {
//       return [];
//     }
//     const localData = localStorage.getItem(this.recognitionKey);
//     const realData: Recognition[] = localData ? JSON.parse(localData) : [];

//     // Merge Dummy + Real
//     const combined = [...this.dummyRecognitions, ...realData];

//     // Filter: Show only badges given TO the current user
//     return combined.filter(r => r.toUserId === currentUserId);
//   }

//   // get employee list Dummy + locaal storage
//   getDummyEmployees() {

//     //for usig local storage fetch employee data
//     const registeredUsers = this.getRegisteredEmployees();

//     //combine with dummy 
//     const combined = [...this.employeeData, ...registeredUsers];

//     //remove duplicates based on id
//     const uniqueMap = new Map();
//     combined.forEach(emp => {
//       if (!uniqueMap.has(emp.id)) {
//         uniqueMap.set(emp.id, emp);
//       }
//     });

//     return Array.from(uniqueMap.values());
//   }
//   // Add this new method to get registered employees from localStorage
//   private getRegisteredEmployees() {

//     const STORAGE_KEY = 'feedback_project_users';

//     const data = localStorage.getItem(STORAGE_KEY);

//     if (!data) return [];

//     try {
//       const users = JSON.parse(data);

//       // Filter for employee role (case-insensitive) and exclude the current user
//       const currentUserId = this.getCurrentUserId();

//       return users
//         .filter((u: any) => {
//           const isEmployee = u.role && (u.role.toLowerCase() === 'employee' || u.role.toLowerCase() === 'manager');
//           const notSelf = u.userId !== currentUserId; // Don't show self in the list
//           return isEmployee && notSelf;
//         })
//         .map((u: any) => ({
//           id: u.userId,
//           name: u.name || u.username || 'Unknown'
//         }))
//         .filter((emp: any) => emp.id && emp.name); // Remove invalid entries
//     } catch (error) {
//       console.error('Error parsing registered employees:', error);
//       return [];
//     }
//   }

//   // for dashboard 

//   private getAllFeedbackCombined(): Feedback[] {
//     const localData = localStorage.getItem(this.storagekey);
//     const realFeedbacks: Feedback[] = localData ? JSON.parse(localData) : [];
//     return [...this.dummyFeedbacks, ...realFeedbacks];
//   }
//   private getAllRecognitionCombined(): Recognition[] {
//     const localData = localStorage.getItem(this.recognitionKey);
//     const realData: Recognition[] = localData ? JSON.parse(localData) : [];
//     return [...this.dummyRecognitions, ...realData];
//   }

//   getMySentFeedback(): Feedback[] {

//     const currentId = this.getCurrentUserId(); //lggedid 
//     if (!currentId) return [];
    
//     // Filter logic: Check if 'submittedByUserId' is ME
//     return this.getAllFeedbackCombined().filter(f => f.submittedByUserId === currentId);
//   }
//   getMySentRecognition(): Recognition[] {
//     const currentId = this.getCurrentUserId();
//     if (!currentId) return [];

//     // Filter logic: Check if 'fromUserId' is ME
//     return this.getAllRecognitionCombined().filter(r => r.fromUserId === currentId);
//   }



//   //dashboarad logic 
//   getDasboardStats(): Observable<DashboardStat[]> {
//     // Get the Real Counts using the methods above

//     const sentFbCount = this.getMySentFeedback().length; // getmysend
//     const receivedFbCount = this.getMyReceivedFeedback().length;
    
//     const sentRecCount = this.getMySentRecognition().length;
//     const receivedRecList = this.getMyRecognitions(); // Uses your existing method
    
//     // Calculate total points received (optional, but looks good on dashboard)
//     const totalPointsReceived = receivedRecList.reduce((sum, item) => sum + (item.points || 0), 0);

//    // Return the array that matches your HTML structure exactly
//     return of([
//       { 
//         label: 'Feedback Given', 
//         value: sentFbCount, 
//         trend: 12, 
//         icon: 'bi-pencil-square', 
//         bgClass: 'bg-primary-soft' 
//       },
//       { 
//         label: 'Feedback Received', 
//         value: receivedFbCount, 
//         trend: 5, 
//         icon: 'bi-chat-left-dots', 
//         bgClass: 'bg-warning-soft' 
//       },
//       { 
//         label: 'Recognition Given', 
//         value: sentRecCount, 
//         trend: 8, 
//         icon: 'bi-star', 
//         bgClass: 'bg-info-soft' 
//       },
//       { 
//         label: 'Points Earned', 
//         value: totalPointsReceived, 
//         trend: 20, 
//         icon: 'bi-award', 
//         bgClass: 'bg-success-soft' 
//       }
//     ]);
//   }




