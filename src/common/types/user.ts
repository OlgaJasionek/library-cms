export type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export enum UserRole {
  Librarian = "LIBRARIAN",
  Reader = "READER",
}
