import { PaginationParams } from "../common/types/pagination-params";
import { SelectOption } from "../common/types/select-option";
import http from "../core/api/http";
import { ReaderFormValues, Readers } from "./Readers/readers.types";
import { FullUserInfo } from "./users.types";

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

export const addNewReader = (body: ReaderFormValues): Promise<{ password: string }> =>
  http
    .post("/users", {
      ...body,
      pesel: parseInt(body.pesel),
      phoneNumber: parseInt(body.phoneNumber),
    })
    .then((res) => res.data);

export const getUsersOptions = (q: string): Promise<SelectOption[]> =>
  http
    .get("users/all", {
      params: {
        q,
      },
    })
    .then((res) => res.data);
    
export const getReaderData = (readerId: string): Promise<{ data: FullUserInfo }> =>
  http.get(`/users/${readerId}`);

export const editReader = (body: ReaderFormValues, readerId: string): Promise<void> =>
  http.put(`/users/${readerId}`, {
    ...body,
    pesel: parseInt(body.pesel),
    phoneNumber: parseInt(body.phoneNumber),
  });
