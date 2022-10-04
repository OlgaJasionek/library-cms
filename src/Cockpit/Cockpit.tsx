import { useState } from "react";

import Header from "../core/Components/Header/Header";
import SideBar from "../SideBar/SideBar";

import styles from "./Cockpit.module.scss";

const Cockpit = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const closeSideBarHandler = () => {
    setOpenSideBar(false);
  };

  return (
    <div className={styles.cockpit}>
      <Header onOpenSidebar={() => setOpenSideBar(true)} />
      <div className="d-flex p-relative">
        <SideBar openSideBar={openSideBar} onCloseSideBar={closeSideBarHandler} />
        <div className={styles.cockpitBody}>
          <div className="container"></div>
        </div>
      </div>
    </div>
  );
};
export default Cockpit;
