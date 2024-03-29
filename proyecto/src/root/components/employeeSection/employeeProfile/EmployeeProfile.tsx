import React from "react";
import { useSelector } from "react-redux";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import InputFloatLabel from "../../ui/InputFloatLabel/InputFloatLabel";
import { selectGetByIdDocDepartment, selectGetDepartmentById } from "@/root/redux";

const EmployeeProfile = () => {
  const UserLogin = useSelector(selectLogin);
  const department = useSelector(selectGetByIdDocDepartment);
  return (
    <>
    <h1 className="text-center text-darkBlue text-lg font-bold">Profile of employee</h1>
      <div className="bg-lithGray flex xl:h-screen flex-col  lg:flex-wrap items-center pb-12 p-5 ">
        <div className="flex flex-col items-center justify-center">
          <img src="/Images/profileIcon.gif" width={100} height={100} alt="Picture of the author" />
          <span className="font-semibold"> Department: {department?.name || ''}</span>
        </div>

        <div className="flex items-center justify-center space-x-10">
          <div className=" mt-4 w-full space-y-7 sm:w-auto">
            <InputFloatLabel id="name" labelFloat="Name" name="name" onChange={() => {}} type="text" value={UserLogin?.name || ""} />
            <InputFloatLabel id="surname" labelFloat="Surname" name="" onChange={() => {}} type="text" value={UserLogin?.firstSurname || ""} />
            <InputFloatLabel id="secondSurname" labelFloat="Second surname" name="" onChange={() => {}} type="text" value={UserLogin?.secondSurname || ""} />
            <InputFloatLabel id="cedula" labelFloat="cedula" name="" onChange={() => {}} type="text" value={UserLogin.cedula || ''} />
          </div>

          <div className=" mt-4 w-full space-y-7 sm:w-auto">
          <InputFloatLabel id="email" labelFloat="Email" name="" onChange={() => {}} type="text" value={UserLogin?.email || ""} />
          <InputFloatLabel id="phoneNumber" labelFloat="Phone Number" name="" onChange={() => {}} type="text" value={UserLogin.phoneNumber || ''} />
          <InputFloatLabel id="JonPosition" labelFloat="Job position" name="" onChange={() => {}} type="text" value={UserLogin?.jobPosition || ""} />
          <InputFloatLabel id="Salary" labelFloat="Salary" name="" onChange={() => {}} type="text" value={UserLogin.salary || ''} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
