import React, { useEffect, useState } from "react";
import { Department, Employee } from "@/root/interface/departments";
import CreationDepartment from "../../creationDeparment/CreationDepartment";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetDepartmentById,
  startCreateDepartment,
  startGetDepartmentById,
  startUpdateDepartment,
} from "@/root/redux";

interface RegisterProps {
  user?: Department;
}

const newDtaDepart = {
  id: "",
  name: "",
  size: 0,
  location: "",
  idEmployee: "",
  leader: "",
  level: "",
  subDepartment: "",
  employees: {},
};

function MethodsDepartments(props: RegisterProps) {
  const dispatch = useDispatch();

  const departId = useSelector(selectGetDepartmentById);

  const [data, setData] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState<string>("");
  const [newEmployeeId, setNewEmployeeId] = useState<string>("");
  const [passId, setPassId] = useState<string>("");
  const [newEmployeeData, setNewEmployeeData] = useState<string>("");
  const [upDate, setUpDate] = useState<boolean | null>();
  const [departmentData, setdepartmentData] = useState<Department>(() => {
    if (props.user) {
      setUpDate(true);
      return props.user;
    } else {
      return {
        id: "",
        name: "",
        size: 0,
        location: "",
        idEmployee: "",
        leader: "",
        level: "",
        subDepartment: "",
        employees: {},
      };
    }
  });

  useEffect(() => {
    if (passId) {
      setdepartmentData((prevDepartmentData) => ({
        ...prevDepartmentData,
        subDepartment: passId,
      }));
    }
  }, [passId]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setdepartmentData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleDeleteEmployee = (employeeName: string | number) => {
    setdepartmentData((prevDepartmentData) => {
      const updatedEmployees = { ...prevDepartmentData.employees };
      delete updatedEmployees[employeeName];

      return {
        ...prevDepartmentData,
        employees: updatedEmployees,
      };
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !departmentData.name ||
      !departmentData.size ||
      !departmentData.location ||
      !departmentData.level
    ) {
      toast.error("Please enter values for all fields");
      return;
    }

    if (
      !departmentData.name &&
      !departmentData.leader &&
      !departmentData.idEmployee
    ) {
      toast.error("Department name is not defined");
      return;
    }

    dispatch(startCreateDepartment(departmentData));
    setdepartmentData(newDtaDepart);
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!departmentData.name) {
      toast.error("Department name is not defined");
      return;
    }
    dispatch(startUpdateDepartment(departmentData.name, departmentData));
    setdepartmentData(newDtaDepart);
  };

  const handleSubmitEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newEmployee) {
      toast.error("Please enter values for all employee fields");
      return;
    }

    const newEmployeeObject: Employee = {
      name: newEmployee,
      des: newEmployeeData,
      id: newEmployeeId,
    };

    setdepartmentData((prevUserData) => ({
      ...prevUserData,
      employees: {
        ...prevUserData.employees,
        [newEmployee]: newEmployeeObject,
      },
    }));

    setNewEmployee("");
    setNewEmployeeData("");
    setNewEmployeeId("");
  };
  const handleGetDepartment = async (id: string) => {
    dispatch(startGetDepartmentById(id));
  };

  const handleGetDepartments = async (
    pageSize: Number,
    currentPage: Number
  ) => {
    try {
      const response = await fetch(
        `/api/departments/by-page?pageSize=${pageSize}&currentPage=${currentPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setdepartmentData(data);
        console.log(data);
      } else {
        toast.error("Error acquiring information");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error acquiring information");
    }
  };
  useEffect(() => {
    if (departId) {
      setdepartmentData(departId);
    }
  }, [departId]);

  const handleUpdateEmployee = (
    employeeName: string,
    updatedEmployee: Employee
  ) => {
    setdepartmentData((prevDepartmentData) => {
      const updatedEmployees = {
        ...prevDepartmentData.employees,
        [employeeName]: updatedEmployee,
      };

      return {
        ...prevDepartmentData,
        employees: updatedEmployees,
      };
    });
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <CreationDepartment
        handleUpdateEmployee={handleUpdateEmployee}
        setPassId={setPassId}
        departmentsData={departmentData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleSubmitEmployee={handleSubmitEmployee}
        newEmployee={newEmployee}
        newEmployeeData={newEmployeeData}
        setNewEmployee={setNewEmployee}
        newEmployeeId={newEmployeeId}
        setNewEmployeeId={setNewEmployeeId}
        setNewEmployeeData={setNewEmployeeData}
        handleGetDepartment={handleGetDepartment}
        handleUpdate={handleUpdate}
        handleDeleteEmployee={handleDeleteEmployee}
      />
    </div>
  );
}

export default MethodsDepartments;
