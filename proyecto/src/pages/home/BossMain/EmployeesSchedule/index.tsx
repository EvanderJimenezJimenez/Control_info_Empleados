import EmployeeMain from "@/Layout/EmployeePage";
import React from "react";
import BossMain from "..";
import BossPage from "@/Layout/BossPage";
import EmployeeTableViewSchedule from "@/root/components/employeeTablewViewSchedule/EmployeeTableViewSchedule";
import ScheduleTimeSelection from "@/root/components/editSchedulePage/components/ScheduleTimeSelection";
import EmployeeTimeSection from "@/root/components/employeeTimeSection/EmployeeTimeSection";

export default function index() {
  return (
    <BossPage>
      <EmployeeTimeSection />
    </BossPage>
  );
}