import { useState } from "react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import TextInput from "../common/components/TextInput/TextInput";
import Logo from "../common/components/Logo/Logo";
import { emailValidator } from "../common/utils/validators";
import { login } from "./login.api";

import styles from "./Login.module.scss";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { handleSubmit, control } = useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (body: FormValues) => {
    try {
      setLoading(true);
      const resp = await login(body);
      const token = resp.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {}

    setLoading(false);
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
                validate: { email: emailValidator },
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
        </form>
      </div>
    </div>
  );
};

export default Login;
