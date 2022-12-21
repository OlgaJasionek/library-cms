import classnames from "classnames";

import { ChatRoom } from "../../chat.types";
import ChatRoomListItem from "./ListItem/ListItem";

import styles from "./RoomsLIst.module.scss";

type Props = {
  chatRooms: ChatRoom[];
  selectedChatRoom: ChatRoom | undefined;
  onSelectChatRoom: (id: string) => void;
};

const ChatRoomsList = ({ chatRooms, onSelectChatRoom, selectedChatRoom }: Props) => {
  return (
    <div className={styles.contactsList}>
      {chatRooms.map((contact) => (
        <div
          key={contact.id}
          className={classnames(styles.contact, { [styles.active]: contact.id === selectedChatRoom?.id })}
        >
          <ChatRoomListItem
            contact={contact}
            onSelectChatRoom={onSelectChatRoom}
            selectedChatRoom={selectedChatRoom}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatRoomsList;
