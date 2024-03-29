export type Readers = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pesel: string;
  phoneNumber: number;
  isActive: boolean;
  disabled: boolean;
};

export type ReaderFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  pesel: string;
  phoneNumber: string;
};
