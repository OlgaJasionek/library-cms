import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../core/components/Header/Header";
import SideBar from "../core/components/SideBar/SideBar";
import Users from "../users/Users";
import UserAccount from "../user-account/UserAccount";
import Assests from "../assets/Assets";

import styles from "./Cockpit.module.scss";
import Chat from "../chat/Chat";

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
          <Routes>
            <Route path="/chat" element={<Chat />}></Route>
            <Route
              path="*"
              element={
                <div className="container pb-5">
                  <Routes>
                    <Route path="/user-account/*" element={<UserAccount />}></Route>
                    <Route path="/users/*" element={<Users />}></Route>
                    <Route path="/assets/*" element={<Assests />}></Route>notifications
                  </Routes>
                </div>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Cockpit;
