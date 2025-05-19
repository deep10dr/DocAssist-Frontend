import React, { useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { GrGoogle, GrFacebookOption } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import CatGif from "../assets/images/cutty.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Profile from "../Components/profile";

export const setUserValue = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getUserValue = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showTooltip, setShowTooltip] = useState({
    email: false,
    password: false,
    general: false,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({ ...prev, [name]: inputValue }));
    setShowTooltip((prev) => ({ ...prev, [name]: false }));
  }

  function validateForm() {
    let newErrors = {};
    let tooltipState = { email: false, password: false, general: false };

    if (!value.email.trim()) {
      newErrors.email = "Enter a valid email";
      tooltipState.email = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      newErrors.email = "Invalid email format!";
      tooltipState.email = true;
    }

    if (!value.password.trim()) {
      newErrors.password = "Password is required!";
      tooltipState.password = true;
    } else if (value.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
      tooltipState.password = true;
    }

    setErrors(newErrors);
    setShowTooltip(tooltipState);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://doassist-backend-production.up.railway.app/login",
          value
        );
        if (response.data.message === "ok") {
          setUserValue({ email: response.data.email, name: response.data.name });
          window.location.href = "/dashboard";
        } else if (response.data === "incorrect") {
     Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Incorrect password! Please try again.',
  confirmButtonText: 'Retry',
  confirmButtonColor: '#3085d6',
  customClass: {
    popup: 'swal-popup-custom',
    title: 'text-2xl font-bold text-red-600 mb-4',
    content: 'text-lg text-gray-700',
    confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg',
    height:'h-[400px]',
    width:'w-[310px]'
  },
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
});


        } else if (response.data === "not") {
          Swal.fire("Account not found");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrors((prev) => ({ ...prev, general: "Invalid email or password!" }));
        setShowTooltip((prev) => ({ ...prev, general: true }));
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div
      className="flex flex-col h-screen w-full items-center p-0 m-0"
      data-aos="zoom-out"
    >
      <div className="w-full p-0 mt-2">
        <Profile />
      </div>
      <img src={CatGif} alt="Cat" className="w-[250px]" />

      <div
        className="h-[450px] w-[310px] p-6 rounded-2xl shadow-2xl backdrop-blur-sm bg-white/90"
  
      >
        <p className="text-center mb-2 mt-3 font-bold text-gray-800 text-3xl">Login</p>
        <h4 className="text-center text-gray-600">Welcome back!</h4>

        <form
          className="w-full p-2 flex flex-col items-center container-fluid"
          onSubmit={handleSubmit}
        >
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip-email">{errors.email}</Tooltip>}
            show={showTooltip.email}
          >
            <div
              className="flex items-center h-[45px] rounded-xl bg-gradient-to-r from-white/90 via-white/80 to-white/60
               shadow-[0_4px_6px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.1)]
               transition-shadow duration-300 mb-3 w-full backdrop-blur-sm"
            >
              <span className="flex items-center justify-center min-w-[40px] cursor-pointer text-gray-700">
                <FaUser />
              </span>
              <input
                type="text"
                name="email"
                value={value.email}
                onChange={handleChange}
                placeholder="Email ID"
                className="flex-1 border-none outline-none min-w-0 ms-2 px-3 bg-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-password">{errors.password}</Tooltip>}
            show={showTooltip.password}
          >
            <div
              className="flex items-center h-[45px] rounded-xl bg-gradient-to-r from-white/60 via-white/80 to-white/20
               shadow-[0_4px_6px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.1)]
               transition-shadow duration-300 mb-2 w-full backdrop-blur-sm"
            >
              <span className="flex items-center justify-center min-w-[40px] cursor-pointer text-gray-700">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={value.password}
                onChange={handleChange}
                placeholder="Password"
                className="flex-1 border-none outline-none min-w-0 ms-2 px-3 bg-transparent text-gray-900 placeholder-gray-500"
              />
              <span
                className="cursor-pointer bg-transparent border-none text-gray-700 min-w-[40px] flex items-center justify-center"
                onClick={() => setShowPassword(!showPassword)}
                style={{ border: "none", outline: "none" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </OverlayTrigger>

          <p
            className="small-text text-primary mt-2 text-end w-full cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
<button
  type="submit"
  className="group flex justify-center items-center w-[100px] p-2 h-[44px] bg-blue-500  text-xl font-semibold shadow-md
             hover:w-[140px] transition-all duration-500 ease-in-out rounded-lg overflow-hidden relative"
  style={{ borderRadius: '16px' }}
>
  <span className="transition-transform duration-500 ease-in-out group-hover:-translate-x-4 text-white">
    Login
  </span>

  <span
    className="ml-2  hidden text-4xl group-hover:flex transition-opacity duration-300 ease-in-out
               translate-x-2 items-center text-white"
  >
    <MdLogin size={24} />
  </span>

  {/* Glow effect on hover */}
  <span className="absolute inset-0 rounded-lg bg-blue-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 pointer-events-none"></span>
</button>



          <p className="small-text mt-1 mb-1">Or</p>

   <div className="flex w-full justify-around mt-2 gap-2">
  <div
    className="p-2 bg-black rounded-full hover:bg-white transition-all duration-300 cursor-pointer"
  >
    <GrGoogle className="h-[25px] w-[25px] text-white group-hover:text-black" />
  </div>

  <div
    className="p-2 bg-black rounded-full hover:bg-white transition-all duration-300 cursor-pointer"
  >
    <GrFacebookOption className="h-[25px] w-[25px] text-white group-hover:text-black" />
  </div>

  <div
    className="p-2 bg-black rounded-full hover:bg-white transition-all duration-300 cursor-pointer"
  >
    <FaXTwitter className="h-[25px] w-[25px] text-white group-hover:text-black" />
  </div>
</div>




          <div className="w-full flex justify-center text-center">
            <p className="mt-2 small-text w-full">
              Don't have an account?{" "}
              <span
                className="text-primary cursor-pointer text-center"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
