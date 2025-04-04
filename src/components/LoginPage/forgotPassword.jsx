import styles from "./loginPage.module.css";

import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig/axiosConfig";
import {
  StyledButton,
  StyledForm,
  StyledFormInput,
  StyledFormItem,
} from "./loginPage";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [isLinkSent, setOnSentLink] = useState(
    sessionStorage.getItem("isLinkSent") ?? false
  );

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/user/forgot-password", {
        email: values.email,
      });
      sessionStorage.setItem("userEmail", values?.email);
      sessionStorage.setItem("isLinkSent", true);
      // dispatch(updateUserInfo({ email: values.email }));
      setIsLoading(false);
      setOnSentLink(true);
      toast.info(response.data.message);
    } catch (error) {

       if (!error.response) {
              return toast.error("Network error.");
            }

        const { statusCode, errorType, message } = error.response.data;

        const fieldErrors = {
          INVALID_EMAIL: "email",
          USER_NOT_FOUND: "email",
        };

        if (fieldErrors[errorType]) {
          form.setFields([{ name: fieldErrors[errorType], errors: [message] }]);
        } else if (statusCode === 500 && errorType === "EMAIL_SENDING_FAILED") {
          toast.error(message);
        } else if (statusCode === 500 && errorType === "SERVER_ERROR") {
          toast.error(message);
        }
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    document.title = "Forgot Password";
    return () => sessionStorage.removeItem("isLinkSent");
  }, []);

  function maskEmail(email) {
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) {
      return "*".repeat(localPart.length) + "@" + domain;
    }
    return (
      localPart.slice(0, 3) + "*".repeat(localPart.length - 3) + "@" + domain
    );
  }

  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen"
      style={{ backgroundColor: "var(--color-white)" }}
    >
      {isLinkSent ? (
        <div className="w-full h-full p-5  flex flex-col md:p-0 md:w-1/2 justify-center items-center">
          <div className="flex flex-col md:max-w-80 lg:max-w-96 justify-center items-center gap-2">
            <h1 className={`${styles.welcome_text} text-center`}>
              Reset Instructions have been sent to your mail !
            </h1>
            <p className={`${styles.description} text-center`}>
              If you encounter any issues, please contact support team
            </p>
            <button
              className="w-full h-9 mt-5 border rounded-lg text-white bg-black flex items-center justify-center gap-2"
              type="submit"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col p-5 md:p-0 md:w-1/2 justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:max-w-80 lg:max-w-96 justify-center items-center gap-2">
              <h1 className={styles.welcome_text}>Forgot Password</h1>
              <p className={`${styles.description} text-center`}>
                No worries! Enter your associated email address below, and we'll
                send you a link to reset your password.
              </p>
            </div>
            <div className="mt-8 w-full">
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
                className="flex flex-col gap-6"
              >
                <StyledFormItem
                  label="Email"
                  name="email"
                  rules={[{ validator: validateEmail }]}
                >
                  <StyledFormInput
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </StyledFormItem>
                <StyledFormItem>
                  <StyledButton loading={isLoading} htmlType="submit">
                    Send Link
                  </StyledButton>
                </StyledFormItem>
              </StyledForm>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
