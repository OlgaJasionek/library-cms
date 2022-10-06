import * as Icons from "@mui/icons-material";
import classnames from "classnames";

import { FullUserInfo } from "../../../common/types/user";
import { transformDate } from "../../../common/utils/transform-date";

import styles from "./UserInformation.module.scss";

type Props = {
  user: FullUserInfo;
};

const UserInformation = ({ user }: Props) => {
  return (
    <div className={classnames("col-sm-12 col-lg-4", styles.wraper)}>
      <div className={styles.header}>
        <h5>Moje dane</h5>
      </div>
      <div className={styles.items}>
        <div>
          <div className="d-flex align-items-center">
            <div className={styles.icon}>
              <Icons.EmailOutlined fontSize="small" />
            </div>
            <div className="d-flex-column m-2">
              <div className={styles.content}>{user.email}</div>
            </div>
          </div>
          <hr className="separator" />
        </div>
        <div>
          <div className="d-flex align-items-center">
            <div className={styles.icon}>
              <Icons.Phone fontSize="small" />
            </div>
            <div className="d-flex-column m-2">
              <div className={styles.content}>{user.phoneNumber}</div>
            </div>
          </div>
          <hr className="separator" />
        </div>
        <div>
          <div className="d-flex align-items-center">
            <div className={styles.icon}>
              <Icons.Security fontSize="small" />
            </div>
            <div className="d-flex-column m-2">
              <div className={styles.label}>numer pesel</div>
              <div className={styles.content}>{user.pesel}</div>
            </div>
          </div>
          <hr className="separator" />
        </div>
        <div>
          <div className="d-flex align-items-center">
            <div className={styles.icon}>
              <Icons.CalendarMonth fontSize="small" />
            </div>
            <div className="d-flex-column m-2">
              <div className={styles.label}>Data utworzenia konta</div>
              <div className={styles.content}>{transformDate(user.createdAt)}</div>
            </div>
          </div>
          <hr className="separator" />
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
