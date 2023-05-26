import React, { useEffect, useState } from "react";
import SearchInput from "../../ui/searchInput/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import ListEmployee from "../../listEmployee/ListEmployee";
import { selectGetEmployeeByUid } from "@/root/redux/selectors/employee-selector/employee.selector";
import { EmployeesType } from "@/root/types/Employee.type";
import { StartDismissEmployee, StartGetByVariable, StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";

export default function EditEmployeeSection() {
  const employeeByUid = useSelector(selectGetEmployeeByUid);
  const dispatch = useDispatch();

  const [clear, setClear] = useState(false)
  const [cedula, setCedula] = useState("")
  const [name, setName] = useState("")
  const [jobPosition, setJobPosition] = useState("")
  const [clearInput, setClearInput] = useState(false)

  const [dataEmployee, setDataEmployee] = useState<EmployeesType>({
    uid: "",
    name: "",
    firstSurname: "",
    secondSurname: "",
    cedula: 0,
    phoneNumber: 0,
    photo: "",
    jobPosition: "",
    salary: 0,
    enabled: true,
    idDepartment: "",
    password: "",
    email: "",
    boss: "",
    schedule: [],
    vacations: {}
  });

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(StartUpDateEmployee(dataEmployee.uid || "", dataEmployee));
    setClear(true)
  };

  useEffect(() => {
    if(!clear){
      if (employeeByUid) {
        setDataEmployee(employeeByUid);
      }
    }else{
      setDataEmployee({ uid: "",
      name: "",
      firstSurname: "",
      secondSurname: "",
      cedula: 0,
      phoneNumber: 0,
      photo: "",
      jobPosition: "",
      salary: 0,
      enabled: true,
      idDepartment: "",
      password: "",
      email: "",
      boss: "",
      schedule: [],
    vacations: {}
    })
    }

  }, [employeeByUid,clear]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDismissEmployee = () =>{

    dispatch(StartDismissEmployee(employeeByUid?.uid || ""))

  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap p-1">
        <div className="flex-none w-full sm:w-72 relative p-1 m-1">
          <div className="flex flex-col mb-3">
            <h2>filters: </h2>
            <SearchInput labelInputSeekerOne="text" valueEnd={cedula} placeholderSeekerOne="Cedula" typeList="cedula" id="cedula" />
            <SearchInput labelInputSeekerOne="text" valueEnd={name} placeholderSeekerOne="Name" typeList="name" id="name" />
            <SearchInput labelInputSeekerOne="text" valueEnd={jobPosition} placeholderSeekerOne="Job Position" typeList="jobPosition" id="jobPosition" />
          </div>
          <ListEmployee clear = {clear} setClear={setClear} />
        </div>
        <div className="flex-auto h-auto">
          <form onSubmit ={handleUpdate} className="bg-lithBlue p-2 h-auto">
            <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="Name" className="block mb-2 text-sm font-medium text-black">
                  Name
                </label>
                <input
                  onChange={handleInputChange}
                  name="name"
                  type="text"
                  value={dataEmployee.name}
                  id="Name"
                  className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm  zoom block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="cedula" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Cedula
                </label>
                <input
                  onChange={handleInputChange}
                  name="cedula"
                  type="number"
                  value={dataEmployee.cedula}
                  id="cedula"
                  className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full p-2.5"
                />
              </div>
            </div>
            <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="firstSurname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Surname
                </label>
                <input
                  onChange={handleInputChange}
                  name="firstSurname"
                  type="text"
                  value={dataEmployee.firstSurname}
                  id="firstSurname"
                  className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="secondSurname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Second surname
                </label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="secondSurname"
                  value={dataEmployee.secondSurname}
                  id="SecondSurname"
                  className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm  block zoom w-full p-2.5"
                />
              </div>
            </div>
            <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="jobPosition" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Job position
                </label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="jobPosition"
                  value={dataEmployee.jobPosition}
                  id="JobPosition"
                  className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm block zoom w-full p-2.5"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900  dark:text-black">
                  Phone Number
                </label>
                <input
                  onChange={handleInputChange}
                  type="number"
                  name="phoneNumber"
                  value={dataEmployee.phoneNumber}
                  id="PhoneNumber"
                  className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full p-2.5"
                />
              </div>
            </div>
            <div className="mb-6 flex flex-row space-x-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Salary
                </label>
                <input
                  onChange={handleInputChange}
                  type="number"
                  name="salary"
                  value={dataEmployee.salary}
                  id="salary"
                  className="EspecialInput border-b focus:outline-none border-red bg-transparent text-sm zoom block w-full "
                />
              </div>
            </div>
            <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <div className="flex flex-col flex-1">
                <button onClick={handleDismissEmployee} className="EliminatedButton  hover:bg-black hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Dismiss employee
                </button>
              </div>
              <div className="flex flex-col flex-1">
                <button
                  type="submit"
                  className="NormalButton hover:bg-black hover:text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </div>
              <div className="flex flex-col flex-1">
                <button className="NormalButton hover:bg-black hover:text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Choose file
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}