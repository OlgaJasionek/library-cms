import { TextField } from "@mui/material";
import { Control, useController } from "react-hook-form";

import ValidateMesage from "./ValidationMessage/ValidateMessage";

type Props = {
  name: string;
  control: Control<any> | undefined;
  rules: { [key: string]: boolean | number | RegExp };
  label: string;
};

export default function TextInput({ name, control, rules, label }: Props) {
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
    <div>
      <TextField onChange={onChange} value={value} name={name} label={label} />
      <ValidateMesage error={error} rules={rules} name={name} />
    </div>
  );
}
