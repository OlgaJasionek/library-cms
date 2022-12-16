import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";

import { SelectOption } from "../../types/select-option";

type Props = {
  label: string;
  options: SelectOption[];
  name: string;
  control: Control<any>;
};

const CheckBoxGroup = ({ label, options, name, control }: Props) => {
  const {
    field: { onChange },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const [expanded, setExpanded] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<string[]>([]);

  useEffect(() => {
    emitValue(inputValues);
  }, [inputValues]);

  const emitValue = (value: string[]) => onChange(value);

  const changeValues = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setInputValues((prevState) => {
      if (event.target.checked) {
        if (prevState.find((item) => item === value)) {
          return prevState;
        }
        return [...prevState, value as string];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const showMoreOptions = () => {
    setExpanded(true);
  };

  const hideMoreOptions = () => {
    setExpanded(false);
  };

  return (
    <>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="outlined">
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {options.slice(0, expanded ? options.length : 5).map((option) => (
            <FormControlLabel
              name={name}
              key={option.value}
              control={
                <Checkbox
                  value={option.value}
                  onChange={(event) => changeValues(event, option.value as string)}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
        {options.length > 5 && (
          <div className="d-flex justify-content-end w-100">
            {expanded ? (
              <Button onClick={hideMoreOptions}>
                Pokaż mniej <ArrowDropUp />
              </Button>
            ) : (
              <Button onClick={showMoreOptions}>
                Pokaż więcej <ArrowDropDown />
              </Button>
            )}
          </div>
        )}
      </FormControl>
    </>
  );
};

export default CheckBoxGroup;
