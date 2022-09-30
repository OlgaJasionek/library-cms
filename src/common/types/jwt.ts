import { UserInfo } from "./user";

export type DecodedToken = {
  exp: number;
  iat: number;
  user: UserInfo;
};
