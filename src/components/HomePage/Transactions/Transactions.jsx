import React, { useState } from "react";
import styles from "./Transactions.module.css";
import headerStyles from '../../Header/Header.module.css';

const tabsList = [
  {
    id: 1,
    tabName: "All Transactions",
  },
  {
    id: 2,
    tabName: "Credits",
  },
  {
    id: 3,
    tabName: "Debits",
  },
];

function Transactions() {
  const [activeTab, setActiveTab] = useState(tabsList["0"].tabName);
  return (
    <div className={`${styles.transactions_header} flex flex-col gap-6 relative h-22`}>
    <div className={`${headerStyles.header} p-4`} style={{boxShadow:"none"}}>
              <div className="w-full flex justify-between items-center">
                <h1 className={headerStyles.header_text}>Transactions</h1>
                <button className={headerStyles.add_trans_btn}>+ Add</button>
              </div>
             </div>

      <ul className={styles.tabs_ul_list}>
        {tabsList.map((e) => (
          <li
            key={e.id}
            style={{ color: activeTab === e.tabName ? "var(--color-blue)" : "var(--color-black)" }}
            onClick={()=>setActiveTab(e.tabName)}
          >
            <p className={styles.list_item}>{e.tabName}</p>
            {activeTab === e.tabName && <div className={styles.active_tab}></div>}
          </li>
        ))}
      </ul>
      </div>
  );
}

export default Transactions;
