import EmployeeMain from "@/Layout/EmployeePage";
import React from "react";
import ListEmployee from "@/root/components/listEmployee/ListEmployee";
import DashBoardMenu from "@/root/components/dashBoardMenu/DashBoardMenu";
import CenterMenu from "@/root/components/menus/employeeCenterMenu/EmployeeCenterMenu";
import RequestVacationAndJustification from "@/root/components/requestVacationAndJustification/RequestVacationAndJustification";

export default function index() {
  return (
    <EmployeeMain>
      <RequestVacationAndJustification/>
    </EmployeeMain>
  );
}
