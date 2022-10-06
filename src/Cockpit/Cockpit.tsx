import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../core/Components/Header/Header";
import Profile from "../UserAccount/Profile/Profile";
import SideBar from "../core/Components/SideBar/SideBar";

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
          <div className="container">
            <div className="row">
              <Routes>
                <Route path="/profile" element={<Profile />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cockpit;
