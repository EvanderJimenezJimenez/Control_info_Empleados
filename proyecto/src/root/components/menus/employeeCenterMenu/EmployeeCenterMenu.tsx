import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function EmployeeCenterMenu() {
  const router = useRouter();

  const [selectedButton, setSelectedButton] = useState<string | null>("");

  const handleButtonClick = (route: Url) => {
    router.push(route);
    setSelectedButton(route.toString());
  };

  return (
    <>
      <div className="left-0 z-50 w-full h-16 bg-darkBlue bg-opacity-70 print:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">

          <button
            onClick={() => handleButtonClick("/home/EmployeeMain/Schedule")}
            type="button"
            className={
              router.pathname === "/home/EmployeeMain/Schedule"
                ? "inline-flex flex-col items-center justify-center px-5  bg-lithBlue"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/WhiteCalendar.png" alt="" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Schedule
            </span>
          </button>
          <button
            onClick={() =>
              handleButtonClick("/home/EmployeeMain/Justification")
            }
            type="button"
            className={
              router.pathname === "/home/EmployeeMain/Justification"
                ? "inline-flex flex-col items-center justify-center px-5  bg-lithBlue"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/pencil.png" alt="" />
            <span className="text-sm  group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Justification
            </span>
          </button>

          <button
            onClick={() => handleButtonClick("/home/EmployeeMain/Vacations")}
            type="button"
            className={
              router.pathname === "/home/EmployeeMain/Vacations"
                ? "inline-flex flex-col items-center justify-center px-5  bg-lithBlue"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/WhiteCalendar.png" alt="" />
            <span className="text-sm  group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Vacations
            </span>
          </button>

          <button
            onClick={() => handleButtonClick("/home/EmployeeMain/Documents")}
            type="button"
            className={
              router.pathname === "/home/EmployeeMain/Documents"
                ? "inline-flex flex-col items-center justify-center px-5  bg-lithBlue"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <img src="/Images/WhiteCalendar.png" alt="" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Documents
            </span>
          </button>

          <button
            onClick={() => handleButtonClick("/home/EmployeeMain/Profile")}
            type="button"
            className={
              router.pathname === "/home/EmployeeMain/Profile"
                ? "inline-flex flex-col items-center justify-center px-5  bg-lithBlue"
                : "inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x   group"
            }
          >
            <svg
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              ></path>
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Profile
            </span>
          </button>

        </div>
      </div>
    </>
  );
}
