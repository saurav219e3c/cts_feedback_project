import { Injectable } from "@angular/core";


//for the submit feedback 
export interface Feedback{
    feedbackId?: string;        // Unique ID for this specific message
    submittedByUserId: string;  // Who wrote this? (The logged-in user)
    targetUserId: string;
    searchEmployee: string;
   // employeeId:string;
    category: string;
    comments:string;
    isAnonymous: boolean;
    submissionDate:string;
}

//inject di
@Injectable({
    providedIn:'root'
})

export class EmployeeService{
    private storagekey='feedback_db';

    // logged in user
    private currentUserId = 'User_Tejas_123';

    // Dummy Employees for your search bar
  private employeeData = [
    { name: 'John Doe ', id: 'EMP101' },
    { name: 'Jane Smith', id: 'EMP102' },
    { name: 'Mike Ross ', id: 'EMP103' },
    { name: 'Rachel Zane', id: 'EMP104' }
  ];

    constructor(){}

    //get loggedin User
    getCurrentUser(){
        return this.currentUserId;
    }

    getDummyEmployees(){
        return this.employeeData;
    }

    //save FB

    saveFeedback(data: Feedback){
        const currentData = this.getFeedbackHistory();

        data.feedbackId = 'FB-'+Date.now();

        currentData.push(data);

        localStorage.setItem(this.storagekey,JSON.stringify(currentData));
    }

    

    getFeedbackHistory(): Feedback[]{

        const data = localStorage.getItem(this.storagekey);

        return data ? JSON.parse(data):[];
    }
}