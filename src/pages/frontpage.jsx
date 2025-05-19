import React from 'react';
import Profile from '../Components/profile';
import '../assets/css/frontpage.css';
import Ai from '../assets/images/195.jpg'
import Audio from '../assets/images/3497658.jpg'

function Frontpage() {
  return (
    <div className='container-fluid w-100 h-100 d-flex flex-column '>
      <div className='w-100 p-1'>
        <Profile />
      </div>

      <div className='flex-grow-1 d-flex justify-content-center align-items-center flex-column flex-lg-row gap-4 p-3'>

        {/* Audio Conversion Block */}
        <div className='card-block text-center position-relative'>
          <img
            src={Audio}
            alt='Audio'
            className='card-img'
          />
          <div className='default-title'>Audio Conversion</div>
          <div className='hover-content'>
            <p className='hover-desc'>Transcribe speech and generate appropriate medical results</p>
            <button className='btn btn-primary goto-btn' onClick={()=>{
              window.location.href="/record"
            }}>Go To</button>
          </div>
        </div>

        {/* ChatBot Block */}
        <div className='card-block text-center position-relative'>
          <img
            src={Ai}
            alt='ChatBot'
            className='card-img'
          />
          <div className='default-title'>ChatBot</div>
          <div className='hover-content'>
            <p className='hover-desc'>Ask questions, get answers</p>
            <button className='btn btn-primary goto-btn' onClick={()=>{
                 window.location.href="/question"
            }}>Go To</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Frontpage;
