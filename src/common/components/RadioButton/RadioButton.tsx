import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = {
  label: string;
  value: string;
  type?: string;
  onMarkOption?: (type?: string) => void;
};

const RadioButton = ({ label, value, type, onMarkOption }: Props) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={label}
      onChange={() => onMarkOption && onMarkOption(type)}
    />
  );
};
export default RadioButton;
