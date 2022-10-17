export const exactLengthValidator =
  (length: number) =>
  (value: string): boolean | string => {
    if (value.length === length) {
      return true;
    }

    return `Ilość znaków musi wynosić ${length}`;
  };

export const emailValidator = (value: string): boolean | string => {
  if (value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
    return true;
  }

  return "Niewłaściwy adres email";
};
