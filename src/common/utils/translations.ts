import { AssetsTypes } from "../../assets/assets.types";
import { UserRole } from "../../users/users.types";

export const userRoleTranslations = {
  [UserRole.Librarian]: "Bibliotekarz",
  [UserRole.Reader]: "Czytelnik",
};

export const assetsTypesTranslations = {
  [AssetsTypes.Book]: "Książka",
  [AssetsTypes.Audiobook]: "Audiobook",
  [AssetsTypes.Magazine]: "Czasopismo",
};
