import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../core/components/Header/Header";
import SideBar from "../core/components/SideBar/SideBar";
import Users from "../users/Users";
import UserAccount from "../user-account/UserAccount";

import styles from "./Cockpit.module.scss";

const Cockpit = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const closeSideBarHandler = () => {
    setOpenSideBar(false);
  };

  return (
    <div className={styles.cockpit}>
      <Header onOpenSidebar={() => setOpenSideBar(true)} />
      <div className={styles.cockpitBody}>
        <SideBar openSideBar={openSideBar} onCloseSideBar={closeSideBarHandler} />
        <div className={styles.cockpitItem}>
          <div className="container pb-5">
            <Routes>
              <Route path="/user-account/*" element={<UserAccount />}></Route>
              <Route path="/users/*" element={<Users />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cockpit;
