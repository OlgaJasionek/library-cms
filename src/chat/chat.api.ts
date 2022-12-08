import http from "../core/api/http";
import { ChatMessage, ChatRoom } from "./chat.types";

export const getChatRooms = (): Promise<ChatRoom[]> => http.get("chat-rooms").then((res) => res.data);

export const getChatMessages = (id: string): Promise<ChatMessage[]> =>
  http.get(`chat-rooms/${id}/messages`).then((res) => res.data);

export const addNewMessage = (
  content: string,
  roomId: string | undefined,
  receiverId?: string | undefined
): Promise<{ data: ChatMessage & { room: ChatRoom } }> =>
  http.post("chat-message", {
    content,
    roomId,
    receiverId,
  });
