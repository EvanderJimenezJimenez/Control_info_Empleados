import React, { useState } from "react";
import Login from "../login/Login";
import Register from "../registerEmployee/Register";
import ListEmployee from "../listEmployee/ListEmployee";
import { Top } from "../top/Top";
import { Foot } from "../foot/Foot";
import AlertOfSave from "../alerts/alertOfSave/AlertOfSave";
import { useDispatch, useSelector } from "react-redux";

export const MainForm = ({}) => {
  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-black text-center">
            <div className="flex-col pt-12 w-full h-screen p-1 flex justify-center items-center">
              <button className=" font-semibold cursor-pointer text-white bg-darkBlue" onClick={toggleComponent}>
                {showComponent ? "Don't have an account?, register" : "Do you have an account?, log in"}
              </button>
              <div className="flex items-center justify-center flex-col h-screen w-full p-2">
                <div>{showComponent ? <Login /> : <Register />}</div>
              </div>
            </div>
          </div>
        </div>
        <img className="h-screen w-screen object-cover" src="/Images/loginBackground.jpg" alt="Primary image" />
      </div>
    </>
  );
};

export default MainForm;
