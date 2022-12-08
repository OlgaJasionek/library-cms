import { DragHandleRounded } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";

import { getFullName } from "../../../common/utils/full-name";
import { selectCurrentUser } from "../../../core/store/current-user";
import { ChatRoom } from "../../chat.types";

import styles from "./MessagesHeader.module.scss";

type Props = {
  currentRoom?: ChatRoom;
  onShowChatRoom: () => void;
};

const ChatMessagesHeader = ({ onShowChatRoom, currentRoom }: Props) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <div className={styles.header}>
        <IconButton className="ms-3" onClick={onShowChatRoom}>
          <DragHandleRounded />
        </IconButton>
        {currentRoom?.members.map((member) => {
          if (member.id !== currentUser.id) {
            return (
              <div key={member.id} className="d-flex align-items-center ms-3">
                <Avatar />
                <span className="ms-2">{getFullName(member)}</span>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ChatMessagesHeader;
