import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import "./index.css";

const DemoLogin = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    dispatch(login(email, password));
  };

  return (
    <button className="demo-login" 
            onClick={(e) => handleClick(e)}>
            Demo User
    </button>
  );
};

export default DemoLogin;
