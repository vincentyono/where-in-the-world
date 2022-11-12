import { useContext } from "react";
import { MoonIcon as MoonOutline } from "@heroicons/react/24/outline";
import { MoonIcon as MoonSolid } from "@heroicons/react/24/solid";
import styles from "../styles/Header.module.scss";
import { DarkModeContext, DarkModeContextInterface } from "../pages/_app";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(
    DarkModeContext
  ) as DarkModeContextInterface;

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <h1>Where in the world?</h1>
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
