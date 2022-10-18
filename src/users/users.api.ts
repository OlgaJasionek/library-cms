import { PaginationParams } from "../common/types/pagination-params";
import http from "../core/api/http";
import { Readers } from "./Readers/readers.types";
import { FullUserInfo, NewUserInfo } from "./users.types";

export const getCurrentUserData = (): Promise<{ user: FullUserInfo }> =>
  http.get("users/me").then((res) => res.data);

export const editUserPassword = (body: { newPassword: string; repeatedNewPassword: string }): Promise<void> =>
  http.post("users/change-password", body).then((res) => res.data);

export const getReadersData = (params: PaginationParams): Promise<{ items: Readers[]; total: number }> =>
  http
    .get("users/readers", {
      params: {
        page: params.page + 1,
        perPage: params.rowsPerPage,
      },
    })
    .then((res) => res.data);

export const addNewReader = (body: NewUserInfo): Promise<{ password: string }> =>
  http
    .post("/users", {
      ...body,
      pesel: parseInt(body.pesel),
      phoneNumber: parseInt(body.phoneNumber),
    })
    .then((res) => res.data);
