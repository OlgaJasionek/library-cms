import * as Icons from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import { getFullName } from "../../../../common/utils/full-name";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/current-user";

import styles from "./UserMenu.module.scss";

const UserMenu = () => {
  const user = useSelector(selectCurrentUser);

  const logOutHandler = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <div className={styles.menu}>
        <div className={styles.avatar}>
          <Avatar />
          <div className={styles.userInfo}>
            <span>{getFullName(user)}</span>
            <span className={styles.email}>{user.email}</span>
          </div>
        </div>
        <hr className={styles.separator} />
        <Link to="user-account/profile" className={styles.link}>
          <Icons.Person fontSize="small" />
          <span className={styles.itemLabel}>Profil</span>
        </Link>
        <Link to="user-account/settings" className={styles.link}>
          <Icons.Settings fontSize="small" />
          <span className={styles.itemLabel}>Ustawienia</span>
        </Link>
        <Link to="/login" onClick={logOutHandler} className={styles.link}>
          <Icons.Logout fontSize="small" />
          <span className={styles.itemLabel}> Wyloguj</span>
        </Link>
        <hr className={styles.separator} />
      </div>
    </div>
  );
};

export default UserMenu;
