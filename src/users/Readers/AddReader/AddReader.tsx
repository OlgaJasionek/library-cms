import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Alert } from "@mui/material";

import Card from "../../../common/components/Card/Card";
import { addNewReader } from "../../users.api";
import AddReaderForm from "./Form/Form";
import { NewUserInfo } from "../../users.types";

import styles from "./AddReader.module.scss";

const AddReader = () => {
  const [passwordForUser, setPasswordForUser] = useState<string>("");

  const submitHandler = async (body: NewUserInfo): Promise<void> => {
    try {
      const resp = await addNewReader(body);
      setPasswordForUser(resp.password);
    } catch (err) {}
  };

  return (
    <div className="container--sm">
      <div className={styles.header}>
        <h2>Dodaj nowego czytelnika</h2>
        <Link to="/users/readers" className={styles.link}>
          <ArrowBack /> Czytelnicy
        </Link>
      </div>
      {passwordForUser ? (
        <Alert severity="success">
          <p> Pomyślnie dodano nowego czytelnika!</p>
          <span>
            Hasło do logowania: <strong className={styles.password}>{passwordForUser}</strong>
          </span>
        </Alert>
      ) : (
        <Card>
          <AddReaderForm onSave={submitHandler} />
        </Card>
      )}
    </div>
  );
};

export default AddReader;
