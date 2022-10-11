import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { FullUserInfo } from "../../common/types/user";
import { getFullName } from "../../common/utils/full-name";
import { userRoleTranslations } from "../../common/utils/translations";
import UserInformation from "./UserInformation/UserInformation";
import Loader from "../../common/components/Loader/Loader";
import http from "../../core/Components/api/http";

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
      <div className="d-flex">
        <Avatar className={styles.avatar} />
        <div className={styles.info}>
          <span className={styles.role}>{userRoleTranslations[userData.role]}</span>
          <span>{getFullName(userData)}</span>
        </div>
      </div>
      <hr className={styles.separator} />
      <div className="row">
        <UserInformation user={userData} />
        <div className="col-sm-12 col-lg-8"></div>
      </div>
    </div>
  );
};

export default Profile;
