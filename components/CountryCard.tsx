import { useContext } from "react";
import { DarkModeContext, DarkModeContextInterface } from "../pages/_app";
import Link from "next/link";
import Image from "next/image";
import CountryInterface from "../interfaces/CountryInterface";
import styles from "../styles/CountryCard.module.scss";
import style from "../styles/DarkMode.module.scss";

const CountryCard = ({ country }: { country: CountryInterface }) => {
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextInterface;

  return (
    <Link href={`/${country.cca3.toLowerCase()}`}>
      <div
        className={`${styles.container} ${
          darkMode
            ? `${style.dark_element} ${style.dark_shadow}`
            : `${style.light_element} ${style.light_shadow}`
        }`}
      >
        <Image
          id={styles.flag}
          className={darkMode ? style.dark_shadow : style.light_shadow}
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          width={300}
          height={165}
        />
        <div className={styles.info_container}>
          <h3>{country.name.common}</h3>
          <div className={`${styles.info_detail}`}>
            <p>
              <span className={styles.info_label}>Population:</span>{" "}
              {` ${country.population.toLocaleString()}`}
            </p>
            <p>
              <span className={styles.info_label}>Region:</span>{" "}
              {` ${country.region}`}
            </p>
            <p>
              <span className={styles.info_label}>Capital:</span>{" "}
              {` ${country.capital ? country.capital : "-"}`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
