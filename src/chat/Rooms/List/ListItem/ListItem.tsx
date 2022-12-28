import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import classnames from "classnames";
import * as Icons from "@mui/icons-material";

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
  const roomPartner = contact.members.find((member) => member.id !== currentUser?.id);

  return (
    <>
      <div
        key={contact.id}
        className={classnames(styles.contact, { [styles.active]: contact.id === selectedChatRoom?.id })}
        onClick={() => onSelectChatRoom(contact.id!)}
      >
        <div className="d-flex">
          <Avatar />
          {roomPartner && (
            <div key={roomPartner.id} className="d-flex flex-column ms-3">
              <span>{getFullName(roomPartner)}</span>
              {contact.messages.map((msg) => {
                return (
                  <div key={msg.id} className="d-flex">
                    <div className="d-flex">
                      <span className="text-secondary">{msg.senderId === currentUser?.id && "Ty: "}</span>
                      <span
                        className={classnames("ms-2", styles.textMessage, {
                          [styles.newTextMessage]: contact.unreadMessagesCount > 0,
                        })}
                      >
                        {msg.content}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {contact.unreadMessagesCount > 0 && (
          <Icons.FiberManualRecord color="primary" fontSize="medium" className="m-3" />
        )}
      </div>
    </>
  );
};

export default ChatRoomListItem;
