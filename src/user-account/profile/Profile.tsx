import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Icons from "@mui/icons-material";

import { FullUserInfo, UserRole } from "../../users/users.types";
import { getFullName } from "../../common/utils/full-name";
import { userRoleTranslations } from "../../common/utils/translations";
import UserInformation from "./UserInformation/UserInformation";
import Loader from "../../common/components/Loader/Loader";
import { getCurrentUserData } from "../../users/users.api";
import UserAssets from "./UserAssets/UserAssets";

import styles from "./Profile.module.scss";

const Profile = () => {
  const [userData, setUserData] = useState<FullUserInfo | null>(null);
  const navigate = useNavigate();

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
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex">
          <Avatar className={styles.avatar} />
          <div className={styles.info}>
            <span>{getFullName(userData)}</span>
            <span className={styles.role}>{userRoleTranslations[userData.role]}</span>
          </div>
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/chat");
          }}
        >
          <Icons.ForwardToInbox fontSize="small" />
          <span className="ms-2">Chat</span>
        </Button>
      </div>
      <div className="row">
        <UserInformation user={userData} />
        {userData.role === UserRole.Reader && <UserAssets />}
      </div>
    </div>
  );
};

export default Profile;
