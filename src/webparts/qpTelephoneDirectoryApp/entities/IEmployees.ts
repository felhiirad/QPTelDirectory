export interface Employees {
  EMPLOYEE_ID: number;
  FIRST: string;
  LAST: string;
  FULL_NAME: string;
  PHOTO: string;
  EMAIL: string;
  HIRE_DATE: Date;
  WORK_LOCATION: string;
  LANDLINE: number;
  MOBILE_PHONE: number;
  REFERENCE_INDICATOR: string;
  END_DATE: Date;
  SUPERVISOR: Employees;
  SUBORDINATES: Employees[];
}
