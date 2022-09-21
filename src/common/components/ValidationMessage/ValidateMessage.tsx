import styles from "./ValidationMessage.module.scss";

type Prop = {
  error: { type?: string } | undefined;
  rules: { [key: string]: boolean | number | RegExp };
  name: string;
};

const ValidateMesage = ({ error, rules, name }: Prop) => {
  const errorMessage: () => string | null | undefined = () => {
    if (error) {
      switch (error.type) {
        case "required":
          return "To pole jest wymagane";
        case "minLength":
          return `To pole musi posiadać minimum ${rules.minLength} znaków`;
        case "pattern":
          return `Niewłaściwy ${name}`;
        default:
          return null;
      }
    }
  };
  const validateMessage = errorMessage();

  return <div>{validateMessage && <p className={styles.errorText}>{validateMessage}</p>}</div>;
};
export default ValidateMesage;
