import { Popover as MuiPopover, PopoverOrigin } from "@mui/material";
import { ReactNode } from "react";

interface Props extends Partial<PopoverOrigin> {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: ReactNode;
}

const Popover = ({ open, anchorEl, onClose, vertical = "bottom", horizontal = "left", children }: Props) => {
  return (
    <MuiPopover open={open} anchorEl={anchorEl} onClose={onClose} anchorOrigin={{ vertical, horizontal }}>
      {children}
    </MuiPopover>
  );
};
export default Popover;
