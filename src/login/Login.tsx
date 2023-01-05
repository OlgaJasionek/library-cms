import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { RadioGroup } from "@mui/material";

import TextInput from "../common/components/TextInput/TextInput";
import Logo from "../common/components/Logo/Logo";
import { emailValidator } from "../common/utils/validators";
import { getUnreadMessagesNumber, login } from "./login.api";
import { DecodedToken } from "../common/types/jwt";
import { setData } from "../core/store/current-user";
import { setUnreadMessagesCount } from "../core/store/chat";
import { UserRole } from "../users/users.types";
import RadioButton from "../common/components/RadioButton/RadioButton";
import { useDocumentTitle } from "../common/hooks/use-document-title";

import styles from "./Login.module.scss";

type FormValues = {
  email: string;
  password: string;
};

const users = [
  { type: UserRole.Librarian, email: "janina@gmail.com", password: "nowe1234", label: "Bibliotekarz" },
  {
    type: UserRole.Reader,
    email: "zywiolek@gmail.com",
    password: "zywiolek1234",
    label: "Czytelnik",
  },
];

const Login = () => {
  const { handleSubmit, control, setValue } = useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setDocumentTitle] = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle("Zaloguj się");
  }, []);

  const getUnreadMessagesCount = async () => {
    try {
      const resp = await getUnreadMessagesNumber();
      dispatch(setUnreadMessagesCount(resp));
    } catch (err) {}
  };

  const markUserToLoginHandler = (type: string | undefined) => {
    if (type) {
      const userToLogin = users.find((user) => user.type === type);

      if (userToLogin) {
        setValue("email", userToLogin.email);
        setValue("password", userToLogin.password);
      }
    }
  };

  const onSubmit = async (body: FormValues) => {
    try {
      setLoading(true);
      const resp = await login(body);
      const token = resp.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode<DecodedToken>(token || "") || null;

      dispatch(setData(decodedToken.user));
      navigate(decodedToken.user.role === UserRole.Librarian ? "/assets/rentals" : "/assets/list");

      getUnreadMessagesCount();
    } catch (err) {}

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={classnames(styles.wrapper, "shadow p-3 mb-5 bg-body rounded")}>
        <Logo />
        <h2 className={styles.header}>Zaloguj się</h2>
        <p className={styles.quote}>
          "Czytanie książek to najpiękniejsza zabawa, jaką sobie ludzkość wymyśliła"
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="form-field text-center">
            <p>Zaloguj się jako: </p>
            <RadioGroup>
              <div className="d-flex justify-content-center">
                {users.map((user) => (
                  <RadioButton
                    type={user.type}
                    label={user.label}
                    value={user.type}
                    onMarkOption={markUserToLoginHandler}
                  />
                ))}
              </div>
            </RadioGroup>
          </div>
          <div className="form-field">
            <TextInput
              name="email"
              control={control}
              rules={{
                required: true,
                validate: { email: emailValidator },
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
