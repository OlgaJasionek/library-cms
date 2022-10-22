import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { useController } from "react-hook-form";

import { BaseCustomControlProps } from "../../types/form";
import ValidateMesage from "../ValidationMessage/ValidateMessage";

type Props = {
  values: Array<{ value: string | number; label: string }>;
} & BaseCustomControlProps;

const Select = ({ name, label, values, control, rules }: Props) => {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  const error = errors[name];

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={`${name} select-label`}>{label}</InputLabel>
        <MuiSelect name={name} onChange={onChange} value={value} label={label}>
          {values.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
      <ValidateMesage error={error} rules={rules} label={label} />
    </>
  );
};

export default Select;
