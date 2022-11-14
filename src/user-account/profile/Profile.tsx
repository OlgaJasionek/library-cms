import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

import { FullUserInfo } from "../../users/users.types";
import { getFullName } from "../../common/utils/full-name";
import { userRoleTranslations } from "../../common/utils/translations";
import UserInformation from "./UserInformation/UserInformation";
import Loader from "../../common/components/Loader/Loader";

import styles from "./Profile.module.scss";
import { getCurrentUserData } from "../../users/users.api";
import UserAssets from "./UserAssets/UserAssets";

const Profile = () => {
  const [userData, setUserData] = useState<FullUserInfo | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await getCurrentUserData();
      const dataUser = resp.user;
      setUserData(dataUser);
    } catch (err) {}
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <div>
      <div className="d-flex m-3">
        <Avatar className={styles.avatar} />
        <div className={styles.info}>
          <span className={styles.role}>{userRoleTranslations[userData.role]}</span>
          <span>{getFullName(userData)}</span>
        </div>
      </div>
      <div className="row">
        <UserInformation user={userData} />
        <UserAssets />
      </div>
    </div>
  );
};

export default Profile;
