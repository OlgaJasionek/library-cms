import dayjs from "dayjs";

export const transformDate: (date: string) => string = (date) => {
  return dayjs(date).format("DD-MM-YYYY");
};
