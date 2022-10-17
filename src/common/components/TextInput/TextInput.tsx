import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

import { BaseCustomControlProps } from "../../types/form";
import ValidateMesage from "../ValidationMessage/ValidateMessage";

type Props = {
  type: string;
} & BaseCustomControlProps;

export default function TextInput({ name, control, rules, label, type }: Props) {
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
      <TextField onChange={onChange} value={value} name={name} label={label} type={type} />
      <ValidateMesage error={error} rules={rules} label={label} />
    </div>
  );
}
