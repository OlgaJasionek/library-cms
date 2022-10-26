import { Box, Chip, FormControl, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { useController } from "react-hook-form";

import { BaseCustomControlProps } from "../../types/form";
import { SelectOption } from "../../types/select-option";
import ValidateMesage from "../ValidationMessage/ValidateMessage";

type Props = {
  values: Array<SelectOption>;
} & BaseCustomControlProps;

const MultiSelect = ({ name, label, values, control, rules }: Props) => {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
    defaultValue: [],
  });

  const error = errors[name];

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={`${name} select-label`}>{label}</InputLabel>
        <MuiSelect
          name={name}
          onChange={onChange}
          value={value}
          label={label}
          multiple
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((v: string | number) => {
                const selectedItem = values.find((item) => item.value === v);
                return <Chip key={v} label={selectedItem?.label} />;
              })}
            </Box>
          )}
        >
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

export default MultiSelect;
