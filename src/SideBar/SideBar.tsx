import { useRef, useState } from "react";
import { Book, Group, Headset, LocalGroceryStore, MenuBook } from "@mui/icons-material";
import classnames from "classnames";

import Logo from "../common/components/Logo/Logo";
import { useClickOutside } from "../common/hooks/use-click-outside";

import styles from "./SideBar.module.scss";

const links = [
  { id: 1, name: "Czytelnicy", icon: <Group />, chosen: false },
  { id: 2, name: "Czasopisma", icon: <Book />, chosen: false },
  { id: 3, name: "Audiobook", icon: <Headset />, chosen: false },
  { id: 4, name: "Książki", icon: <MenuBook />, chosen: false },
  { id: 5, name: "Zamówienia", icon: <LocalGroceryStore />, chosen: false },
];

type Props = {
  openSideBar: boolean;
  onCloseSideBar: () => void;
};

const SideBar = ({ openSideBar, onCloseSideBar }: Props) => {
  const [sideBarItems, setSideBarItems] = useState(links);
  const sideBarRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(sideBarRef, () => onCloseSideBar());

  const chosenHandler = (id: number) => {
    const chosenItems = sideBarItems.map((item) => ({
      ...item,
      chosen: item.id === id,
    }));

    setSideBarItems(chosenItems);
  };

  return (
    <div ref={sideBarRef} className={classnames(styles.sidebar, { [styles["sidebar--open"]]: openSideBar })}>
      <Logo />
      <hr className={styles.separator} />
      <ul className={styles.list}>
        {sideBarItems.map((link) => (
          <li key={link.id} onClick={() => chosenHandler(link.id)}>
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
