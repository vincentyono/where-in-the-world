import { Fragment, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/Header";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <Fragment>
      <Head>
        <title>Home - Where in the world?</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main
        className={`${styles.main} ${
          darkMode ? styles.dark_bg : styles.light_bg
        }`}
      >
        <Header />
        <div className={styles.container}>
          <div className={styles.filter_container}>
            <div
              className={`${styles.search} ${
                darkMode
                  ? `${styles.dark_element} ${styles.dark_shadow}`
                  : `${styles.light_element} ${styles.light_shadow}`
              }`}
            >
              <MagnifyingGlassIcon id={styles.magnifying_glass} />
              <input
                type="text"
                placeholder="Search for a country..."
                className={
                  darkMode ? styles.dark_element : styles.light_element
                }
              />
            </div>
            <div
              className={`${styles.filter} ${
                darkMode
                  ? `${styles.dark_element} ${styles.dark_shadow}`
                  : `${styles.light_element} ${styles.light_shadow}`
              }`}
            >
              <select
                name="filter"
                className={
                  darkMode ? styles.dark_element : styles.light_element
                }
              >
                <option value="None" hidden>
                  Filter by Region
                </option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
              <ChevronDownIcon id={styles.down_arrow} />
            </div>
          </div>
          <div className={styles.card_container}></div>
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
