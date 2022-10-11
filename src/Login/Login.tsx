import { useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import TextInput from "../common/components/TextInput/TextInput";
import Snackbar from "../common/components/Snackbar/Snackbar";
import Logo from "../common/components/Logo/Logo";
import http from "../core/Components/api/http";

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
      const resp = await http.post("auth/login", body);
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

  const handleCloseSnackbar = () => {
    setError(null);
    setOpenSnackbar(false);
  };

  return (
    <div className={styles.container}>
      <div className={classnames(styles.wrapper, "shadow p-3 mb-5 bg-body rounded")}>
        <Logo />
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
          <Snackbar open={openSnackbar} text={error} handleClose={handleCloseSnackbar} color="error" />
        </form>
      </div>
    </div>
  );
};

export default Login;
