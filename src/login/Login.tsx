import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import TextInput from "../common/components/TextInput/TextInput";
import Snackbar from "../common/components/Snackbar/Snackbar";

import styles from "./Login.module.scss";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { handleSubmit, control } = useForm<FormValues>();
  const [error, setError] = useState<string | null | undefined>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (body: FormValues) => {
    try {
      setLoading(true);
      const resp = await axios.post("http://vps-9be06b3a.vps.ovh.net/api/auth/login", body);
      const token = resp.data.token;
      localStorage.setItem("token", token);
      navigate("/");
      setOpenSnackbar(false);
    } catch (err) {
      const errorText = (err as AxiosError<{ message: string }>).response?.data.message;
      setError(errorText);
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
    setError(null);
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
              type="text"
            />
          </div>
          <div className="form-field">
            <TextInput
              name="password"
              control={control}
              rules={{ required: true, minLength: 8 }}
              label="Hasło"
              type="password"
            />
          </div>
          <LoadingButton type="submit" variant="contained" loading={loading} role="progressbar">
            Zaloguj się
          </LoadingButton>
          <Snackbar open={openSnackbar} error={error} handleClose={handleClose} color="error" />
        </form>
      </div>
    </div>
  );
};
export default Login;
