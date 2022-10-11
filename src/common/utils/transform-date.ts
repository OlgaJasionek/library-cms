import dayjs from "dayjs";

export const transformDate = (date: string): string => {
  return dayjs(date).format("DD-MM-YYYY");
};
