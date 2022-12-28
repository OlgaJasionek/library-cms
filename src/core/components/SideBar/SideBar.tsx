import { useEffect, useRef, useState } from "react";
import * as Icons from "@mui/icons-material";
import classnames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/current-user";
import Logo from "../../../common/components/Logo/Logo";
import { useClickOutside } from "../../../common/hooks/use-click-outside";
import { UserRole } from "../../../users/users.types";

import styles from "./SideBar.module.scss";

const linksForLibrarian = [
  {
    id: 1,
    name: "Czytelnicy",
    icon: <Icons.Group />,
    path: "/users/readers",
  },
  {
    id: 2,
    name: "Kategorie",
    icon: <Icons.Book />,
    path: "/assets/categories",
  },
  {
    id: 3,
    name: "Autorzy",
    icon: <Icons.FolderShared />,
    path: "/assets/authors",
  },
  {
    id: 4,
    name: "Katalog Książek",
    icon: <Icons.MenuBook />,
    path: "/assets/list",
  },
  {
    id: 5,
    name: "Wypożyczenia",
    icon: <Icons.AddCard />,
    path: "/assets/rentals",
  },
];

const linksForReader = [
  {
    id: 4,
    name: "Katalog Książek",
    icon: <Icons.MenuBook />,
    path: "/assets/list",
  },
];

type Props = {
  openSideBar: boolean;
  onCloseSideBar: () => void;
};

type SideBarItem = {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
};

const SideBar = ({ openSideBar, onCloseSideBar }: Props) => {
  const [sideBarItems, setSideBarItems] = useState<SideBarItem[]>([]);
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();

  useClickOutside(sideBarRef, () => onCloseSideBar());

  useEffect(() => {
    showLinksWithIncludeAccess();
  }, [currentUser]);

  const showLinksWithIncludeAccess = () => {
    if (currentUser) {
      setSideBarItems(currentUser.role === UserRole.Librarian ? linksForLibrarian : linksForReader);
    }
  };

  const chooseHandler = (path: string) => {
    navigate(path);
  };

  return (
    <div ref={sideBarRef} className={classnames(styles.sidebar, { [styles["sidebar--open"]]: openSideBar })}>
      <Logo />
      <hr className={styles.separator} />
      <ul className={styles.list}>
        {sideBarItems.map((link) => (
          <li key={link.id} onClick={() => chooseHandler(link.path)}>
            <a
              className={classnames(styles.link, {
                [styles.active]: link.path === location.pathname,
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
