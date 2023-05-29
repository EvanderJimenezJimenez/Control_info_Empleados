import React, { useState } from "react";
import CenterMenu from "../../menus/employeeCenterMenu/EmployeeCenterMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin } from "@/root/redux";

export default function ReadRequestJustification() {
  const dispatch = useDispatch();

  const UserLogin = useSelector(selectLogin);

  const [showBy, setShowBy] = useState("waiting");


  const FilterByAccepted = () => {
    setShowBy("accepted");
  };
  const FilterByDenied = () => {
    setShowBy("denied");
  };
  const FilterByWaiting = () => {
    setShowBy("waiting");
  };

  return (
    <>
      <section className="flex flex-col p-4 gap-4  p-2vh max-h-screen scroll overflow-y-auto h-64  ">
        <div className="flex flex-col justify-center items-center">
          {UserLogin?.attendance ? (
            <>
              {
                <>
                  {Object.entries(UserLogin.attendance)
                    .filter(([_, value]) => value.state === showBy)
                    .map(([name, vacation]) => (
                      <div className="flex items-center " key={name}>
                        <div className="flex w-full">
                          <div className="relative flex  flex-row items-center m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                            <div className=" px-6 py-8">
                              <h4 className=" text-xl font-semibold text-neutral">
                                <span>Day: {name}</span>
                              </h4>
                              <p className=" text-base font-normal text-black">
                                state:{" "}
                                {
                                  UserLogin.attendance[name]
                                    .state
                                }
                              </p>
                              <p className=" font-semibold">
                                Start Time:{" "}
                                {
                                  UserLogin.attendance[name]
                                    .startTime
                                }
                              </p>
                              <p>
                                End Time:{" "}
                                {UserLogin.attendance[name].endTime}
                              </p>
                              <p>
                                Justification start:{" "}
                                {
                                  UserLogin.attendance[name]
                                    .justificationIni
                                }
                              </p>
                              <p>
                                Justification End:{" "}
                                {
                                  UserLogin.attendance[name]
                                    .justificationFin
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              }
            </>
          ) : (
            <div className="flex justify-center items-center">
              <h2>No Request</h2>
            </div>
          )}
        </div>

      </section>
      <section className="items-center justify-center">
        <button onClick={FilterByAccepted} className="bg-darkBlue">
            Accepted
          </button>
          <button onClick={FilterByDenied} className="bg-red">
            Denied
          </button>
          <button onClick={FilterByWaiting} className="bg-blue">
            Waiting
          </button>
        </section>
    </>
  );
}
