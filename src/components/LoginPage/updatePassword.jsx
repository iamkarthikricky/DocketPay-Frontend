import { Form } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { StyledButton, StyledForm, StyledFormItem, StyledPasswordInput } from "./loginPage";
import styles from './loginPage.module.css';

export const UpdatePassword=()=>{

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
  
  
    const {token} = useParams()

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  
    const onFinish = async (values) => {
      setIsLoading(true);
      try {
        await axiosInstance.post(`/user/reset-password/${token}`, {
          newPassword: values.password,
        });
        
        toast.success("Password Reset Successful")
        navigate("/login")
    
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
    
        if (error.response?.status === 400) {
          form.setFields([{ name: "password", errors: [errorMessage] }]);
        } else {
          toast.error(errorMessage)
        }
      } finally {
        setIsLoading(false);
      }
    };
    
  
    const validatePassword = (_, value) => {
      const minLength = 8;
      const maxLength = 20;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
      if (!value) {
        return Promise.reject(new Error("Password is required."));
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
              return Promise.reject(new Error("Please confirm your password."));
            }
            if (value !== password) {
              return Promise.reject(new Error("Passwords do not match."));
            }
            return Promise.resolve();
        };

  
    return(
        <div className="w-screen h-screen" style={{backgroundColor:"var(--color-white)"}}>
  
        <div className="w-full h-full p-5 md:p-0 md:w-1/2 border md:flex justify-center items-center">
        
      <div className="flex flex-col md:max-w-80 lg:max-w-96 justify-center items-center gap-2" style={{backgroundColor:"var(--color-white)"}}>
      <h1 className={styles.welcome_text}>Create a New Password</h1>
      <p className={`${styles.description} text-center`}>
        Enter your new password below  to complete the reset process
      </p>
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
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
                <StyledFormItem
                      label="Password"
                        name="password"
                        rules={[{ validator: validatePassword }]}
                      >
                        <StyledPasswordInput placeholder="Enter your password" disabled={isLoading} />
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
                        <StyledPasswordInput placeholder="Repeat your password" disabled={isLoading} />
                      </StyledFormItem>
                      <StyledFormItem>
                      <StyledButton loading={isLoading}
                
                htmlType="submit">
                                     Submit
                                   </StyledButton>
                                 </StyledFormItem>
          </StyledForm>
      </div>
      </div>
      </div>
      </div>
    )
  }


export const SuccessfulReset=()=>{

  const navigate = useNavigate()
  const handleBacktoLogin=()=>{
    navigate("/login")
  }
  return(
    <div className="w-screen h-screen" style={{backgroundColor:"var(--color-white)"}}>
  
        <div className="w-full h-full p-5 md:p-0 md:w-1/2 border md:flex justify-center items-center">
        
    <div className="flex flex-col md:max-w-80 lg:max-w-96 justify-center items-center gap-2">
    <h1 className={`${styles.welcome_text} text-center`}>Your password has been successfully reset!</h1>
    <p className={`${styles.description} text-center`}>
      You can now login with your new password. If you encounter any issues, please contact support team
    </p>
    <button
                                   className="w-full h-9 mt-5 border rounded-lg text-white bg-black flex items-center justify-center gap-2"
                                   type="submit"
                                   onClick={handleBacktoLogin}
                                 >
                                   Back to Login
                                 </button>
    </div>
    </div>
    </div>
  )
}