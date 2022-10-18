import { useRef, useState } from "react";
import * as Icons from "@mui/icons-material";
import classnames from "classnames";

import Logo from "../../../common/components/Logo/Logo";
import { useClickOutside } from "../../../common/hooks/use-click-outside";

import styles from "./SideBar.module.scss";
import { useNavigate } from "react-router-dom";

const links = [
  { id: 1, name: "Czytelnicy", icon: <Icons.Group />, chosen: false, path: "/users/readers" },
  { id: 2, name: "Kategorie", icon: <Icons.Book />, chosen: false, path: "/assets/categories" },
];

type Props = {
  openSideBar: boolean;
  onCloseSideBar: () => void;
};

const SideBar = ({ openSideBar, onCloseSideBar }: Props) => {
  const [sideBarItems, setSideBarItems] = useState(links);
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useClickOutside(sideBarRef, () => onCloseSideBar());

  const chooseHandler = (id: number, path: string) => {
    const chosenItems = sideBarItems.map((item) => ({
      ...item,
      chosen: item.id === id,
    }));

    setSideBarItems(chosenItems);
    navigate(path);
  };

  return (
    <div ref={sideBarRef} className={classnames(styles.sidebar, { [styles["sidebar--open"]]: openSideBar })}>
      <Logo />
      <hr className={styles.separator} />
      <ul className={styles.list}>
        {sideBarItems.map((link) => (
          <li key={link.id} onClick={() => chooseHandler(link.id, link.path)}>
            <a
              className={classnames(styles.link, {
                [styles.active]: link.chosen,
              })}
            >
              {link.icon}
              <div className={styles.text}>{link.name} </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SideBar;
