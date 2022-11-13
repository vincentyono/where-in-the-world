import { useContext } from "react";
import { DarkModeContext, DarkModeContextInterface } from "../pages/_app";
import Link from "next/link";
import Image from "next/image";
import CountryInterface from "../interfaces/CountryInterface";
import styles from "../styles/CountryCard.module.scss";

const CountryCard = ({ country }: { country: CountryInterface }) => {
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextInterface;

  return (
    <Link href={`/${country.cca2.toLowerCase()}`}>
      <div
        className={`${styles.container} ${
          darkMode
            ? `${styles.dark_element} ${styles.dark_shadow}`
            : `${styles.light_element} ${styles.light_shadow}`
        }`}
      >
        <Image
          id={styles.flag}
          className={darkMode ? styles.dark_shadow : styles.light_shadow}
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
              {` ${country.capital}`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
