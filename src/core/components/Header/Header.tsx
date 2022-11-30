import { useState } from "react";
import * as Icons from "@mui/icons-material";
import { Avatar, Badge, Popover } from "@mui/material";

import UserMenu from "./UserMenu/UserMenu";

import styles from "./Header.module.scss";

type Props = {
  onOpenSidebar: () => void;
};

const Header = ({ onOpenSidebar }: Props) => {
  const [menuPopoverAnchorEl, setMenuPopoverAnchorEl] = useState<HTMLElement | null>(null);

  const isMenuPopoverOpen = !!menuPopoverAnchorEl;

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setMenuPopoverAnchorEl(null);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.burgerMenu} onClick={() => onOpenSidebar()}>
          <Icons.Menu className={styles.icon} />
        </div>
        <div className="wrapper d-flex align-items-center">
          <div className={styles.notifications}>
            <Badge badgeContent={2} color="primary">
              <Icons.Notifications className={styles.icon} />
            </Badge>
          </div>
          <Avatar className={styles.avatar} onClick={handleAvatarClick} />
          <Popover anchorEl={menuPopoverAnchorEl} open={isMenuPopoverOpen} onClose={handlePopoverClose}>
            <UserMenu />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
