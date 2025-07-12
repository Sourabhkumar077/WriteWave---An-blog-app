import { useState,useEffect, use } from 'react'
import { useDispatch } from 'react-redux'
import authSlice from './store/authSlice';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import { Outlet } from 'react-router-dom';
import {Header,Footer} from './components/index';
import './App.css'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading,setLoding] = useState(false); // Changed to false to skip auth check
  const dispatch = useDispatch();

  // useEffect(
  //   ()=>{
  //     authService.getCurrentUser()
  //     .then((userData)=>{
  //       if(userData){
  //         dispatch(login({userData}));
  //       }else{
  //         dispatch(logout());
  //       }
  //     })
  //     .finally(()=> setLoding(false));
  //   },[])

   return !loading ? (
    <div className='min-h-screen flex flex-wrap '>
      <div className='w-full block bg-pink-400'>
        <Header/>
       <main>
         <Outlet/>
       </main>
        <Footer/>
      </div>
    </div>
   ) 
  : ( <h1> Loading...</h1>);  
  
  
}

export default App
