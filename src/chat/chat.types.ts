export type ChatRoomMember = {
  firstName: string;
  id: string;
  lastName: string;
};

export type ChatRoom = {
  id?: string;
  members: ChatRoomMember[];
  messages: ChatMessage[];
  updatedAt?: string;
  unreadMessagesCount: number;
};

export type ChatMessage = {
  content: string;
  createdAt: string;
  id: string;
  roomId: string;
  senderId: string;
};
