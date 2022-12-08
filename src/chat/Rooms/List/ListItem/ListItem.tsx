import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import classnames from "classnames";

import { getFullName } from "../../../../common/utils/full-name";
import { selectCurrentUser } from "../../../../core/store/current-user";
import { ChatRoom } from "../../../chat.types";

import styles from "./ListItem.module.scss";

type Props = {
  contact: ChatRoom;
  selectedChatRoom?: ChatRoom;
  onSelectChatRoom: (id: string) => void;
};

const ChatRoomListItem = ({ contact, onSelectChatRoom, selectedChatRoom }: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const roomPartner = contact.members.find((member) => member.id !== currentUser.id);

  return (
    <>
      <div
        key={contact.id}
        className={classnames(styles.contact, { [styles.active]: contact.id === selectedChatRoom?.id })}
        onClick={() => onSelectChatRoom(contact.id!)}
      >
        <Avatar />
        {roomPartner && (
          <div key={roomPartner.id} className="d-flex flex-column ms-3">
            <span>{getFullName(roomPartner)}</span>
            {contact.messages.map((msg) => {
              return (
                <div key={msg.id} className="d-flex">
                  <span className="text-secondary">{msg.senderId === currentUser.id ? "Ty: " : null}</span>
                  <span className="ms-2 text-secondary">{msg.content}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatRoomListItem;
