import * as Icons from "@mui/icons-material";

import Card from "../../../common/components/Card/Card";
import { FullUserInfo } from "../../../common/types/user";
import { transformDate } from "../../../common/utils/transform-date";

import styles from "./UserInformation.module.scss";

type Props = {
  user: FullUserInfo;
};

const UserInformation = ({ user }: Props) => {
  return (
    <div className="col-sm-12 col-lg-4">
      <Card>
        <h3 className="p-2">Moje dane</h3>
        <hr className="separator" />
        <div className={styles.item}>
          <div className={styles.icon}>
            <Icons.EmailOutlined fontSize="small" />
          </div>
          <div className={styles.content}>{user.email}</div>
        </div>
        <hr className="separator" />
        <div className={styles.item}>
          <div className={styles.icon}>
            <Icons.Phone fontSize="small" />
          </div>
          <div className={styles.content}>{user.phoneNumber}</div>
        </div>
        <hr className="separator" />
        <div className={styles.item}>
          <div className={styles.icon}>
            <Icons.Security fontSize="small" />
          </div>
          <div className="d-flex-column">
            <div className={styles.label}>numer pesel</div>
            <div className={styles.content}>{user.pesel}</div>
          </div>
        </div>
        <hr className="separator" />
        <div className={styles.item}>
          <div className={styles.icon}>
            <Icons.CalendarMonth fontSize="small" />
          </div>
          <div className="d-flex-column">
            <div className={styles.label}>Data utworzenia konta</div>
            <div className={styles.content}>{transformDate(user.createdAt)}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserInformation;
