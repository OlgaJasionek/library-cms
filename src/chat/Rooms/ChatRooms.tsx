import { SelectOption } from "../../common/types/select-option";
import { ChatRoom } from "../chat.types";

import ChatRoomsList from "./List/List";
import ChatRoomSearchBar from "./SearchBar/SearchBar";

type Props = {
  chatRooms: ChatRoom[];
  selectedChatRoom?: ChatRoom;
  onSelectChatRoom: (id: string) => void;
  onCloseChatRoom: () => void;
  onSelectUser: (value: SelectOption) => void;
};

const ChatRooms = ({
  onSelectChatRoom,
  onCloseChatRoom,
  onSelectUser,
  chatRooms,
  selectedChatRoom,
}: Props) => {
  
  return (
    <>
      <ChatRoomSearchBar onCloseChatRoom={onCloseChatRoom} onSelectUser={onSelectUser} />
      <ChatRoomsList
        onSelectChatRoom={onSelectChatRoom}
        chatRooms={chatRooms}
        selectedChatRoom={selectedChatRoom}
      />
    </>
  );
};

export default ChatRooms;
