import { useEffect, useState } from "react";

import { getChatMessages } from "../chat.api";
import { ChatMessage, ChatRoom } from "../chat.types";
import ChatMessagesForm from "./Form/Form";
import ChatMessagesHeader from "./Header/Header";
import ChatMessagesList from "./List/List";

type Props = {
  currentRoom?: ChatRoom;
  onShowChatRoom: () => void;
  onCreateNewChatRoom: (room: ChatRoom) => void;
  onCreateNewMessage: () => void;
};

const chatMessages = ({ currentRoom, onShowChatRoom, onCreateNewChatRoom, onCreateNewMessage }: Props) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    getData();
  }, [currentRoom]);

  const getData = async () => {
    if (currentRoom?.id) {
      const resp = await getChatMessages(currentRoom.id);
      
      setChatMessages(resp);
    } else {
      setChatMessages([]);
    }
  };

  const createNewMessageHandler = (newMessage: ChatMessage) => {
    setChatMessages([...chatMessages, newMessage]);
    onCreateNewMessage();
  };

  return (
    <>
      <ChatMessagesHeader currentRoom={currentRoom} onShowChatRoom={onShowChatRoom} />
      <ChatMessagesList chatMessages={chatMessages} />
      <ChatMessagesForm
        currentRoom={currentRoom}
        onCreateNewMessage={createNewMessageHandler}
        onCreateNewChatRoom={onCreateNewChatRoom}
      />
    </>
  );
};

export default chatMessages;
