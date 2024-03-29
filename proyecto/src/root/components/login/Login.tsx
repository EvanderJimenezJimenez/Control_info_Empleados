import { useState, ChangeEvent, useEffect } from "react";
import ListEmployee from "../listEmployee/ListEmployee";
import { LoginEP } from "../../interface/employee/";
import FormLogin from "./components/FormLogin";
import { useDispatch, useSelector } from "react-redux";
import { StartLogin } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import { selectGetByIdDocDepartment, selectGetDepartmentById } from "@/root/redux/selectors/department-selector/department.selector";
import { startGetDepartByIdDoc } from "@/root/redux/thunks/department-thunk/department.thunk";
import cookiesUser from "@/root/utils/login/cookiesUser";
import { RootState } from "@/root/redux/store";
import LoadingGeneralComponent from "../loadingGeneralComponent/LoadingGeneralComponent";
import InputWitMenu from "../ui/inputWithMenu/InputWitMenu";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { starAlertError, starAlertSuccess } from "@/root/redux/thunks/alertHandler-thunk/alertHandler-thunk";



function Login() {
  const dispatch = useDispatch();

  const loginState = useSelector(selectLogin);
  const resDepart = useSelector(selectGetByIdDocDepartment);
  const loading = useSelector((state: RootState) => state.loading.loading);

  const [data, setData] = useState<LoginEP>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loginState?.idDepartment !== undefined ) {
      dispatch(startGetDepartByIdDoc(loginState.idDepartment));
    }
  }, [loginState, dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e: any) => {//TODO: Type all variables that you use
    e.preventDefault();

    if (data.email && data.password) {
      dispatch(StartLogin(data.email, data.password));

    } else {
      dispatch(starAlertError("Please enter your credentials", true))
    }
  };
  useEffect(() => {
    if (loginState && resDepart) {
      cookiesUser(loginState, resDepart);
    }
  }, [loginState, resDepart]);

  return (
    <>
      <div className="flex justify-center">{loading ? <LoadingGeneralComponent /> : <div className="font-bold text-white text-xl">Welcome!</div>}</div>
      <FormLogin handleSubmit={handleLogin} handleInputChange={handleInputChange} loginData={data} />
    </>
  );
}

export default Login;
