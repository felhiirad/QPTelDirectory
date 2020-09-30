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
  Department: number;
  Reference_Indicator: string;
  SUPERVISOR: Employees;
  SUBORDINATES: Employees[];
}
