import React, { useState } from "react";
import styles from "./Header.module.css";

import modalStyles from '../SideBarNew/sidebar.module.css';
import {
  DatePicker,
  Form,
  Modal,
  Radio,
  Checkbox,
  Skeleton,
  Select,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import styled, { createGlobalStyle } from "styled-components";
import {
  StyledButton,
  StyledForm,
  StyledFormInput,
  StyledFormItem,
} from "../LoginPage/loginPage";

import { FaRegCircleQuestion } from "react-icons/fa6";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { toast } from "react-toastify";

const TransModal = styled(Modal)`
  min-width: 200px !important;
  .ant-modal-title {
    background-color: var(--dropdown-bg);
    font-family: var(--font-public);
    font-size: var(--sub-heading);
    color: var(--color-black);
  }
  .ant-modal-body {
    padding-top: 25px;
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
 .ant-select-status-error{
    border-color:#ff4d4f;
  }
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
    border-color: inherit !important;
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
    .ant-picker-status-error{
    border-color:#ff4d4f !important;
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

  .ant-picker-header-super-next-btn{
    display:none !important;
  }
    .ant-picker-header-super-prev-btn{
    display:none !important;
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
   .ant-picker-cell-disabled {
   
    color: var(--color-black) !important;  /* Change hover color to red */
    opacity: 0.5 !important;
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
  border-color: #c9c9c9 ;
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
    color: var(--color-black) !important;
  }

  /* Change calendar icon color */
  .ant-picker-suffix {
    color: var(--color-black) !important;
  }
  .ant-picker-clear {
    color: var(--color-black) !important;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    width: 15px; /* Change checkbox size */
    height: 15px;
    border-radius: 4px; /* Make it slightly rounded */
    background-color: #f0f0f0; /* Custom background color */
  }

  .ant-checkbox-label {
    font-family: var(--font-public);
    font-size: var(--sub-heading);
    font-weight: var(--font-weight400);
    color: var(--color-black);
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1890ff; /* Change color when checked */
    border-color: none;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: white; /* Change tick color */
  }

  /* Customize hover effect */
  &:hover .ant-checkbox-inner {
    border-color: #40a9ff;
  }
`;

const AddTransactionModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const [selectedRadio, setOnSelectRadio] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  console.log(form.getFieldValue("reminder"))

  const onFinish = async (values) => {
    const reqBody = {
      transactionName: values.transactionName,
      transactionType: values.transactionType,
      transactionCategory: values.transactionCategory,
      transactionAmount: Number(values.transactionAmount),
      transactionStartDate: values.transactionStartDate,
      transactionEndDate: values.transactionEndDate,
      reminder: values.reminder,
      transactionRecipientType: values.transactionRecipientType,
      ...(values.transactionRecipientType === "thirdParty" && {
        thirdPartyEmail: values.thirdPartyEmail,
      }),
    };

    setIsLoading(true);
    try {
      await axiosInstance.post("/user/add-transaction", reqBody);
      form.resetFields();
      toast.success("Transaction Added")
      onClose()
    } catch (error) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        // Map backend errors to Ant Design Form
        const errorFields = backendErrors.map(({ field, message }) => ({
          name: field,
          errors: [message],
        }));
        form.setFields(errorFields); // Set form errors dynamically
      } else {
        toast.error("Something went wrong! Please try again.");
         // 🔥 Ensure form values persist even on generic errors
       
         form.setFieldsValue(values);
      }
    } finally {
      setIsLoading(false);
      
    }
  };

  const validateTransName = (_, value) => {
    // Regular expression to match only letters and spaces
    const nameRegex = /^[A-Za-z\s]*$/;
    if (!value) {
      return Promise.reject(new Error("Required"));
    }

    if (!nameRegex.test(value)) {
      return Promise.reject(
        new Error("Name must contain only letters and spaces!")
      );
    }

    if (value.length > 30) {
      return Promise.reject(new Error("Name must be at most 30 characters!"));
    }

    return Promise.resolve(); // Valid input
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

  const handleFieldChange = (changedValues) => {
    const changedField = Object.keys(changedValues)[0];
    form.setFields([{ name: changedField, errors: [] }]); // ✅ Clears error for that field
  };

  const skeletonStyle = {
    width: "30%",
    height: 16,
    backgroundColor: "var(--skeleton-bg)",
  };
  const inputSkeletonStyle = {
    width: "100%",
    backgroundColor: "var(--skeleton-bg)",
  };



  return (
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
          onValuesChange={handleFieldChange}
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
          <GlobalStyles />
          <StyledFormItem
            label={
              isLoading ? (
                <Skeleton.Input active size="small" style={skeletonStyle} />
              ) : (
                "Transaction Name"
              )
            }
            name="transactionName"
            rules={[{ validator: validateTransName }]}
          >
            {isLoading ? (
              <Skeleton.Input
                active
                size="default"
                block
                style={inputSkeletonStyle}
              />
            ) : (
              <StyledFormInput placeholder="Enter Transaction Name" />
            )}
          </StyledFormItem>

          <StyledFormItem
          label={
            isLoading ? (
              <Skeleton.Input active size="small" style={skeletonStyle} />
            ) : (
              "Transaction Type"
            )
          }
            name="transactionType"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
             {isLoading ? (
              <Skeleton.Input
                active
                size="default"
                block
                style={inputSkeletonStyle}
              />
            ) : <StyledSelect placeholder="Select Transaction Type">
              <Select.Option value="credit">Credit</Select.Option>
              <Select.Option value="debit">Debit</Select.Option>
            </StyledSelect> }
          </StyledFormItem>

          <StyledFormItem
          label={
            isLoading ? (
              <Skeleton.Input active size="small" style={skeletonStyle} />
            ) : (
              "Category"
            )
          }
            name="transactionCategory"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
             {isLoading ? (
              <Skeleton.Input
                active
                size="default"
                block
                style={inputSkeletonStyle}
              />
            ) : <StyledSelect placeholder="Select Category">
              <Select.Option value="lend">Lending</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
            </StyledSelect> }
          </StyledFormItem>

          <StyledFormItem
            label={
              isLoading ? (
                <Skeleton.Input active size="small" style={skeletonStyle} />
              ) : (
                "Amount"
              )
            }
            name="transactionAmount"
            rules={[
              { required: true, message: "Please enter an amount!" },
              {
                pattern: /^\d{1,8}(\.\d{0,2})?$/,
                message: "Max 8 digits with 2 decimal places only!",
              },
            ]}
            normalize={(value) => {
              if (!value) return value; // Allow empty value
              return (
                value
                  .replace(/[^0-9.]/g, "") // Allow only numbers & dot
                  .replace(/^0+(\d)/, "$1") // Remove leading zeros
                  .match(/^(\d{0,8})(\.?)(\d{0,2})?/g)?.[0] || ""
              ); // Enforce 7 digits before decimal, 2 after
            }}
          >
               {isLoading ? (
              <Skeleton.Input
                active
                size="default"
                block
                style={inputSkeletonStyle}
              />
            ) : <StyledFormInput placeholder="Enter amount" /> }
          </StyledFormItem>

          <div className="flex flex-row gap-3 justify-between items-center w-full">
            <DatePickerGlobalStyles />
            <div className="w-1/2">
              <StyledFormItem
                label={
                  isLoading ? (
                    <Skeleton.Input active size="small" style={skeletonStyle} />
                  ) : (
                    "Start Date"
                  )
                }
                name="transactionStartDate"
                rules={[
                  { required: true, message: "Please select a start date!" },
                ]}
              >
                  {isLoading ? (
              <Skeleton.Input
                active
                size="default"
                block
                style={inputSkeletonStyle}
              />
            ) : <StyledDatePicker
                  className="w-full"
                  placeholder="Select Start Date"
                  mode="date"
                  disabledDate={(current) => {
                    const today = dayjs();
                    return (
                      current.isBefore(today.subtract(3, "days"), "day") ||
                      current.isAfter(today.add(90, "days"), "day")
                    );
                  }}
                  onChange={(date) => {
                    const endDate = form.getFieldValue("endDate");

                    // Reset End Date if it's before new Start Date
                    if (endDate && date && date.isAfter(endDate, "day")) {
                      form.setFieldsValue({ endDate: null });
                    }
                  }}
                  onPanelChange={(value, mode) => {
                    if (mode === "year" || mode === "month") {
                      // Prevent switching to year or month panel
                      return;
                    }
                  }}
                /> }
              </StyledFormItem>
            </div>

            <div className="w-1/2">
              <StyledFormItem
                 label={
                  isLoading ? (
                    <Skeleton.Input active size="small" style={skeletonStyle} />
                  ) : (
                    "End Date"
                  )
                }
                name="transactionEndDate"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue("reminder")) {
                        if (!value) {
                          return Promise.reject(
                            new Error("Please select an end date!")
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                {isLoading ? (
              <Skeleton.Input
                active
                size="default"
                block
                style={inputSkeletonStyle}
              />
            ) : <StyledDatePicker
                  className="w-full"
                  placeholder="Select End Date"
                  mode="date"
                  disabledDate={(current) => {
                    const start = form.getFieldValue("transactionStartDate");
                    if (!start) return true; // Disable until Start Date is selected
                    return (
                      current.isBefore(start, "day") ||
                      current.isAfter(dayjs().add(90, "days"), "day")
                    );
                  }}
                  onPanelChange={(value, mode) => {
                    if (mode === "year" || mode === "month") {
                      // Prevent switching to year or month panel
                      return;
                    }
                  }}
                /> }
              </StyledFormItem>
            </div>
          </div>

          <StyledFormItem
           label={
            isLoading ? (
              <Skeleton.Input active size="small" style={skeletonStyle} />
            ) : (
              "Transaction Beneficiary"
            )
          }
          
            name="transactionRecipientType"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
            {isLoading ? (
              <Skeleton.Input
                active
                size="default"
                block
                style={inputSkeletonStyle}
              />
            ) : <Radio.Group
              value={selectedRadio}
              onChange={(e) => setOnSelectRadio(e.target.value)}
            >
              <CustomRadio value="self"> Self</CustomRadio>
              <CustomRadio value="thirdParty"> Third Party </CustomRadio>
            </Radio.Group> }
          </StyledFormItem>

          {selectedRadio === "thirdParty" && (
            <div>
              <StyledFormItem
                 label={
                  isLoading ? (
                    <Skeleton.Input active size="small" style={skeletonStyle} />
                  ) : (
                    "Email"
                  )
                }
                
                name="thirdPartyEmail"
                rules={[{ validator: validateEmail }]}
              >
                {isLoading ? (
              <Skeleton.Input
                active
                size="default"
                block
                style={inputSkeletonStyle}
              />
            ) : <StyledFormInput
                  placeholder="Enter email address"
                  autoComplete="off"
                /> }
              </StyledFormItem>
            </div>
          )}

          <StyledFormItem name="reminder" valuePropName="checked">
          {isLoading ? (
              <Skeleton.Input
                active
                size="default"
                width="120"
                style={inputSkeletonStyle}
              />
            ) : <div className="flex items-center">
              <StyledCheckbox>Send Reminder</StyledCheckbox>
              <Tooltip
                title="This will send a reminder every 3 days"
                trigger="hover"
              >
                <FaRegCircleQuestion className={styles.question_mark} />
              </Tooltip>
            </div> }
          </StyledFormItem>

          <StyledFormItem>
            {/* <StyledButton type="primary" htmlType="submit" loading={isLoading}>
              Save
            </StyledButton> */}
            <button className={modalStyles.logout_yes} type="submit" disabled={isLoading}>Save</button>
          </StyledFormItem>
        </StyledForm>
      </div>
    </TransModal>
  );
};

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
      {addTransaction && (
        <AddTransactionModal
          isOpen={addTransaction}
          onClose={() => setAddTransaction(false)}
        />
      )}
    </React.Fragment>
  );
};

export default Header;
