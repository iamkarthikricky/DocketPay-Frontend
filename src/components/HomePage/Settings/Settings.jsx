import React from 'react'
import styles from './Settings.module.css';
import { StyledForm,StyledFormInput,StyledFormItem } from '../../LoginPage/loginPage';
import { Form } from 'antd';

function Settings() {
    const [form] = Form.useForm();

    const onFinish=(values)=>{
      console.log(values)
    }

    const onFinishFailed=(values)=>{
      console.log(values)
    }
  
  return (
    <div>
       <div className='bg-black mb-5 '></div>
    <div className={styles.profile_container}>
     
     <div className={styles.user_img}></div>
      <StyledForm form={form}   name="userForm"
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
            onFinishFailed={onFinishFailed}>

              <StyledFormItem
                              label="Email"
                            name="email"
            
                          >
                            <StyledFormInput placeholder="Enter email address" />
                          </StyledFormItem>
            </StyledForm>
    </div>
    </div>
  )
}

export default Settings
