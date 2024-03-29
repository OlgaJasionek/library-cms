import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Cockpit from "./cockpit/Cockpit";
import Snackbar from "./common/components/Snackbar/Snackbar";
import { DecodedToken } from "./common/types/jwt";
import { selectCurrentUser, selectIsInitialLoaded, setData } from "./core/store/current-user";
import { setUnreadMessagesCount } from "./core/store/chat";
import Login from "./login/Login";
import { getUnreadMessagesNumber } from "./login/login.api";
import { useDocumentTitle } from "./common/hooks/use-document-title";

function App() {
  const [error, setError] = useState<string | null | undefined>(null);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const isCurrentUserInitialLoaded = useSelector(selectIsInitialLoaded);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setDocumentTitle] = useDocumentTitle();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    setDocumentTitle("Biblioteka");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token || "") || null;
      dispatch(setData(decodedToken.user));
      getUnreadMessagesCount();
    } else {
      dispatch(setData(null));
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

  const getUnreadMessagesCount = async () => {
    try {
      const resp = await getUnreadMessagesNumber();

      dispatch(setUnreadMessagesCount(resp));
    } catch (err) {}
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  if (!isCurrentUserInitialLoaded) {
    return null;
  }

  return (
    <div className="h-100">
      <Snackbar open={openErrorSnackbar} text={error} handleClose={handleCloseErrorSnackbar} color="error" />
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isCurrentUserInitialLoaded && currentUser ? "/assets/list" : "/login"} replace />
          }
        />

        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Cockpit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
