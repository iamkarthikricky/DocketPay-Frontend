import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Drawer,Avatar, Modal } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import brandImg from "../../assets/brand_img.png";
import styles from "./sidebar.module.css";
import styled from "styled-components";
import { IoMdHome,IoMdLogOut } from "react-icons/io";

import { MdOutlineLightMode,MdOutlineDarkMode } from "react-icons/md";
import { FaMoneyBillWave,FaUser, FaUserAlt } from "react-icons/fa";
import { logout } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { onToggleHeader, onToggleTheme } from "../../redux/docketPaySlice";

// Styled component for customizing the Antd Drawer
const StyledDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    width: 120px !important;
  }

  .ant-drawer-content {
    border-radius: 10px; /* Optional: Add rounded corners */
  }

  .ant-drawer-header {
    display: none;
    background-color: #7367f0; /* Header background */
    color: white; /* Header text color */
  }
  .ant-drawer-body {
    background-color:var(--color-white) !important;
    padding:10px 0px 0px 0px; /* Adjust padding */
    font-size: 16px;
  }
`;

export const StyledLogoutModal=styled(Modal)`
    min-width:200px !important;
    .ant-modal-content{
      padding:15px;
      background-color:var(--dropdown-bg);
    }
    .ant-modal-close{
      display:none;
    }
`
export const LogoutButton = () => {  
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch Redux action
    navigate("/login", { replace: true }); // Redirect user
  };
      
    return (
      <button onClick={handleLogout} className={styles.logout_yes} >
        Yes
      </button>
    );
  };
  


const SideBarItems = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch()

    const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

   
   
  return (
    <React.Fragment>
    <div className={`${styles.side_bar_container} h-full lg:h-screen lg:w-68 flex flex-col`} >

<div className="hidden ">
        <div className="h-20">
            <div className="flex justify-center p-5">
                <img src={brandImg} alt="brand" className={styles.brand_img} />
            </div>
        </div>
      </div>

<div className="h-full flex flex-col justify-between">
       <nav className={styles.sidebar}>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
        onClick={()=>dispatch(onToggleHeader(false))}
      >
        <span className={styles.icon}><IoMdHome /></span> Dashboard
      </NavLink>
      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
        onClick={()=>dispatch(onToggleHeader(false))}
      >
        <span className={styles.icon}> <FaMoneyBillWave  /></span> Transactions
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
        onClick={()=>dispatch(onToggleHeader(false))}
      >
        <span className={styles.icon}> <FaUserAlt /></span> Profile
      </NavLink>
    </nav>
    <div className={styles.user_info}>
       <div className="flex items-start gap-2">
            <Avatar size={35}/>
            <div className="flex flex-col items-baseline gap-1">
                <p className={styles.user_info_name}>Karthik Maheshwarapu</p>
                <p className={styles.user_info_email}>iamkarthikricky@gmail.com</p>
            </div>
            <button className={styles.logout_btn} onClick={()=>setIsModalOpen(true)}>
            <IoMdLogOut />
            </button>
       </div>
    </div>
    </div>
    </div>
    <StyledLogoutModal open={isModalOpen} onOk={handleOk} footer={false} onCancel={handleCancel}>
       <div className="flex gap-4 items-start">
            <div className={styles.gold1}>
                <div className={styles.gold2}>
                    <IoMdLogOut />
                </div>
            </div>
            <div className="flex flex-col gap-7">
            <div>
                <h1 className={styles.modal_heading}>Are you sure you want to logout ?</h1>
            </div>
            <div className="flex gap-10">
               <LogoutButton />
                <button className={styles.logout_no} onClick={()=>setIsModalOpen(false)}>No</button>
            </div>
            </div>
       </div>
    </StyledLogoutModal>
    </React.Fragment>
  );
};

export const SideBar = () => {
  const {isHeaderExpanded,darkMode} = useSelector((state)=>state.docketPay)
  const dispatch = useDispatch()

  const showDrawer = () => {
    dispatch(onToggleHeader(true))
  };
  const onClose = () => {
    dispatch(onToggleHeader(false))
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        dispatch(onToggleHeader(false)) // Reset when switching to large screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, [isHeaderExpanded]);

  return (
    <React.Fragment>
        <div className="flex flex-col lg:flex-row">
        <div className="lg:hidden">
      <div className={`${styles.header_container} h-14 p-4`}>
        <img src={brandImg} alt="brand" className={styles.brand_img} />
        <div className="flex items-center gap-4">
          {darkMode ? <button className={styles.theme_btn} onClick={()=>dispatch(onToggleTheme())}><MdOutlineLightMode /></button> : <button className={styles.theme_btn}  onClick={()=>dispatch(onToggleTheme())}><MdOutlineDarkMode /></button>}
          <button onClick={showDrawer} className="bg-red-50">
            <GiHamburgerMenu className={styles.hamburger} />
          </button>
        </div>
        <StyledDrawer
          title="Basic Drawer"
          onClose={onClose}
          open={isHeaderExpanded}
          placement="left"
          width={250}
        >
          <SideBarItems />
        </StyledDrawer>
      </div>
      </div>
      <div className="hidden lg:block">
        <SideBarItems />
      </div>
         <div style={{ flex: 1}}>
        <Outlet />
      </div>
      </div>
    </React.Fragment>
  );
};
