import http from "../core/api/http";
import { Readers } from "./Readers/readers.types";
import { FullUserInfo } from "./users.types";

export const getCurrentUserData = (): Promise<{ user: FullUserInfo }> =>
  http.get("users/me").then((res) => res.data);

export const editUserPassword = (body: { newPassword: string; repeatedNewPassword: string }): Promise<void> =>
  http.post("users/change-password", body).then((res) => res.data);

export const getReadersData = (params: {
  page: number;
  rowsPerPage: number;
}): Promise<{ items: Readers[]; total: number }> =>
  http
    .get("users/readers", {
      params: {
        page: params.page + 1,
        perPage: params.rowsPerPage,
      },
    })
    .then((res) => res.data);
