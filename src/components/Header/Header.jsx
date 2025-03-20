import React, { useState } from "react";
import styles from "./Header.module.css";

import { DatePicker, Form, Modal, Radio, Select } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import {
  StyledButton,
  StyledForm,
  StyledFormInput,
  StyledFormItem,
} from "../LoginPage/loginPage";

const TransModal = styled(Modal)`
  min-width: 200px !important;
  .ant-modal-title {
    background-color: var(--dropdown-bg);
    font-family: var(--font-public);
    font-size: var(--sub-heading);
    color: var(--color-black);
  }
  .ant-modal-body{
    padding-top:25px;
  }
  .ant-modal-content {
    padding: 15px;
    background-color: var(--dropdown-bg);
  }
  .ant-modal-close {
    color: var(--color-black);
    top: 10px;
  }
  .ant-modal-close:hover {
    background-color: transparent;
    color: var(--color-black);
  }
`;

// Global styles for styling the dropdown menu
const GlobalStyles = createGlobalStyle`
/* Target the dropdown menu */
.ant-select-dropdown {
  background-color: var(--dropdown-option-bg) !important;
  border-radius: 8px !important;
  box-shadow: none !important;
}

/* Style each option in the dropdown */
.ant-select-item {
  padding: 5px !important;
   font-family:var(--font-public);
    font-size:var(--main-para);
    font-weight:var(--font-weight400);
    color:var(--color-black) !important;
}

/* Hover effect for options */
.ant-select-item:hover {
  background-color: var(--dropdown-option-bg-hover) !important;
}

/* Style the selected option */
.ant-select-item-option-selected {
  background-color: transparent !important;
 font-family:var(--font-public);
    font-size:var(--main-para);
    font-weight:var(--font-weight400);
    color:var(--color-black) !important;
}
`;

const StyledSelect = styled(Select)`
  width: 100%;
  height: var(--input-field-height);
  .ant-select-selection-placeholder {
    font-family: var(--font-public);
    font-size: var(--main-para);
    font-weight: var(--font-weight400);
    color: var(--color-black);
  }

  .ant-select-selector {
    background-color: var(--input-bg) !important;
    border-radius: 5px; // Rounded corners
    padding: 8px !important; /* Padding inside selector */
    font-family: var(--font-public);
    font-size: var(--main-para);
    color: var(--color-black) !important;
    box-shadow: unset !important;
    border-color: #c9c9c9 !important;
    &:hover {
      border-color: #c9c9c9 !important; // Darker green on hover
    }
  }

  .ant-select-arrow {
    color: var(--color-black) !important; /* Customize dropdown arrow color */
  }
  .ant-select-selection-item {
    color: var(--color-black) !important;
  }
`;

const CustomRadio = styled(Radio)`
  font-family: var(--font-public);
  font-size: var(--sub-heading);
  font-weight: var(--font-weight400);
  color: var(--color-black);
  .ant-radio-inner {
    width: 15px !important; /* Increase the radio button size */
    height: 15px !important;
    border: 2px solid none !important; /* Change the default border color */
  }

  /* When the radio is selected */
  .ant-radio-checked .ant-radio-inner {
    border-color: #ff4d4f !important; /* Change the border color when selected */
    background-color: #ff4d4f !important; /* Change background when selected */
  }

  /* Style the radio dot inside */
  .ant-radio-inner::after {
    width: 10px !important;
    height: 10px !important;
    background-color: white !important;
  }

  /* Disabled radio button */
  .ant-radio-disabled .ant-radio-inner {
    background-color: red !important;
    border-color: red !important;
  }

  /* Disabled radio checked */
  .ant-radio-disabled.ant-radio-checked .ant-radio-inner {
    background-color: red !important;
    border-color: red !important;
  }
`;

// ✅ Global Styles for DatePicker Dropdown (since it's in a portal)
const DatePickerGlobalStyles = createGlobalStyle`

  /* Customizing the Date Picker Dropdown */
  .ant-picker-dropdown {
    background-color: green !important; /* Light gray background */
    border-radius: 8px !important;
  }

  .ant-picker-panel-container{
     background-color: var(--dropdown-option-bg) !important;
  }

  .ant-picker-header button{
    color:var(--color-black) !important;
  }

  .ant-picker-content thead tr th{
    color:var(--color-black) !important;
  }

   .ant-picker-cell-in-view {
    opacity: 1 !important;     
     font-family: var(--font-public);
  font-size: var(--main-para);
  font-weight: var(--font-weight400);
  color: var(--color-black) !important;       /* Reduce opacity */
  }

 
  /* Styling Date Cells */
  .ant-picker-cell {
     color: var(--color-black) !important;  /* Change hover color to red */
    opacity: 0.5;
  }

  .ant-picker-cell:hover {
    background-color: none !important;
  }

  /* Selected Date */
  .ant-picker-cell-selected .ant-picker-cell-inner {
    background-color: var(--color-blue) !important;
    color: white !important;
  }

  /* Today’s Date */
  .ant-picker-today .ant-picker-cell-inner {
    border: 1px solid #1890ff !important;
  }

  .ant-picker-now-btn{
   font-family: var(--font-public);
  font-size: var(--main-para);
  font-weight: var(--font-weight400);
  color: var(--color-black) !important; 
  }
`;

// ✅ Styled DatePicker
const StyledDatePicker = styled(DatePicker)`
  background-color: var(--input-bg) !important;
  padding: 4px 11px !important;
  height: var(--input-field-height);
  font-family: var(--font-public);
  font-size: var(--main-para);
  font-weight: var(--font-weight400);
  color: var(--color-black);
  box-shadow: none !important;
  border-color: #c9c9c9 !important;
  &:hover {
    border-color: #c9c9c9 !important;
  }
 

  .ant-picker-input > input {
    font-family: var(--font-public);
    font-size: var(--main-para);
    font-weight: var(--font-weight400);
    color: var(--color-black);
  }

  /* Change placeholder color */
  .ant-picker-input > input::placeholder {
    font-family: var(--font-public);
    font-size: var(--main-para);
    font-weight: var(--font-weight400);
    color: var(--color-black);
  }

  /* Change calendar icon color */
  .ant-picker-suffix {
    color: var(--color-black) !important;
  }
    .ant-picker-clear{color: var(--color-black) !important;}
`;


const AddTransactionModal=({isOpen,onClose})=>{

  const [form] = Form.useForm();

  const [selectedRadio, setOnSelectRadio] = useState();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    console.log(values);
  };


  const validateTransName = (_, value) => {
    // Regular expression to match only letters and spaces
    const nameRegex = /^[A-Za-z\s]*$/;

    if (!value) {
        return Promise.reject(new Error("Required"));
      }

    if (!nameRegex.test(value)) {
      return Promise.reject(new Error('Name must contain only letters and spaces!'));
    }

    if (value.length > 30) {
      return Promise.reject(new Error('Name must be at most 30 characters!'));
    }

    return Promise.resolve(); // Valid input
  };

  return(
    <TransModal
    title="Add Transaction"
    open={isOpen}
    footer={false}
    onCancel={onClose}
  >
    <div>
      <StyledForm
        form={form}
        name="addTransForm"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="flex flex-col gap-6 md:gap-3"
      >
        <StyledFormItem label="Transaction Name" name="transactionName" rules={[{ validator: validateTransName }]}>
          <StyledFormInput placeholder="Enter Transaction Name"   />
        </StyledFormItem>

        <StyledFormItem label="Transaction Type">
          <GlobalStyles />
          <StyledSelect placeholder="Select Transaction Type">
            <Select.Option value="credit">Credit</Select.Option>
            <Select.Option value="debit">Debit</Select.Option>
          </StyledSelect>
        </StyledFormItem>
        <StyledFormItem label="Category">
          <StyledSelect placeholder="Select Category">
            <Select.Option value="lend">Lending</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
          </StyledSelect>
        </StyledFormItem>

        <StyledFormItem label="Amount" name="amount">
          <StyledFormInput placeholder="Enter amount" />
        </StyledFormItem>

        <div className="flex flex-row gap-3 justify-between items-center w-full">
          <DatePickerGlobalStyles />
          <div className="w-1/2">
            <StyledFormItem label="Start Date" name="startDate" >
              <StyledDatePicker className="w-full" placeholder="Select Start Date" />
            </StyledFormItem>
          </div>

          <div className="w-1/2">
            <StyledFormItem label="End Date" name="endDate">
              <StyledDatePicker className="w-full" placeholder="Select End Date" />
            </StyledFormItem>
          </div>
        </div>

        <StyledFormItem label="Transaction Beneficiary" name="transactionType">
          <Radio.Group
        
            value={selectedRadio}
            onChange={(e) => setOnSelectRadio(e.target.value)}
          >
            <CustomRadio value="self"> Self</CustomRadio>
            <CustomRadio value="thirdParty"> Third Party </CustomRadio>
          </Radio.Group>
        </StyledFormItem>

        {selectedRadio === "thirdParty" && (
          <div>
            <StyledFormItem label="Email" name="email">
              <StyledFormInput
                placeholder="Enter email address"
                autoComplete="off"
              />
            </StyledFormItem>
          </div>
        )}
         <StyledFormItem>
        <StyledButton  htmlType="submit">Save</StyledButton>
        </StyledFormItem>
      </StyledForm>
    </div>
  </TransModal>
  )
}


const Header = ({ routeName }) => {
  const [addTransaction, setAddTransaction] = useState(false);
  return (
    <React.Fragment>
      <div className={`${styles.header} h-16 p-4`}>
        <div className="w-full flex justify-between items-center">
          <h1 className={styles.header_text}>{routeName}</h1>
          <button
            className={styles.add_trans_btn}
            onClick={() => setAddTransaction(true)}
          >
            + Add
          </button>
        </div>
      </div>
      {addTransaction && <AddTransactionModal isOpen={addTransaction} onClose={() => setAddTransaction(false)}/> }
    </React.Fragment>
  );
};

export default Header;
