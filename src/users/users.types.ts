export type BaseUserInfo = {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export enum UserRole {
  Librarian = "LIBRARIAN",
  Reader = "READER",
}

export interface FullUserInfo extends BaseUserInfo {
  createdAt: string;
  pesel: string;
  phoneNumber: number;
}
