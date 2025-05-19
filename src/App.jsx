import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Starter from './pages/Start.jsx';
import Record from './pages/Record.jsx';
import ErrorPage from './pages/Error.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx'
import Result from './pages/result.jsx'
import User from './pages/user.jsx'
import Login_page from './pages/login_page.jsx'
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css"; 
// import Daily_news from './pages/daily_news.jsx';
import Question from './pages/question.jsx';
import Frontpage from './pages/frontpage.jsx';
function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, [])

  return (
    <div className='h-screen w-full bg-[#0c1821]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Starter />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/record' element={sessionStorage.getItem('user')? <Record/> : <Navigate to="/login" />} />
          <Route path='/result' element={sessionStorage.getItem('user')?<Result/>: <Navigate to='/login'/>} />
          {/* <Route path='/user' element={sessionStorage.getItem('user')?<User/>:<Navigate  to = '/login' /> }/> */}
          <Route path='/user' element={<User />} />
          <Route path='/question' element={<Question />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/l' element={<Login_page />} />
          <Route  path='/dashboard' element={sessionStorage.getItem('user')? <Frontpage/> : <Navigate to="/login" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
