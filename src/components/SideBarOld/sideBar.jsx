import React from "react";
import styles from "./sideBar.module.css";
import { NavLink } from "react-router-dom";

import { Tooltip } from "antd";

import { FaDashcube } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

import { Outlet } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex h-screen">
      <div
        className={`${styles.sidebar_container} w-12 lg:w-36 bg-black h-dvh flex flex-col justify-between py-3`}
      >
        {/* Small Screens View */}
        <div className="flex flex-col justify-between lg:hidden h-full">
          <ul className={`${styles.small_view_ul_list} flex flex-col w-full`}>
            {/* Dashboard Item */}
            <Tooltip placement="right" title="Dashboard">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${isActive ? styles.active_list_item : styles.list_item}`
                }
                aria-label="Dashboard"
              >
                <li className="flex lg:hidden">
                  <FaDashcube className={styles.dashboard_icon} />
                </li>
             
              </NavLink>
            </Tooltip>

            {/* Transactions Item */}
            <Tooltip placement="right" title="Transactions">
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  `${isActive ? styles.active_list_item : styles.list_item}`
                }
                aria-label="Transactions"
              >
                <li>
                  <MdOutlinePayment className={styles.dashboard_icon} />
                </li>
              </NavLink>
            </Tooltip>
          </ul>

          <ul className={`${styles.small_view_ul_list} flex flex-col w-full`}>
            {/* Dashboard Item */}
            <Tooltip placement="right" title="Settings">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `${isActive ? styles.active_list_item : styles.list_item}`
                }
                aria-label="Settings"
              >
                <li>
                  <IoSettingsOutline className={styles.dashboard_icon} />
                </li>
              </NavLink>
            </Tooltip>

            {/* Transactions Item */}
            <Tooltip placement="right" title="Notifications">
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  `${isActive ? styles.active_list_item : styles.list_item}`
                }
                aria-label="Notifications"
              >
                <li>
                  <IoMdNotificationsOutline className={styles.dashboard_icon} />
                </li>
              </NavLink>
            </Tooltip>
          </ul>
        </div>

        {/* Large Screens View */}
        <div className="hidden lg:flex flex-col justify-between h-full">
          <ul className={`${styles.large_view_ul_list} flex flex-col`}>
            <li className={styles.separator_text}>Main</li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${isActive ? styles.active_list_item : styles.list_item}`
              }
              aria-label="Dashboard"
            >
              <li
                className={`${styles.large_list_item} flex items-center gap-2 text-white`}
              >
                <FaDashcube className={styles.dashboard_icon} />
                Dashboard
              </li>
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `${isActive ? styles.active_list_item : styles.list_item}`
              }
              aria-label="Transactions"
            >
              <li
                className={`${styles.large_list_item} flex items-center gap-2 text-white`}
              >
                <MdOutlinePayment className={styles.dashboard_icon} />
                Transactions
              </li>
            </NavLink>
          </ul>

          <ul className={`${styles.large_view_ul_list} flex flex-col`}>
            <li className={styles.separator_text}>Settings</li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${isActive ? styles.active_list_item : styles.list_item}`
              }
              aria-label="Settings"
            >
              <li
                className={`${styles.large_list_item} flex items-center gap-2 text-white`}
              >
                <IoSettingsOutline className={styles.dashboard_icon} />
                Settings
              </li>
            </NavLink>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `${isActive ? styles.active_list_item : styles.list_item}`
              }
              aria-label="Notifications"
            >
              <li
                className={`${styles.large_list_item} flex items-center gap-2 text-white`}
              >
                <IoMdNotificationsOutline className={styles.dashboard_icon} />
                Notifications
              </li>
            </NavLink>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1}}>
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
