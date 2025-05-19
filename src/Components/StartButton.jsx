import React from 'react';
import { GrNext } from 'react-icons/gr';

function StartButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative w-[60px] h-[60px] rounded-full bg-[#ccc9dc] flex items-center justify-center cursor-pointer transition-all duration-500 hover:w-[160px] hover:rounded-[40px] hover:shadow-[0_0_5px_5px_#1b2a41] mt-5 overflow-hidden"
      aria-label="Start the process"
      title="Start"
    >
      {/* Icon */}
      <GrNext
        className="text-black text-3xl transition-transform duration-500 group-hover:-translate-x-10"
      />

      {/* Sliding Text */}
      <p
        className="absolute left-[60px] top-0 h-full flex items-center text-3xl font-bold text-black translate-x-full transition-transform duration-500 group-hover:translate-x-0"
      >
        Start
      </p>
    </div>
  );
}

export default StartButton;
