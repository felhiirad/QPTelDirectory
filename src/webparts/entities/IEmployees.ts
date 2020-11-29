export interface Employees {
  Staff_No: number;
  First_Name: string;
  Last_Name: string;
  Full_Name: string;
  Position: string;
  Gender: string;
  Photo: string;
  Email: string;
  Mobile_No: number;
  Office_Phone_No_1: number;
  Department: string;
  Reference_Indicator: string;
  //  SUPERVISOR: Employees;
  //  SUBORDINATES: Employees[];
  Id: number;
  Directorate: string;
  Division: string;
  Sub_Division: string;
  Supervisor_ID: number;
  Subordinate_Display: string; //Y/N
  Is_Manager: string; //Y/N
  Employment_Level: string; //ELS /SS
  Office_Phone_No_2: string;
  Direct_Office_Phone: string;
  Fax_No: string;
  Acting_Staff_No: string;
  Acting_Position: string;
  Acting_Position_Department: string;
  Acting_Reference_Indicator: string;
  Section: string;
  Unit: string;
  Work_Location_City: string;
  Work_Location_Description: string;
  Office_Room_No_x002e_: string;
}

export interface Delegations {
  Staff_No: number;
  Leave_Start_Date: Date;
  Leave_End_Date: Date;
  Delegate_Staff_No: number;
  Delegate_Start_Date: Date;
  Delegate_End_Date: Date;
  Department: string;
  Delegate: Employees;
}
