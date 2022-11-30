import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import Cockpit from "./cockpit/Cockpit";
import Snackbar from "./common/components/Snackbar/Snackbar";
import { DecodedToken } from "./common/types/jwt";
import { setData } from "./core/store/current-user";

import Login from "./login/Login";

function App() {
  const [error, setError] = useState<string | null | undefined>(null);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token || "") || null;
      dispatch(setData(decodedToken.user));
    }

    axios.interceptors.response.use(
      (config) => config,
      (error) => {
        const err: AxiosError<{ message: string }> = error;
        const errorText = err.response?.data.message;

        setError(errorText);

        if (err.response?.status === 401) {
          navigate("/login");
        }

        if (err.response?.status === 500) {
          setError("Wystąpił niezidentyfikowany błąd serwera");
        }

        setOpenErrorSnackbar(true);

        return Promise.reject(err);
      }
    );
  }, []);

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
    setError(null);
  };

  return (
    <div className="h-100">
      <Snackbar open={openErrorSnackbar} text={error} handleClose={handleCloseErrorSnackbar} color="error" />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Cockpit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
