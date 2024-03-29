import { Employee } from "../interface/departments";

export type DepartmentType = {
  id: string;
  name: string;
  size: number;
  location: string;
  idEmployee: string;
  leader: string;
  level: string;
  namesubDepartment: string;
  subDepartment: string;
  employees: { [key: string]: Employee };
};
