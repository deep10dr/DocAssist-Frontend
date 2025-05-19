import '../assets/css/signup.css';
import kitty from '../assets/images/cutty-2.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Profile from '../Components/profile';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function Signup() {
  const navigate = useNavigate();
  const [value, setValue] = useState({ name: '', email: '', password: '', confirmPassword: '', agree: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value: inputValue, type, checked } = e.target;
    setValue((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : inputValue }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!value.name.trim()) {
      newErrors.name = "Name is required!";
    } else if (value.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long!";
    }

    if (!value.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      newErrors.email = "Invalid email format!";
    }

    if (!value.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (value.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    }

    if (value.confirmPassword !== value.password) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    if (!value.agree) {
      newErrors.agree = "You must agree to the terms!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const senddata = await axios.post("https://doassist-backend-production.up.railway.app/signup", value);
        if (senddata.data === 'ok') {
          setValue({ name: '', email: '', password: '', confirmPassword: '', agree: false });
          Swal.fire("Success", "Account Created Successfully", "success");
          if (!sessionStorage.getItem('user')) {
            sessionStorage.setItem('user', JSON.stringify({ name: value.name, email: value.email }));
            window.location.href = "/record";
          }
        } else if (senddata.data === 'found') {
          Swal.fire("Email Found", "Try Another Email", "error");
        } else {
          Swal.fire("Error", "Account not created", "error");
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center'>
   <div className="w-full p-0 mt-2">
        <Profile />
      </div>
      <img src={kitty} alt="Kitty" className='h-25' />
      <div className="h-[450px] w-[330px] md:w-[350px] bg-white/90 rounded-2xl p-3 shadow-lg backdrop-blur-sm">
        <p className="text-center text-3xl font-bold mb-1">Sign Up</p>
        <form className="w-full p-1 pt-3" onSubmit={handleSubmit}>
  
  {/* Name Field */}
  <OverlayTrigger placement="bottom" overlay={<Tooltip>{errors.name}</Tooltip>}>
    <div className="flex items-center h-[45px] rounded-xl bg-gradient-to-r from-white/60 via-white/80 to-white/20 shadow-md mb-2 w-full">
      <FaUser className="min-w-[40px] text-gray-700" />
      <input
        type="text"
        name="name"
        value={value.name}
        onChange={handleChange}
        placeholder="Enter Your Name"
        className="flex-1 bg-transparent outline-none px-3"
      />
    </div>
  </OverlayTrigger>

  {/* Email Field */}
  <OverlayTrigger placement="bottom" overlay={<Tooltip>{errors.email}</Tooltip>} >
    <div className="flex items-center h-[45px] rounded-xl bg-gradient-to-r from-white/60 via-white/80 to-white/20 shadow-md mb-2 w-full">
      <FaEnvelope className="min-w-[40px] text-gray-700" />
      <input
        type="email"
        name="email"
        value={value.email}
        onChange={handleChange}
        placeholder="Enter Your Email"
        className="flex-1 bg-transparent outline-none px-3"
      />
    </div>
  </OverlayTrigger>

  {/* Password Field */}
<OverlayTrigger placement="bottom" overlay={<Tooltip>{errors.password}</Tooltip>}>
  <div className="flex items-center h-[45px] rounded-xl bg-gradient-to-r from-white/60 via-white/80 to-white/20 shadow-md mb-2 w-full relative">
    <FaLock className="min-w-[40px] text-gray-700" />
    
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={value.password}
      onChange={handleChange}
      placeholder="Enter Password"
      className="flex-1 bg-transparent outline-none px-3"
    />
    
    <span
      className="absolute right-3 cursor-pointer text-gray-700"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
</OverlayTrigger>


  {/* Confirm Password Field */}
  <OverlayTrigger placement="bottom" overlay={<Tooltip>{errors.confirmPassword}</Tooltip>}>
    <div className="flex items-center h-[45px] rounded-xl bg-gradient-to-r from-white/60 via-white/80 to-white/20 shadow-md mb-2 w-full">
      <FaLock className="min-w-[40px] text-gray-700" />
      <input
        type={showPassword ? "text" : "password"}
        name="confirmPassword"
        value={value.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="flex-1 bg-transparent outline-none px-3"
      />
    </div>
  </OverlayTrigger>

  {/* Checkbox Field */}
  <OverlayTrigger placement="bottom" overlay={<Tooltip>{errors.agree}</Tooltip>}>
    <div className="w-full flex items-center mb-2">
      <input
        type="checkbox"
        name="agree"
        checked={value.agree}
        onChange={handleChange}
        className="mr-2"
      />
      <label>I agree to the <a href="#" className="text-blue-500">Terms & Conditions</a></label>
    </div>
  </OverlayTrigger>

  {/* Submit Button */}
<div className='w-full flex justify-center items-center'>  <button
  type="submit"
  className="group flex justify-center items-center w-[100px] p-2 h-[44px] bg-blue-500  text-xl font-semibold shadow-md
             hover:w-[140px] transition-all duration-500 ease-in-out rounded-lg overflow-hidden relative"
  style={{ borderRadius: '16px' }}
>
  <span className="transition-transform duration-500 ease-in-out group-hover:-translate-x-4 text-white">
    Sign Up
  </span>

  <span
    className="ml-2  hidden text-4xl group-hover:flex transition-opacity duration-300 ease-in-out
               translate-x-2 items-center text-white"
  >
  
  </span>

  {/* Glow effect on hover */}
  <span className="absolute inset-0 rounded-lg bg-blue-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 pointer-events-none"></span>
</button></div>

</form>

  <div className="w-full flex justify-center text-center">
            <p className="mt-3 small-text w-full">
           Already have an account?{" "}
              <span
                className="text-primary cursor-pointer text-center"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </p>
          </div>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
