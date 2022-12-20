import dayjs from "dayjs";

export const transformDate = (date: string): string => {
  if (!date) {
    return "";
  }
  return dayjs(date).format("DD-MM-YYYY");
};
