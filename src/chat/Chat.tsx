import classnames from "classnames";
import { useEffect, useState } from "react";

import { SelectOption } from "../common/types/select-option";
import { ChatRoom } from "./chat.types";
import ChatRooms from "./Rooms/ChatRooms";
import ChatMessages from "./Messages/ChatMessages";

import styles from "./Chat.module.scss";
import { getChatRooms } from "./chat.api";

const Chat = () => {
  const [showChatRooms, setShowChatRooms] = useState<boolean>(true);
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom>();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await getChatRooms();
      setChatRooms(resp);
    } catch (err) {}
  };

  const selectUserHandler = (user: SelectOption) => {
    if (user) {
      const [firstName, lastName] = user.label.split(" ");

      const roomWithSelectedUserExist = chatRooms.find((room) =>
        room.members.find((member) => member.id === user.value)
      );

      if (roomWithSelectedUserExist) {
        setSelectedChatRoom(roomWithSelectedUserExist);
      } else {
        setSelectedChatRoom({ members: [{ id: user.value as string, firstName, lastName }], messages: [] });
      }
    }
  };

  const showChatRoomHandler = () => {
    setShowChatRooms((prevState) => !prevState);
  };

  const closeChatRoomHandler = () => {
    setShowChatRooms(false);
  };

  const selectChatRoomHandler = (id: string) => {
    const selectedRoom = chatRooms.find((room) => room.id === id);
    setSelectedChatRoom(selectedRoom);
  };

  const createNewChatRoomHandler = (room: ChatRoom) => {
    setSelectedChatRoom(room);
  };

  const createNewMessageHandler = () => {
    getData();
  };

  return (
    <div className={styles.root}>
      <div className={classnames("col-4", styles.room, { [styles["room--open"]]: showChatRooms })}>
        <ChatRooms
          chatRooms={chatRooms}
          selectedChatRoom={selectedChatRoom}
          onSelectChatRoom={selectChatRoomHandler}
          onCloseChatRoom={closeChatRoomHandler}
          onSelectUser={selectUserHandler}
        />
      </div>
      <div
        className={classnames("col-12", "col-md-8", styles.messages, {
          ["col-md-12"]: !showChatRooms,
        })}
      >
        <ChatMessages
          currentRoom={selectedChatRoom}
          onShowChatRoom={showChatRoomHandler}
          onCreateNewChatRoom={createNewChatRoomHandler}
          onCreateNewMessage={createNewMessageHandler}
        />
      </div>
    </div>
  );
};

export default Chat;