import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import axios from "axios";

import TextInput from "../common/components/TextInput";

import styles from "./Login.module.scss";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { handleSubmit, control } = useForm<FormValues>();

  const onSubmit = async (body: FormValues) => {
    try {
      const resp = await axios.post("http://vps-9be06b3a.vps.ovh.net/api/auth/login", body);
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={classnames(styles.wrapper, "shadow p-3 mb-5 bg-body rounded")}>
        <ImportContactsIcon className={styles.bookIcon} />
        <h2 className={styles.header}>Zaloguj się</h2>
        <p className={styles.quote}>
          "Czytanie książek to najpiękniejsza zabawa, jaką sobie ludzkość wymyśliła "
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="form-field">
            <TextInput
              name="email"
              control={control}
              rules={{
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              }}
              label="Adres Email"
            />
          </div>
          <div className="form-field">
            <TextInput
              name="password"
              control={control}
              rules={{ required: true, minLength: 8 }}
              label="Hasło"
            />
          </div>
          <Button type="submit" variant="contained">
            Zaloguj się
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Login;
