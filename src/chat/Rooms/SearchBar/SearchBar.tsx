import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import AsyncSearchBar from "../../../common/components/AsyncSearchBar/AsyncSearchBar";
import { SelectOption } from "../../../common/types/select-option";
import { getUsersOptions } from "../../../users/users.api";

import styles from "./RoomSearchBar.module.scss";

type Props = {
  onCloseChatRoom: () => void;
  onSelectUser: (value: SelectOption) => void;
};

const ChatRoomSearchBar = ({ onCloseChatRoom, onSelectUser }: Props) => {
  const getOptions = async (q: string) => {
    try {
      const resp = await getUsersOptions(q);
      return resp;
    } catch (err) {
      return [];
    }
  };

  return (
    <>
      <div className={styles.title}>
        <h2 className="m-4">Chat</h2>
        <IconButton className={styles.closeBtn} onClick={onCloseChatRoom}>
          <Close />
        </IconButton>
      </div>
      <div className="m-2">
        <AsyncSearchBar getOptionsFn={getOptions} onSelectedValue={onSelectUser} />
      </div>
    </>
  );
};

export default ChatRoomSearchBar;
