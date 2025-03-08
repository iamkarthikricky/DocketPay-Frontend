import React from 'react'
import styles from './Header.module.css';

const Header = ({routeName}) => {
  return (
     <div className={`${styles.header} h-16 p-4`}>
              <div className="w-full flex justify-between items-center">
                <h1 className={styles.header_text}>{routeName}</h1>
                <button className={styles.add_trans_btn}>+ Add</button>
              </div>
             </div>
  )
}

export default Header
