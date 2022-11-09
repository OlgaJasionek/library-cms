import { FormControlLabel, Switch as MuiSwitch } from "@mui/material";
import { Control, useController } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  control: Control<any> | undefined;
};

const Switch = ({ name, label, control }: Props) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <FormControlLabel control={<MuiSwitch name={name} onChange={onChange} value={value} />} label={label} />
  );
};

export default Switch;
