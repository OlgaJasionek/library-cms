import { BaseUserInfo } from "../../users/users.types";

export type DecodedToken = {
  exp: number;
  iat: number;
  user: BaseUserInfo;
};
