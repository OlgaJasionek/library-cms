import http from "../core/api/http";

export const login = (body: { email: string; password: string }): Promise<{ token: string }> =>
  http.post("auth/login", body).then((res) => res.data);
