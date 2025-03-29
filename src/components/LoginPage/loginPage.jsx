import styles from "./loginPage.module.css";

import { FcGoogle } from "react-icons/fc";

import { Button, Divider, Form, Input } from "antd";

import React,{ useEffect, useState } from "react";
import styled from "styled-components";

import { Link, NavLink, useNavigate } from "react-router-dom";
import BrandImg from "../../assets/brand_img.png";
import axiosInstance from "../../axiosConfig/axiosConfig";

import { toast } from "react-toastify";

import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { login, updateUserInfo } from "../../redux/authSlice";

// Create a styled component for Input

// Styled Form.Item

export const StyledForm = styled(Form)`
  width:100% !important;
   background-color: transparent !important;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: unset !important;
  min-width:100% !important;
  .ant-form-item-label {
    padding-bottom: 6px !important;
  }

  .ant-form-item-label > label {
    height: 0px;
    font-family: var(--font-public);
    font-size: var(--sub-heading);
    font-weight: var(--font-weight500);
    color: var(--color-black);
    text-align: left !important;
  }
  .ant-form-item-explain-error {
    font-size: var(--main-para);
    font-family: var(--font-public);
    margin: 3px 0px !important;
  }

  .ant-form-item-required::before{
    display:none !important;
  }
   

`;

export const StyledFormInput = styled(Input)`
  width: 100%; // Custom width
  border-radius: 5px; // Rounded corners

  background-color: var(--input-bg) !important; // Light background color
  height: var(--input-field-height);
  font-family: var(--font-public);
  font-size: var(--main-para);
  color: var(--color-black) !important;

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
    color: var(--color-black) !important;
  }
`;

// Styled Input.Password
export const StyledPasswordInput = styled(Input.Password)`
  width: 100%; // Custom width
  border-radius: 5px; // Rounded corners
  border: 1px solid #c9c9c9; // Green border
  background-color: var(--input-bg) !important; // Light background color
  height: var(--input-field-height);
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
      color: var(--color-black); // Color of the eye icon
      font-size: 18px;
    }
  }

  // For the input itself
  input {
    padding: 8px 12px;
    background-color: transparent;
    color: var(--color-black) !important;
    &:focus {
      outline: none;
    }
  }

  input::placeholder {
    font-family: var(--font-public);
    font-size: var(--main-para) !important;
    color: var(--color-black) !important;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
padding:15px;
height:var(--input-field-height);
  font-family: var(--font-public);
  font-size: var(--sub-heading);
  color: var(--color-black);
  background-color: #212121 !important;
  color: white !important;
  border: none !important;
  &:hover,
  &:focus {
    color: white !important;
  }
  &.ant-btn-loading {
    background-color: #212121 !important;
    color: white !important;
  }
`;

export const LoginWithGoogle = ({ buttonText = "Continue with Google", className = ""}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      setIsLoading(true);
  
      try {
        const { data } = await axiosInstance.post("/auth/google", {
          code: access_token, // Destructured directly
        });
  
        const { token, message, user } = data;
  
        // Show success message
        toast.info(message);
  
        // Store token & user in Redux
        dispatch(login(token));
        dispatch(updateUserInfo(user));
  
        // Redirect to homepage
        navigate("/");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
        console.error("Google Login Error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Google login failed. Please try again.");
      setIsLoading(false);
    },
  });
  
  

  function handleGoogleLogin() {
    googleLogin(); // Call the returned function when needed
   
  }

  return (
    <React.Fragment>
         <button
      className={`${className} w-full h-9 rounded-lg flex items-center justify-center gap-2`}
      onClick={handleGoogleLogin}
    >
      <FcGoogle />
      <p className={styles.social_text}>{buttonText}</p>
    </button>
    {isLoading &&  <div className={styles.loading_view_container}>
<div className="flex flex-row gap-2">
  <div className="w-4 h-4 rounded-full bg-lime-600 animate-bounce [animation-delay:.7s]"></div>
  <div className="w-4 h-4 rounded-full bg-lime-600 animate-bounce [animation-delay:.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-lime-600 animate-bounce [animation-delay:.7s]"></div>
</div>
          </div> }
    </React.Fragment>
   
  );
};

export const EmailLogin = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);



  const validatePassword = (_, value) => {
    const minLength = 8;
    const maxLength = 20;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!value) {
      return Promise.reject(new Error("Password is required"));
    }
    if (value.length < minLength) {
      return Promise.reject(
        new Error(`Password must be at least ${minLength} characters.`)
      );
    }
    if (value.length > maxLength) {
      return Promise.reject(
        new Error(`Password must not exceed ${maxLength} characters.`)
      );
    }
    if (!specialCharRegex.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one special character.")
      );
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

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const onFinish = async (values) => {
    const { email, password } = values;
    const requestData = { email, password };
    try {
      setIsLoading(true);
    
      const { data } = await axiosInstance.post("/user/login", requestData);
    
      console.log(data)

      setIsLoading(false);
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      dispatch(updateUserInfo(data.user));
      navigate("/dashboard");
    } catch (error) {
   
      if (!error.response) {
        return toast.error("Network error.");
      }

      if (error.response?.data) {
        const { errors, errorType } = error.response.data;
      
        if (Array.isArray(errors)) {
          const errorFields = errors.map(({ field, message }) => ({
            name: field,
            errors: [message],
          }));
      
          form.setFields(errorFields); // Set form errors dynamically
        } else {
          const messages = {
            EMAIL_NOT_VERIFIED: "Check your email for the verification link.",
            SERVER_ERROR: "Server error.",
          };
      
          if (messages[errorType]) {
            toast[errorType === "SERVER_ERROR" ? "error" : "info"](messages[errorType]);
          }
        }
      }
      
 

     
      // const { statusCode, errorType, error: { message } = {} } = error?.response?.data || {};

      // const fieldErrors = {
      //   USER_NOT_FOUND: "email",
      //   INVALID_CREDENTIALS: "password",
      // };
    
      // if (errorType === "MISSING_CREDENTIALS") {
      //   toast.error("Please fill in all fields.");
      // } else if (fieldErrors[errorType]) {
      //   form.setFields([{ name: fieldErrors[errorType], errors: [message] }]);
      // } else if (errorType === "EMAIL_NOT_VERIFIED") {
      //   toast.info("Check your email for the verification link.");
      // } else if (statusCode === 500) {
      //   toast.error("Server error.");
      // }
    }
    finally{
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleFieldChange = (changedValues) => {
    const changedField = Object.keys(changedValues)[0];
    form.setFields([{ name: changedField, errors: [] }]); // ✅ Clears error for that field
  };


  return (
    <div className="h-full mt-6">
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
        onValuesChange={handleFieldChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="flex flex-col gap-6 md:gap-4"
      >
        <StyledFormItem
          label="Email"
          name="email"
          rules={[{ validator: validateEmail }]}
        >
          <StyledFormInput
            disabled={isLoading}
            placeholder="Enter email address"
        
          />
        </StyledFormItem>
        <div className="flex flex-col gap-3 md:gap-2">
        <StyledFormItem
          label="Password"
          name="password"
          rules={[{ validator: validatePassword }]}
        >
          <StyledPasswordInput
            disabled={isLoading}
            placeholder="Enter your password"
          />
        </StyledFormItem>
        <Link to="/forgot-password" className={styles.forgot_password}>
          Forgot Password ?
        </Link>
        </div>
        <StyledFormItem>
          <StyledButton loading={isLoading} htmlType="submit" className="mt-0 md:mt-3">
            Login
          </StyledButton>
        </StyledFormItem>
      </StyledForm>
      <div className="flex flex-col gap-4 pt-4">
      <Divider
        plain
        style={{
          fontSize: "var(--sub-heading)",
          color: "#ccc",
          borderColor: "#c9c9c9",
          margin: "0px",
          fontFamily:"var(--font-public)"
        }}
      >
        or
      </Divider>
      <div className="flex flex-col gap-3 md:gap-2">
      
          <LoginWithGoogle buttonText="Continue with Google" className={`${styles.google_btn}`}/>
       
        <p className={`${styles.description} text-center`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={styles.create_now_text}>
            Register
          </NavLink>
        </p>
      </div>
      </div>
    </div>
  );
};

const NewLoginPage = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);



  return (
    <div
      className="w-screen h-screen"
      style={{ backgroundColor: "var(--color-white)" }}
    >
      <div className="w-full h-full p-5 md:p-0 md:w-1/2 flex justify-center items-center">
       <div>
          <div className="flex flex-col md:max-w-96 justify-center items-center gap-2">
            <img
              src={BrandImg}
              alt="brand-logo"
              className={`${styles.brand_img} text-center`}
            />
            <h1 className={styles.welcome_text}>Welcome to DocketPay</h1>
            <p className={styles.description}>
              Enter your credentials to continue.
            </p>
          </div>
          <div>
            <EmailLogin />
          </div>
        </div> 
      </div>
    </div>
  );
};

export default NewLoginPage;
