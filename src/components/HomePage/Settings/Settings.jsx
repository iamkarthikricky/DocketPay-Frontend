import React, { useState } from "react";
import styles from "./Settings.module.css";
import {
  StyledButton,
  StyledForm,
  StyledFormInput,
  StyledFormItem,
  StyledPasswordInput
} from "../../LoginPage/loginPage";

import modalStyles from "../../SideBarNew/sidebar.module.css";
import { Form } from "antd";

import {StyledLogoutModal} from '../../SideBarNew/sidebar';
import axiosInstance from "../../../axiosConfig/axiosConfig";
import { toast } from "react-toastify";

const UpdatePassword=({isOpen,onCancel})=>{
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async(values) => {
    setIsLoading(true)
    try{
      await axiosInstance.post("/update-password",{newPassword:values.newPassword})
      toast.info("Password Updated !")
      onCancel()
    }catch(error){
      setIsLoading(false)

      if (error.response) {
        const { statusCode, errorType, message } = error.response.data;
    
          if (statusCode === 400 && errorType === "PASSWORD_REQUIRED") {
                  toast.error(message);
          }
        
      else if (statusCode === 404 && errorType === "USER_NOT_FOUND") {
        toast.warn(message)
  }
  else if (statusCode === 400 && errorType === "SAME_PASSWORD") {
    toast.warn(message)
   
}
  else if (statusCode === 500) {
            toast.error("Server error.");
          }
 
    }
    else {
      toast.error("Network error.");
    }
  };
  }
  const onFinishFailed = (values) => {
    console.log(values);
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

        const password = form.getFieldValue("newPassword");
          if (!value) {
            return Promise.reject(new Error("Please confirm your password."));
          }
          if (value !== password) {
            return Promise.reject(new Error("Passwords do not match."));
          }
          return Promise.resolve();
      };


  return(
    <StyledLogoutModal open={isOpen} onOk={onCancel} footer={false} onCancel={onCancel}>
       
    <StyledForm
               form={form}
               name="updatePasswordForm"
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
         
               className="flex flex-col gap-6 md:gap-4"
             >
                   <StyledFormItem
                         label="New Password"
                           name="newPassword"
                           rules={[{ validator: validatePassword }]}
                         >
                           <StyledPasswordInput placeholder="Enter your password" disabled={isLoading} />
                         </StyledFormItem>
                         <StyledFormItem
                         label="Repeat New Password"
                           name="repeatNewPassword"
                           
                       rules={[
                         {
                           validator: validateConfirmPassword,
                         },
                       ]}
                         >
                           <StyledPasswordInput placeholder="Repeat your password" disabled={isLoading} />
                         </StyledFormItem>
                        <div className="flex w-full gap-3 justify-end ">
                        <button
       className={modalStyles.logout_yes}
       type="submit"
     >
       Update
     </button>
                                                          <button
       className={modalStyles.logout_no}
       onClick={onCancel}
     >
       Cancel
     </button>
                                    </div>
             </StyledForm>
             </StyledLogoutModal>
  )
}

function Settings() {
  const [form] = Form.useForm();

  const [updateProfile, setUpdateProfile] = useState(false);
  const [onChangePassword,setOnChangePassword] = useState(false);

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (values) => {
    console.log(values);
  };

  return (
    <div className="pt-5 flex flex-col w-full">
      <div className={`${styles.profile_container} flex flex-col  gap-4`}>
        <div className={` flex flex-col md:flex-row md:items-start gap-3`}>
          <div className="flex justify-center">
            <div className={styles.user_img}></div>
          </div>

          <div className="flex max-w-4xl flex-grow-1">
            <StyledForm
              form={form}
              name="userForm"
              initialValues={{
                name: "Maheshwarapu",
                email: "iamkarthikricky@gmail.com",
                userPassword:"***********"
              }}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="flex flex-col gap-9 md:gap-4"
            >
              <div className="flex flex-col gap-6 md:gap-4 w-full">
                <div className="flex flex-col md:flex-row gap-6 md:gap-4 w-full">
                  <div className="w-full">
                    <StyledFormItem label="Your Name" name="name">
                      <StyledFormInput
                        placeholder="Enter your name"
                        disabled={!updateProfile}
                      />
                    </StyledFormItem>
                  </div>
                  <div className="w-full">
                    <StyledFormItem label="Email" name="email">
                      <StyledFormInput
                        placeholder="Enter email address"
                        disabled
                      />
                    </StyledFormItem>
                  </div>
                 
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-4 w-full">
                  <div className="w-full">
                    <StyledFormItem label="Address" name="address">
                      <StyledFormInput
                        placeholder="Enter your address"
                        disabled={!updateProfile}
                      />
                    </StyledFormItem>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-4 w-full">
                <div className="max-w-2xs flex flex-col gap-3 md:gap-2">
                    <StyledFormItem label="Password" name="userPassword">
                      <StyledFormInput
                        placeholder="Enter password address"
                        disabled
                      />
                    </StyledFormItem>
                    <span onClick={()=>setOnChangePassword(true)} className={styles.change_password_text} style={{cursor:"pointer"}}>Change</span>
                  </div>
                  </div>
              </div>
            </StyledForm>
          </div>
        </div>

        <div className="flex w-full justify-end">
          {updateProfile ? (
            <div className="flex gap-2">
              {" "}
              <button className={modalStyles.logout_yes}>Save</button>
              <button
                className={modalStyles.logout_no}
                onClick={() => setUpdateProfile(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
             
            <button
              className={modalStyles.logout_yes}
              onClick={() => setUpdateProfile(true)}
            >
              Edit
            </button>
            </div>
          )}
        </div>
      </div>
      {onChangePassword && <UpdatePassword isOpen={onChangePassword} onCancel={()=>setOnChangePassword(false)}/>}
    
    </div>
  );
}

export default Settings;
