import { PendingRequest } from "@/root/interface/employee";
import { selectGetEmployeesByIdDepartment, selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { StarGetEmployeesByIdDepartment, StartGetEmployeeByUid } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface RequestEmployeeProps {
  selectedRequest: any;
  option: string
}

const ListRequestVacations = ({option, selectedRequest }: RequestEmployeeProps) => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const listEmployees = useSelector(selectGetEmployeesByIdDepartment);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment(loginState?.idDepartment || ""));
  }, [option]);

  useLayoutEffect(() => {
    if (listEmployees) {
     
      const pendingRequestsList: PendingRequest[] = [];

      listEmployees.forEach((employee) => {
        const employeeName: string = employee.name;
        const employeeUID: string = employee.uid;
        const vacations = employee.vacations;

        if (vacations) {
          Object.entries(vacations).forEach(([key, value]) => {
            const { approved, dateEnd, dateStart, description } = value;

            if (approved == "waiting") {
              const pendingRequest: PendingRequest = {
                key: key.toString(),
                employeeName,
                employeeUID,
                dateStart,
                dateEnd,
                description,
                approved,
              };
              pendingRequestsList.push(pendingRequest);
            }
          });
        }
      });
      setPendingRequests(pendingRequestsList);
    }
  }, [listEmployees]);

  const handleLoadInformation = (request: PendingRequest) => {
    selectedRequest(request);
  };

  return (
    <div className="shadow-lg space-y-5 overflow-auto h-72 w-full p-4">
      {pendingRequests.map((request: PendingRequest, index: number) => (
        <div key={index} className="p-5 shadow-lg flex-col space-y-3 flex bg-lithBlue bg-opacity-40  rounded">
          <h3 className="text-md text-center font-semibold  mb-2">Employee: {request.employeeName}</h3>
          <p className="font-semibold text-center">Affair: {request.key}</p>
          <p className="font-semibold text-center">State: {request.approved}</p>
          <button className="bg-darkBlue" onClick={() => handleLoadInformation(request)}>
            Load information
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListRequestVacations;
