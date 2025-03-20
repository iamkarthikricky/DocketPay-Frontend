import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import {
  IoMdTrendingDown,
  IoMdTrendingUp,
  IoMdArrowDropdown,
} from "react-icons/io";

import styled, { createGlobalStyle } from "styled-components";

import Header from "../../Header/Header";
import { FaCalendarXmark } from "react-icons/fa6";
import { BsCurrencyRupee } from "react-icons/bs";

import { Dropdown } from "antd";
import axiosInstance from "../../../axiosConfig/axiosConfig";


const listItems = [
  {
    key: "This Month",
    label: "This Month",
  },
  {
    key: "Last Month",
    label: "Last Month",
  },
  {
    key: "Last 3 Months",
    label: "Last 3 Months",
  },
  {
    key: "Last 6 Months",
    label: "Last 6 Months",
  },
];

// Use a specific class name for this dropdown's styles
const DropdownStyles = createGlobalStyle`
  .card_stats_dropdown .ant-dropdown-menu {
    padding:10px 0px !important;
    margin-top:7px !important;
    background-color:var(--dropdown-bg);
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display:flex;
    flex-direction:column;
    gap:6px;
  }

  .card_stats_dropdown .ant-dropdown-menu-item {
    padding: 5px 8px !important;
    font-family:var(--font-public);
    font-size: var(--main-para) !important;
    color: var(--color-black) !important;
    
    &:hover {
      background-color: transparent !important;
      color: var(--color-blue) !important;
    }
  }
`;

const TotalPayables = () => {
  const [selectedOption, setSelectedOption] = useState(listItems["0"]?.key);

  const onClick = (e) => {
    setSelectedOption(e.key);
  };

  return (
    <div
      className={`${styles.dashboard_card} w-full md:w-1/3 flex flex-col gap-3`}
    >
      <h1 className={styles.card_heading}>TOTAL PAYABLES</h1>
      <div
        className={styles.card_stats_container}
        style={{ backgroundColor: "#FFEAEA", color: "#FA4242" }}
      >
        <p className={styles.card_stats_text}>- 1,00,00 INR</p>
        <IoMdTrendingDown />
      </div>
      <>
        <DropdownStyles />
        <Dropdown
          menu={{
            items: listItems,
            onClick,
          }}
          placement="bottom"
          overlayClassName="card_stats_dropdown"
          trigger={["click"]}
        >
          <div className="w-32 flex justify-between items-center">
            <button className={styles.dropdown_btn}>{selectedOption}</button>
            <IoMdArrowDropdown style={{ color: "#6D6976" }} />
          </div>
        </Dropdown>
      </>
    </div>
  );
};

const TotalReceivables = () => {
  const [selectedOption, setSelectedOption] = useState(listItems["0"]?.key);

  const onClick = (e) => {
    setSelectedOption(e.key);
  };

  return (
    <div
      className={`${styles.dashboard_card} w-full md:w-1/3 flex flex-col gap-3`}
    >
      <h1 className={styles.card_heading}>TOTAL RECIEVABLES</h1>
      <div
        className={styles.card_stats_container}
        style={{ backgroundColor: "#F6F6FF", color: "#7367F0" }}
      >
        <p className={styles.card_stats_text}>+ 1,00,00 INR</p>
        <IoMdTrendingUp />
      </div>
      <>
        <DropdownStyles />
        <Dropdown
          menu={{
            items: listItems,
            onClick,
          }}
          placement="bottom"
          overlayClassName="card_stats_dropdown"
          trigger={["click"]}
        >
          <div className="w-32 flex justify-between items-center">
            <button className={styles.dropdown_btn}>{selectedOption}</button>
            <IoMdArrowDropdown style={{ color: "#6D6976" }} />
          </div>
        </Dropdown>
      </>
    </div>
  );
};

const TotalIncome = () => {
  const [selectedOption, setSelectedOption] = useState(listItems["0"]?.key);

  const onClick = (e) => {
    setSelectedOption(e.key);
  };
  return (
    <div
      className={`${styles.dashboard_card} w-full md:w-1/3 flex flex-col gap-3`}
    >
      <h1 className={styles.card_heading}>TOTAL INCOME</h1>
      <div
        className={styles.card_stats_container}
        style={{ backgroundColor: "#D3FFDF", color: "#2BD35A" }}
      >
        <p className={styles.card_stats_text}>+ 1,00,00 INR</p>
        <IoMdTrendingUp />
      </div>
      <>
        <DropdownStyles />
        <Dropdown
          menu={{
            items: listItems,
            onClick,
          }}
          placement="bottom"
          overlayClassName="card_stats_dropdown"
          trigger={["click"]}
        >
          <div className="w-32 flex justify-between items-center">
            <button className={styles.dropdown_btn}>{selectedOption}</button>
            <IoMdArrowDropdown style={{ color: "#6D6976" }} />
          </div>
        </Dropdown>
      </>
    </div>
  );
};


const PayablesCard=()=>{

  const staticPayables=[
    {
      id:1,
      borrowerName:"Karthik",
      amount:10000,
      dueDate:"15-Nov-2025"
    },
    {
      id:2,
      borrowerName:"Karthik",
      amount:15000,
      dueDate:"15-Nov-2025"
    },
    {
      id:3,
      borrowerName:"Karthik",
      amount:100000,
      dueDate:"15-Nov-2025"
    }
  ]

  return(
    <div className={`${styles.recent_card} w-full md:w-1/2 h-72 flex flex-col gap-2 `}>
      <div className="flex justify-between items-center">
        <h1 className={styles.payable_text}>Payables</h1>
        <button>Add</button>
      </div>
      <div className="flex flex-col gap-2">
        {staticPayables?.map(e=>(
          <div key={e.id}>
          <div className={`${styles.payable_item} h-11 flex flex-row items-center  px-2`}>
            <div className="flex gap-2 items-center w-1/3">
              <div className={styles.user_avatar}></div>
            <p className={styles.borrower_name}>{e.borrowerName}</p>
            </div>
            <div className="flex gap-0 items-center w-1/4">
              <BsCurrencyRupee className={styles.amount_text}/>
              <p className={styles.amount_text}>{e.amount}</p>
            </div>
            <div className="flex gap-2 items-center ">
              <FaCalendarXmark className={styles.due_date_text}/>
              <p className={styles.due_date_text}>{e.dueDate}</p>
            </div>
          </div>
         
          </div>
        ))}
      </div>
    </div>
  )
}

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  
  }, []);

  const getAllUsers=async()=>{
    try{
      const response = await axiosInstance.get("/users")
      console.log(response?.data)
    }catch(error){console.log(error)}
  }

  return (
    <div className="flex flex-col gap-4">
      <div style={{    boxShadow: "0 5px 8px 0 #0000001a",
    borderTop: "0.1px solid #c9c9c9"}}>
      <Header routeName="Dashboard"/>
      </div>
      <div className="flex flex-col md:flex-row gap-4 px-4">
        <TotalPayables />
        <TotalReceivables />
        <TotalIncome />
      </div>
      <div className="flex flex-col md:flex-row gap-4  px-4 my-0">
        <PayablesCard />
        <PayablesCard />
      </div>
    </div>
  );
};
export default Dashboard;
