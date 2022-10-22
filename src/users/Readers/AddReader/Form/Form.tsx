import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TextInput from "../../../../common/components/TextInput/TextInput";
import { emailValidator, exactLengthValidator } from "../../../../common/utils/validators";
import { NewUserInfo } from "../../../users.types";

type Props = {
  onSave: (body: NewUserInfo) => Promise<void>;
};

const AddReaderForm = ({ onSave }: Props) => {
  const { handleSubmit, control } = useForm<NewUserInfo>();
  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={handleSubmit(onSave)}>
        <div>
          <div className="form-field">
            <TextInput name="firstName" control={control} rules={{ required: true }} label="Imię" />
          </div>
          <div className="form-field">
            <TextInput name="lastName" control={control} rules={{ required: true }} label="Nazwisko" />
          </div>
          <div className="form-field">
            <TextInput
              name="email"
              control={control}
              rules={{ required: true, validate: { email: emailValidator } }}
              label="Email"
            />
          </div>
          <div className="form-field">
            <TextInput
              name="pesel"
              control={control}
              rules={{
                required: true,
                validate: {
                  exactLength: exactLengthValidator(11),
                },
              }}
              label="PESEL"
              type="number"
            />
          </div>
          <div className="form-field">
            <TextInput
              name="phoneNumber"
              control={control}
              rules={{ required: true, validate: { exactLength: exactLengthValidator(9) } }}
              label="Numer telefonu"
              type="number"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            className="m-2"
            variant="outlined"
            onClick={() => {
              navigate("/users/readers");
            }}
          >
            Anuluj
          </Button>
          <Button className="m-2" variant="contained" type="submit">
            Zapisz
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddReaderForm;
