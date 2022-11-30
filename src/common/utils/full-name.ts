export const getFullName = ({
  firstName,
  lastName,
}: {
  firstName: string | null;
  lastName: string | null;
}): string => `${firstName || ""} ${lastName || ""}`;
