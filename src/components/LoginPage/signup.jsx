import styles from "./loginPage.module.css";

import { FcGoogle } from "react-icons/fc";

import { NavLink, useNavigate } from "react-router-dom";
import BrandImg from "../../assets/brand_img.png";

import { useEffect, useState } from "react";

import { Divider, Form,message } from 'antd';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { LoginWithGoogle, StyledButton, StyledForm, StyledFormInput, StyledFormItem, StyledPasswordInput } from './loginPage';
import { toast } from "react-toastify";

const AddUser=()=>{
    const [form] = Form.useForm();

    const [isLoading,setIsLoading] = useState(false)

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };

     
      
      const onFinish= async(values) => {
       try{
        setIsLoading(true)
          await axiosInstance.post("/user/register",values)
          setIsLoading(false)
          toast.info("Check your email to verify your account")
       }catch(error){
        setIsLoading(false)

        //new 
        if (error.response) {
          const { statusCode, errorType, message } = error.response.data;
          if (statusCode === 400 && errorType === "MISSING_CREDENTIALS") {
            toast.error("Please fill in all fields.");
          } else if (statusCode === 409 && errorType === "EMAIL_ALREADY_EXISTS") {
            form.setFields([
              {
                name: "email",
                errors: [message],
              },
            ]);
          } else if (statusCode === 500 && errorType === "EMAIL_SENDING_FAILED") {
            toast.info("User registered, but verification email failed.");

          } else if (statusCode === 500 && errorType === "SERVER_ERROR" ) {
            toast.error("Server error.");
          }
        } else {
          toast.error("Network error.");
        }  
       }    
      };

      const validateEmail = (_, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
        if (value.length > 35) {
          return Promise.reject(new Error('Email must be at most 35 characters!'));
        }
        if (!value) {
          return Promise.reject(new Error("Email is required"));
        } else if (!emailRegex.test(value)) {
          return Promise.reject(new Error("Please enter a valid email address"));
        }
        return Promise.resolve();
      };
      const validatePassword = (_, value) => {
        const minLength = 8;
        const maxLength = 20;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    
        if (!value) {
          return Promise.reject(new Error("Password is required"));
        }
        if (value.length < minLength) {
          return Promise.reject(new Error(`Password must be at least ${minLength} characters.`));
        }
        if (value.length > maxLength) {
          return Promise.reject(new Error(`Password must not exceed ${maxLength} characters.`));
        }
        if (!specialCharRegex.test(value)) {
          return Promise.reject(new Error("Password must contain at least one special character."));
        }
        return Promise.resolve();
      };

     // Confirm password validation
  const validateConfirmPassword = (_,value) => {

    const password = form.getFieldValue("password");
      if (!value) {
        return Promise.reject(new Error("Please confirm your password"));
      }
      if (value !== password) {
        return Promise.reject(new Error("Passwords do not match."));
      }
      return Promise.resolve();
  };


      const validateName = (_, value) => {
        // Regular expression to match only letters and spaces
        const nameRegex = /^[A-Za-z\s]*$/;
    
        if (!value) {
            return Promise.reject(new Error("Required"));
          }
    
        if (!nameRegex.test(value)) {
          return Promise.reject(new Error('Name must contain only letters and spaces!'));
        }
    
        if (value.length > 20) {
          return Promise.reject(new Error('Name must be at most 25 characters!'));
        }
    
        return Promise.resolve(); // Valid input
      };


      useEffect(() => {
       document.title="Register"
      }, []);
    
    return(
        <div className="h-full mt-3">
              <StyledForm
          form={form}
          name="createAccountForm"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
      
          
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
             <StyledFormItem
            label="Name"
            name="name"
            rules={[{ validator: validateName},{ max: 30, message: "Name cannot exceed 30 characters" }]}
          >
            <StyledFormInput disabled={isLoading} placeholder="Enter your name" />
          </StyledFormItem>
        
                   <StyledFormItem
          label="Email"
            name="email"
            rules={[{ validator: validateEmail }]}
          >
            <StyledFormInput disabled={isLoading} placeholder="Enter your email address" />
          </StyledFormItem>
        
          <StyledFormItem
          label="Password"
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <StyledPasswordInput disabled={isLoading} placeholder="Enter your password" />
          </StyledFormItem>
          <StyledFormItem
          label="Repeat Password"
            name="repeatPassword"
            
        rules={[
          {
            validator: validateConfirmPassword,
          },
        ]}
          >
            <StyledPasswordInput disabled={isLoading} placeholder="Repeat your password" />
          </StyledFormItem>
          <StyledFormItem>
                       <StyledButton loading={isLoading}
              
                         htmlType="submit"
                       >
                         Sign Up
                       </StyledButton>
                     </StyledFormItem>
        </StyledForm>
        <Divider plain style={{
      fontSize: '12px',
      color: '#ccc',
      borderColor: '#c9c9c9',
      margin:"0px"
    }}>or</Divider>
    <div className="flex flex-col gap-4">

  <LoginWithGoogle buttonText="Google" />


              <p className={`${styles.description} text-center`}>
                Already have an account?{" "}
                <NavLink to="/login"  className={styles.create_now_text}>
                  Sign In
                </NavLink>
              </p>
            </div>
        </div>
    )
}


const NewCreateAccount = () => {
    return (
        <div className="w-screen h-screen" style={{backgroundColor:"var(--color-white)"}}>
          <div className="w-full h-full p-5 md:p-0 md:w-1/2 border md:flex justify-center items-center">
          <div>
          <div className="flex flex-col md:max-w-96 justify-center items-center gap-2">
            <img src={BrandImg} alt="brand-logo" className={`${styles.brand_img} text-center`}/>
            <h1 className={styles.welcome_text}>Create your DocketPay Account</h1>
            <p className={styles.description}>Signup to access DocketPay features</p>
        </div>
        <AddUser />
            </div>
          </div>
        </div>
      )
}

export default NewCreateAccount


