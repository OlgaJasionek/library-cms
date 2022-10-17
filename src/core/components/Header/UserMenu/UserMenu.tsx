import * as Icons from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { getFullName } from "../../../../common/utils/full-name";
import { userRoleTranslations } from "../../../../common/utils/translations";
import { BaseUserInfo } from "../../../../users/users.types";

import styles from "./UserMenu.module.scss";

type Props = {
  user: BaseUserInfo;
};

const UserMenu = ({ user }: Props) => {
  const logOutHandler = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <div className={styles.menu}>
        <div className={styles.avatar}>
          <Avatar />
          <span className={styles.itemLabel}>{getFullName(user)}</span>
        </div>
        <hr className={styles.separator} />
        <div className={styles.item}>
          <Icons.AlternateEmail fontSize="small" />
          <span className={styles.itemLabel}>{user.email}</span>
        </div>
        <div className={styles.item}>
          <Icons.Contacts fontSize="small" />
          <span className={styles.itemLabel}> {userRoleTranslations[user.role]}</span>
        </div>
        <Link to="user-account/profile" className={classNames(styles.item, styles.link)}>
          <Icons.Person fontSize="small" />
          <span className={styles.itemLabel}>Profil</span>
        </Link>
        <Link to="user-account/settings" className={classNames(styles.item, styles.link)}>
          <Icons.Settings fontSize="small" />
          <span className={styles.itemLabel}>Ustawienia</span>
        </Link>
        <hr className={styles.separator} />
        <Link to="/login" onClick={logOutHandler} className={classNames(styles.item, styles.link)}>
          <Icons.Logout fontSize="small" />
          <span className={styles.itemLabel}> Wyloguj</span>
        </Link>
        <hr className={styles.separator} />
      </div>
    </div>
  );
};
export default UserMenu;
