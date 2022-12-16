import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import classnames from "classnames";
import { ReactNode } from "react";

import styles from "./ShiftSidePanel.module.scss";

type Props = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
};

const ShiftSidePanel = ({ open, children, onClose }: Props) => {
  return (
    <>
      <div className={classnames(styles.panel, { [styles["panel--open"]]: open })}>
        <div className={styles.closeBtn}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default ShiftSidePanel;
