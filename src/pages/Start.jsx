import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrNext } from 'react-icons/gr';
import Profile from '../Components/profile';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StartButton from '../Components/StartButton';

function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleStartClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="h-screen w-full flex flex-col"> {/* Added background for better contrast */}
      <div className="w-full p-0">
        <Profile />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <div
          className="w-full flex items-center justify-center mb-8 animate-[zoom-out-down_0.5s_ease-out]"
          data-aos="zoom-out-down"
          data-aos-delay="500"
        >
          <p className="text-white text-5xl md:text-6xl lg:text-8xl font-bold font-poppins">
            DocAssist
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/128/15536/15536380.png"
            alt="Doctor Icon"
            className="ms-2 md:ms-4 ml-4 w-[60px] sm:w-[50px] md:w-[100px] md:h-[100px]"
          />
        </div>
<div><StartButton onClick={handleStartClick}/></div>
      </div>
    </div>
  );
}

export default Start;
