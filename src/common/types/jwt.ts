import { BaseUserInfo } from "./user";

export type DecodedToken = {
  exp: number;
  iat: number;
  user: BaseUserInfo;
};
