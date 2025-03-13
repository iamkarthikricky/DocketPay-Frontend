import styles from "./loginPage.module.css";

import { FcGoogle } from "react-icons/fc";

import { Button, Divider, Form, Input,Alert } from "antd";
import { jwtDecode } from "jwt-decode";

import { useState,useEffect } from "react";
import styled from "styled-components";

import { Link, NavLink, useNavigate } from "react-router-dom";
import BrandImg from "../../assets/brand_img.png";
import axiosInstance from "../../axiosConfig/axiosConfig";

import { toast } from 'react-toastify';

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, updateUserInfo } from "../../redux/authSlice";


// Create a styled component for Input

// Styled Form.Item

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap:0px !important;
  background-color:none !important;
`;

export const StyledFormItem = styled(Form.Item)`
    margin-bottom:15px !important;
  .ant-form-item-label{
    padding-bottom:3px !important;
  }

  .ant-form-item-label > label {
    height:0px;
    font-family:var(--font-public);
    font-size:var(--sub-heading);
    font-weight:var(--font-weight500);
    color:var(--color-black);
    text-align:left !important;
}
  .ant-form-item-explain-error{
    font-size:var(--main-para);
    font-family:var(--font-public);
    margin:3px 0px !important;
  }
`;

export const StyledFormInput = styled(Input)`
  width: 100%; // Custom width
  border-radius: 5px; // Rounded corners
 
  background-color: var(--input-bg) !important; // Light background color
  height:35px;
  font-family: var(--font-public);
  font-size: var(--main-para);
  color:var(--color-black) !important;

  &:hover {
    border-color: #c9c9c9; // Darker green on hover
     background-color: var(--input-bg); // Light background color
  }
  &:focus {
    border-color: #c9c9c9; // Green border on focus
     background-color: var(--input-bg) !important; // Light background color
    box-shadow: none;
  }

  &::placeholder {
    font-family: var(--font-public);
    font-size: var(--main-para);
     color:var(--color-black) !important;
  }
`;

// Styled Input.Password
export const StyledPasswordInput = styled(Input.Password)`
  width: 100%; // Custom width
  border-radius: 5px; // Rounded corners
  border: 1px solid #c9c9c9; // Green border
   background-color: var(--input-bg) !important; // Light background color
  height: 35px;
  font-family: var(--font-public);
  font-size: var(--main-para);

  &:hover {
    border-color: #c9c9c9; // Darker green on hover
      background-color: var(--input-bg) !important; // Light background color
  }

  // Focus state
  &:focus,
  &:focus-within {
    border-color: #c9c9c9;
    box-shadow: none;
      background-color: var(--input-bg) !important; // Light background color
  }

  // Target the inner "eye" icon
  .ant-input-suffix {
    svg {
      color:var(--color-black); // Color of the eye icon
      font-size: 18px;
    }
  }

  // For the input itself
  input {
    padding: 8px 12px;
    background-color: transparent;
  color:var(--color-black) !important;
    &:focus {
      outline: none;
    }
  }

  input::placeholder {
    font-family: var(--font-public);
    font-size: var(--main-para) !important;
     color:var(--color-black) !important;
  }
`;


export const StyledButton = styled(Button)`
width:100%;
height:36px;
margin-top:20px;
font-family:var(--font-public);
font-size:var(--sub-heading);
color:var(--color-black);
  background-color:#212121 !important;
  color: white !important;
  border: none !important;
  &:hover,
  &:focus {
   
    color: white !important;
  }
  &.ant-btn-loading {
     background-color:#212121 !important;
    color: white !important;
  }
`;

export const LoginWithGoogle=()=>{

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: async(credentialResponse) => {
     const response = await axios.post("http://localhost:5000/auth/google",{code:credentialResponse?.access_token})
      // Send the credentialResponse to backend for verification & JWT issuance
      if(response?.data?.token){
        dispatch(login(response?.data?.token))
        navigate('/')
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  
   
  });

  function handleGoogleLogin() {
    googleLogin(); // Call the returned function when needed
  }

  return (
   
    <button className="w-full mt-5 h-9 rounded-lg flex items-center justify-center gap-2 " onClick={handleGoogleLogin}>
    `<FcGoogle />
    <p className={styles.social_text}>Continue with Google</p>
  </button>
 
  )
}


export const EmailLogin = () => {
    const [form] = Form.useForm();

    const [isLoading,setIsLoading] = useState(false)
  
    const validatePassword = (_, value) => {
      if (!value) {
        return Promise.reject(new Error("Password is required"));
      }
      return Promise.resolve();
    };
  
    const validateEmail = (_, value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        return Promise.reject(new Error("Email is required"));
      } else if (!emailRegex.test(value)) {
        return Promise.reject(new Error("Please enter a valid email address"));
      }
      return Promise.resolve();
    };
  
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const onFinish = async (values) => {
      const { email, password } = values;
      const requestData = { email, password };  
      try {
        setIsLoading(true)
        const response = await axiosInstance.post("/user/login", requestData);
        if (response.status === 200) {
            setIsLoading(false)
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
        }
      } catch (error) {
        setIsLoading(false)
        if(error.response.status === 400)
          {
            dispatch(updateUserInfo({userEmail:email}))
            localStorage.setItem("userEmail",email)
            navigate("/verify-account/:token")
          }
        if (error.response) {
          const { status, data } = error.response;
          const errorMessage = data?.message || "An error occurred";
          // Define a common function to set error for form fields
          const setFieldError = (fieldName, message) => {
            form.setFields([
              {
                name: fieldName,
                errors: [message],
              },
            ]);
          };
  
          // Handle different status codes and set appropriate field errors
          if (status === 404) {
            setFieldError("email", errorMessage);
          } else if (status === 400) {
            setFieldError("password", errorMessage);
          }
        
        }
        else{
          toast.error(`${error.message}`)
        }
      }
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };


    return (
      <div className="h-full mt-3">
          <StyledForm
            form={form}
            name="loginForm"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <StyledFormItem
                label="Email"
              name="email"
              rules={[{ validator: validateEmail }]}
            >
              <StyledFormInput disabled={isLoading} placeholder="Enter email address" />
            </StyledFormItem>
            <StyledFormItem
            label="Password"
              name="password"
              rules={[{ validator: validatePassword }]}
            >
              <StyledPasswordInput  disabled={isLoading} placeholder="Enter your password" />
            </StyledFormItem>
            <Link to="/forgot-password" className={styles.forgot_password}>
              Forgot Password ?
            </Link>
            <StyledFormItem>
              <StyledButton loading={isLoading}
              
                htmlType="submit"
              >
               Login
              </StyledButton>
            </StyledFormItem>
          </StyledForm>
          <Divider plain style={{
      fontSize: '12px',
      color: '#ccc',
      borderColor: '#c9c9c9',
      margin:"0px"
    }}>or</Divider>
    <div className="flex flex-col gap-2">
      <GoogleOAuthProvider clientId="667789602538-rf1am23pahsq6o1hicv2mgq9saj016sg.apps.googleusercontent.com">
              <LoginWithGoogle />
            </GoogleOAuthProvider>
              <p className={`${styles.description} text-center`}>
                Don't have an account?{" "}
                <NavLink to="/signup"  className={styles.create_now_text}>
                  Register
                </NavLink>
              </p>
              </div>
      </div>
    );
  };


const NewLoginPage = () => {

  useEffect(()=>{
    document.title="Login"
  },[])

  return (
    <div className="w-screen h-screen" style={{backgroundColor:"var(--color-white)"}}>
      <div className="w-full h-full p-5 md:p-0 md:w-1/2 flex justify-center items-center">
      <div>
      <div className="flex flex-col md:max-w-96 justify-center items-center gap-2">
        <img src={BrandImg} alt="brand-logo" className={`${styles.brand_img} text-center`}/>
        <h1 className={styles.welcome_text}>Welcome to DocketPay</h1>
        <p className={styles.description}>Enter your credentials to continue.</p>
    </div>
        <div>
            <EmailLogin />
        </div>
        </div>
      </div>
    </div>
  )
}

export default NewLoginPage
