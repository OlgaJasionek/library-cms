import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, TextFieldProps } from "@mui/material";
import { LocalizationProvider, DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Control, useController } from "react-hook-form";

import { transformDate } from "../../utils/transform-date";

type Props = {
  name: string;
  control: Control<any>;
  label: string;
};

const DatePicker = ({ name, control, label }: Props) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  const emitValue = (value: Dayjs | null) => onChange(value && transformDate(value.toISOString()));

  const transformValue = (date: string) => {
    if (!date) {
      return null;
    }

    const [day, month, year] = date.split("-");

    return `${month}/${day}/${year}`;
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} name={name} control={control}>
        <div className="m-3">
          <MuiDatePicker
            label={label}
            inputFormat="DD-MM-YYYY"
            value={transformValue(value)}
            onChange={emitValue}
            renderInput={(params: TextFieldProps) => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>
    </>
  );
};

export default DatePicker;
