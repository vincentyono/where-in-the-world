import { useContext } from "react";
import { MoonIcon as MoonOutline } from "@heroicons/react/24/outline";
import { MoonIcon as MoonSolid } from "@heroicons/react/24/solid";
import { DarkModeContext, DarkModeContextInterface } from "../pages/_app";
import Link from "next/link";

import styles from "../styles/Header.module.scss";
import style from "../styles/DarkMode.module.scss";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(
    DarkModeContext
  ) as DarkModeContextInterface;

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <Link href="/">
        <h1 className={darkMode ? style.dark_text : style.light_text}>
          Where in the world?
        </h1>
      </Link>
      <div
        className={styles.darkmode}
        onClick={() => {
          setDarkMode((prev) => !prev);
        }}
      >
        {darkMode ? (
          <MoonSolid id={styles.moon} />
        ) : (
          <MoonOutline id={styles.moon} />
        )}
        <span>Dark Mode</span>
      </div>
    </div>
  );
};

export default Header;
