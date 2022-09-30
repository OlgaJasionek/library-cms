import { useState } from "react";
import { Notifications, Menu } from "@mui/icons-material";
import { Avatar, Badge } from "@mui/material";
import jwtDecode from "jwt-decode";

import UserMenu from "./UserMenu/UserMenu";
import Popover from "../common/components/Popover/Popover";
import { DecodedToken } from "../common/types/jwt";

import styles from "./Header.module.scss";

const Header = () => {
  const [menuPopoverAnchorEl, setMenuPopoverAnchorEl] = useState<HTMLElement | null>(null);

  const isMenuPopoverOpen = !!menuPopoverAnchorEl;
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<DecodedToken>(token || "") || null;

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setMenuPopoverAnchorEl(null);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.burgerMenu}>
          <Menu sx={{ fontSize: 30 }} className={styles.icon} />
        </div>
        <div className="wrapper d-flex align-items-center">
          <div className={styles.notifications}>
            <Badge badgeContent={2} color="primary">
              <Notifications sx={{ fontSize: 30 }} className={styles.icon} />
            </Badge>
          </div>
          <Avatar className={styles.avatar} onClick={handleAvatarClick} />
          <Popover anchorEl={menuPopoverAnchorEl} open={isMenuPopoverOpen} onClose={handlePopoverClose}>
            <UserMenu user={decodedToken.user} />
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default Header;
