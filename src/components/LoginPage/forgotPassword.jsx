import styles from "./loginPage.module.css";

import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate,useLocation } from "react-router-dom";
import BrandImg from "../../assets/brand_img.png";
import { Input, Form, Button, message } from "antd";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { StyledForm, StyledFormInput, StyledFormItem, StyledPasswordInput,StyledButton } from "./loginPage";
import { useState, useEffect,useContext, createContext } from "react";


const CurrentUser = createContext();

const EnterOtp = () => {
  const [otp, setOtp] = useState(""); // State to store OTP
  const [error, setError] = useState(""); // State for validation error
  const [timer, setTimer] = useState(10); // Timer state
  const [isResendDisabled, setIsResendDisabled] = useState(false); // Resend button state
  const [isLoading,setIsLoading] = useState(false);

  const {currentUser,handleSteps} = useContext(CurrentUser);


  // Timer logic
  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setIsResendDisabled(false); // Enable the resend button
            return 10; // Reset timer for the next resend
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isResendDisabled]);

  const navigate = useNavigate();

  const validateOtp = () => {
    const otpLength = 6; // Expected OTP length
    const isNumeric = /^\d+$/; // Regex for numeric characters

    if (!otp) {
      setError("OTP is required.");
      return false;
    }
    if (otp.length !== otpLength) {
      setError(`OTP must be exactly ${otpLength} digits.`);
      return false;
    }
    if (!isNumeric.test(otp)) {
      setError("OTP must contain only numeric characters.");
      return false;
    }
    setError("");
    return true;
  };

  const location = useLocation()


  const handleViewOtp = async () => {
    if (!validateOtp()) return;
  
    const userEmail = location?.state?.email;
    const reqData = {
      email: currentUser.currentUser,
      otp,
      ...(userEmail && { sendToken: !!userEmail }),
    };
  
    setIsLoading(true);
  
    try {
      const response = await axiosInstance.post("/verify-otp", reqData);
      const { success, message: responseMessage, token } = response?.data || {};
  
      if (success) {
        message.success(responseMessage, 3);
        if (token) {
          localStorage.setItem("token", token);
          setTimeout(() => navigate("/dashboard"), 2000);
        } else {
          handleSteps();
        }
      } else {
        message.error("OTP verification failed");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/send-otp", {
        email: currentUser.currentUser,
      });
  
      message.success("OTP resent!");
      setIsResendDisabled(true); // Disable the resend button
      setTimer(10); // Reset the timer
    } catch (error) {
      const errorMessage =
        error.response?.data?.errorMessage || "An error occurred";
  
      if (error.response?.status === 400) {
        setError(errorMessage);
        setIsResendDisabled(true);
      } else {
        message.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };
  



  const onInput = (value) => {
    const string = value.join("")
    setOtp(string)
    setError("")
  };

  const sharedProps = {
    onInput,
  };


  return (
    <div className="flex flex-col md:max-w-80 lg:max-w-96 justify-center items-center gap-2">
      <h1 className={styles.welcome_text}>Check your email</h1>
      <p className={`${styles.description} text-center`}>
        We sent an OTP to your email. Please enter to proceed furthur
      </p>
      <Input.OTP length={6} {...sharedProps} disabled={isLoading} />
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
              <StyledButton loading={isLoading}
                htmlType="button"
                onClick={handleViewOtp}
              >
                {" "}
                Submit OTP
              </StyledButton>
      <p className={`${styles.description} text-center mt-5`}>
        Didn't receive OTP?{" "}
        {isResendDisabled ? (
          <span className={styles.create_now_text}>Resend in {timer}s</span>
        ) : (
          <span onClick={handleResendOtp} className={styles.create_now_text}>
            Resend
          </span>
        )}
      </p>
    </div>
  );
};


const UpdatePassword=()=>{

  const [form] = Form.useForm();
  const {currentUser,handleSteps} = useContext(CurrentUser);
  const [isLoading, setIsLoading] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/update-password", {
        email: currentUser.currentUser,
        newPassword: values.password,
      });
      message.success(response.data?.message || "Password updated successfully!");
      handleSteps();
    } catch (error) {
      const errorMessage = error.response?.data?.errorMessage || "An error occurred";
  
      if (error.response?.status === 404) {
        form.setFields([{ name: "password", errors: [errorMessage] }]);
      } else {
        message.error(errorMessage);
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
  )
}

const SuccessfulReset=()=>{

  const navigate = useNavigate()
  const handleBacktoLogin=()=>{
    navigate("/login")
  }
  return(
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
  )
}

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const [currentUser,setCurrentUser] = useState([]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  const onFinish = async(values) => {
    try{
      setIsLoading(true)
      const response = await axiosInstance.post("/send-otp",{email:values.email})
      console.log(response)
      if(response.status === 200){
        setIsLoading(false)
        message.success("OTP resent !");
        setCurrentUser({currentUser:values.email})
        setCurrentStep(2);
        setIsLoading(false)
      }

    }
    catch(error){
      setIsLoading(false)
      if (error.response) {
        const { status, data } = error.response;
        const errorMessage = data?.errorMessage || "An error occurred";
           // Define a common function to set error for form fields
           const setFieldError = (fieldName, message) => {
            form.setFields([
              {
                name: fieldName,
                errors: [message],
              },
            ]);
          };
          if (status === 404) {
            setFieldError("email", errorMessage);
          }
          else if (status === 500 || status === 400) {
           message.error(errorMessage)
          }
      }
    }
  };


  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!value) {
      return Promise.reject(new Error("Email is required"));
    } else if (!emailRegex.test(value)) {
      return Promise.reject(new Error("Please enter a valid email address"));
    }
    return Promise.resolve();
  };
  // Function to update state
  const handleSteps = () => {
    setCurrentStep(prevCount => prevCount + 1);
  };

  const location = useLocation();
  useEffect(()=>{
    if(location?.state?.email){
      setCurrentStep(2)
      setCurrentUser({currentUser:location?.state?.email})
    }
    document.title = "Forgot Password"
  },[])

  return (

    <div className="w-screen h-screen" style={{backgroundColor:"var(--color-white)"}}>
      <CurrentUser.Provider value={{currentUser,handleSteps}}> 
      <div className="w-full h-full p-5 md:p-0 md:w-1/2 border md:flex justify-center items-center">
      
      <div>
        {currentStep === 1 && (
          <div>
            <div className="flex flex-col md:max-w-80 lg:max-w-96 justify-center items-center gap-2">
              <h1 className={styles.welcome_text}>Forgot Password</h1>
              <p className={`${styles.description} text-center`}>
                No worries! Enter your associated email address below, and we'll
                send you an OTP to reset your password.
              </p>
            </div>
            <div className="h-full mt-8">
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
                  label="Email"
                  name="email"
                  rules={[{ validator: validateEmail }]}
                >
                  <StyledFormInput placeholder="Enter your email address" disabled={isLoading} />
                </StyledFormItem>
                <StyledFormItem>
                <StyledButton loading={isLoading}
              
              htmlType="submit"
            >
             Send OTP
            </StyledButton>
                </StyledFormItem>
              </StyledForm>
            </div>
          </div>
        )}

        {currentStep === 2 && <EnterOtp />}
        {currentStep === 3 && <UpdatePassword />}
        {currentStep === 4 && <SuccessfulReset />}
        </div>
      </div>
      </CurrentUser.Provider>
    </div>
  );
};

export default ForgotPassword;
