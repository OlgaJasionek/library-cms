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
  pesel: number;
  phoneNumber: number;
}

export type NewUserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  pesel: string;
  phoneNumber: string;
};
