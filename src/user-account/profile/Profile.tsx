import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

import { FullUserInfo } from "../../users/users.types";
import { getFullName } from "../../common/utils/full-name";
import { userRoleTranslations } from "../../common/utils/translations";
import UserInformation from "./UserInformation/UserInformation";
import Loader from "../../common/components/Loader/Loader";
import http from "../../core/api/http";

import styles from "./Profile.module.scss";

const Profile = () => {
  const [userData, setUserData] = useState<FullUserInfo | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await http.get("users/me");
      const data = resp.data.user;
      setUserData(data);
    } catch (err) {
      console.log(err); //TODO: DO OMÓWIENIA OBSŁUGA BŁĘDÓW
    }
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <div>
      <div className="d-flex m-2">
        <Avatar className={styles.avatar} />
        <div className={styles.info}>
          <span className={styles.role}>{userRoleTranslations[userData.role]}</span>
          <span>{getFullName(userData)}</span>
        </div>
      </div>
      <div className="row">
        <UserInformation user={userData} />
        <div className="col-sm-12 col-lg-8"></div>
      </div>
    </div>
  );
};

export default Profile;
