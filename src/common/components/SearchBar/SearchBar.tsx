import { Search } from "@mui/icons-material";
import { CircularProgress, debounce, InputAdornment, TextField } from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Control, useController } from "react-hook-form";


type Props = {
  loading: boolean;
  name: string;
  label: string;
  control: Control<any> | undefined;
};

const SearchBar = ({ loading, name, control, label }: Props) => {
  const {
    field: { onChange },
  } = useController({
    name,
    control,
    defaultValue: "",
  });
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    emitValue(inputValue);
  }, [inputValue]);

  const emitValue = useMemo(() => debounce((value) => onChange(value), 500), []);

  return (
    <TextField
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      value={inputValue}
      name={name}
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: <Fragment>{loading && <CircularProgress color="inherit" size={20} />}</Fragment>,
      }}
    />
  );
};

export default SearchBar;
