import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import Card from "../../../common/components/Card/Card";
import TextInput from "../../../common/components/TextInput/TextInput";
import { emailValidator, exactLengthValidator } from "../../../common/utils/validators";

import styles from "./AddReaderForm.module.scss";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  pesel: number;
  phoneNumber: number;
};

const AddReaderForm = () => {
  const { handleSubmit, control } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = () => {
    console.log("dodałeś czytelnika");
  };

  return (
    <div className="container--sm">
      <div className={styles.header}>
        <h2>Dodaj nowego czytelnika</h2>
        <Link to="/users/readers" className={styles.link}>
          <ArrowBack /> Czytelnicy
        </Link>
      </div>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
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
      </Card>
    </div>
  );
};

export default AddReaderForm;
