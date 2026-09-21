import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import { AdminLogin } from "./Components/AdminLogin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div>
      <ToastContainer />
      {token === "" ? (
        <AdminLogin setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <Admin setToken={setToken}/>
        </>
      )}
    </div>
  );
};

export default App;
