import http from "../core/api/http";

export const login = (body: { email: string; password: string }): Promise<{ token: string }> =>
  http.post("auth/login", body).then((res) => res.data);

export const getUnreadMessagesNumber = (): Promise<{ data: number }> =>
  http.get("chat/unread-messages-count").then((res) => res.data);
