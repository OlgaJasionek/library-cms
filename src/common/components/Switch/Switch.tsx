import classnames from "classnames";
import { Control, useController } from "react-hook-form";

import styles from "./Switch.module.scss";

type Props = {
  name: string;
  label: string;
  control: Control<any> | undefined;
};

const Switch = ({ name, label, control }: Props) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <>
      <div className={styles.root}>
        <input
          type="checkbox"
          name={name}
          id="switch"
          className={styles.input}
          checked={value}
          onChange={onChange}
        />
        <label htmlFor="switch">
          <div className={classnames(styles.thumb, { [styles.movethumb]: value })}></div>
          <div className={classnames(styles.track, { [styles.changetrack]: value })}></div>
          <span className={styles.labelText}>{label}</span>
        </label>
      </div>
    </>
  );
};

export default Switch;
