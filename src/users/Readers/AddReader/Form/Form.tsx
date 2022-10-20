import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import TextInput from "../../../../common/components/TextInput/TextInput";
import { emailValidator, exactLengthValidator } from "../../../../common/utils/validators";
import { useNavigate } from "react-router-dom";
import { NewUserInfo } from "../../../users.types";

import styles from "./Form.module.scss";

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
          <div className={styles.input}>
            <TextInput
              name="firstName"
              control={control}
              rules={{ required: true }}
              label="Imię"
              type="text"
            />
          </div>
          <div className={styles.input}>
            <TextInput
              name="lastName"
              control={control}
              rules={{ required: true }}
              label="Nazwisko"
              type="text"
            />
          </div>
          <div className={styles.input}>
            <TextInput
              name="email"
              control={control}
              rules={{ required: true, validate: { email: emailValidator } }}
              label="Email"
              type="text"
            />
          </div>
          <div className={styles.input}>
            <TextInput
              name="pesel"
              control={control}
              rules={{
                required: true,
                validate: {
                  exactLength: exactLengthValidator(12),
                },
              }}
              label="PESEL"
              type="number"
            />
          </div>
          <div className={styles.input}>
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
