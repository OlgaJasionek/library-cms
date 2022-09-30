import { Logout, Person, Settings, AlternateEmail } from "@mui/icons-material";
import { Avatar } from "@mui/material";

import { UserInfo } from "../../common/types/user";
import { userRoleTranslations } from "../../common/utils/translations";
import { getFullName } from "../../common/utils/full-name";

import styles from "./UserMenu.module.scss";
import classNames from "classnames";

type Props = {
  user: UserInfo;
};

const UserMenu = ({ user }: Props) => {
  return (
    <div>
      <div className={styles.menu}>
        <div className={styles.avatar}>
          <Avatar />
          <span className={styles.itemLabel}>{getFullName(user)}</span>
        </div>
        <hr className={styles.separator} />
        <div className={styles.item}>
          <AlternateEmail fontSize="small" />
          <span className={styles.itemLabel}>{user.email}</span>
        </div>
        <div className={styles.item}>
          <Person fontSize="small" />
          <span className={styles.itemLabel}> {userRoleTranslations[user.role]}</span>
        </div>
        <a className={classNames(styles.item, styles.link)}>
          <Settings fontSize="small" />
          <span className={styles.itemLabel}>Ustawienia</span>
        </a>
        <hr className={styles.separator} />
        <a className={classNames(styles.item, styles.link)}>
          <Logout fontSize="small" />
          <span className={styles.itemLabel}> Wyloguj</span>
        </a>
        <hr className={styles.separator} />
      </div>
    </div>
  );
};
export default UserMenu;
