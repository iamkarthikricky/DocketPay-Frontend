import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/loginPage';
import './global.css';
import ProtectedRoute from './protectedRoute';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/HomePage/Dashboard/dashboard';
import Notifications from './components/HomePage/Notifications/Notifications';
import Settings from './components/HomePage/Settings/Settings';
import Transactions from './components/HomePage/Transactions/Transactions';
import ForgotPassword from './components/LoginPage/forgotPassword';
import CreateAccount from './components/LoginPage/signup';
import { UpdatePassword } from './components/LoginPage/updatePassword';
import { VerifyAccount } from './components/LoginPage/verifyAccount';
import { SideBar } from './components/SideBarNew/sidebar';



import { GoogleOAuthProvider } from "@react-oauth/google";

import { createGlobalStyle } from "styled-components";

const GlobalTextStyles = createGlobalStyle`
  /* Force black background on autofilled inputs */
  input:-webkit-autofill {
   -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: var(--color-black) !important;
    transition: background-color 5000s ease-in-out 0s; /* Prevents flash */
     caret-color: var(--color-black) !important; /* 🔥 Fixes cursor color */
  }
`;

const App=()=>{

  const token = useSelector((state) => state.auth.token); // Get token from Redux

  const {darkMode} = useSelector((state)=>state.docketPay)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);


  

  return(
    <div>
      <GlobalTextStyles />
    
    <GoogleOAuthProvider clientId="667789602538-rf1am23pahsq6o1hicv2mgq9saj016sg.apps.googleusercontent.com">
    <>
    <Router>
       <Routes>
          {/* Redirect to /login if the user is not logged in, otherwise go to /dashboard */}
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />

          {/* If user is logged in, redirect them to /dashboard, else show the login page */}
          <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} />

          {/* If user is logged in, redirect them to /dashboard, else show the create account page */}
          <Route path="/register" element={token ? <Navigate to="/dashboard" replace /> : <CreateAccount />} />

          <Route path="/verify-email/:token"  element={token ? <Navigate to="/dashboard" replace /> : <VerifyAccount />} />
          {/* 7893917079 */}
          {/* If user is logged in, redirect them to /dashboard, else show the create account page */}
          <Route path="/forgot-password" element={token ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />

             {/* If user is logged in, redirect them to /dashboard, else show the create account page */}
             {/* <Route path="/verify-account" element={token ? <Navigate to="/dashboard" replace /> : <VerifyAccount />} /> */}

             <Route
  path="/reset-password/:token"
  element={token ? <Navigate to="/dashboard" replace /> : <UpdatePassword />}
/>


          {/* Protected route for /dashboard */}
          <Route path="/" element={<SideBar />}>
            <Route path="dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="transactions" element={<ProtectedRoute element={Transactions} />} />
            <Route path="settings" element={<ProtectedRoute element={Settings} />} />
            <Route path="notifications" element={<ProtectedRoute element={Notifications} />} />
          </Route>
       
        </Routes>
  </Router>
  </>
  </GoogleOAuthProvider>
  <ToastContainer />
  

  </div>
     
  )
}


export default App