import type { NextPage } from "next";
import { ChangeEvent } from "react";
import type { DarkModeContextInterface } from "./_app";
import type CountryInterface from "../interfaces/CountryInterface";

import { useContext, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Header from "../components/Header";
import { DarkModeContext } from "./_app";
import CountryCard from "../components/CountryCard";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import styles from "../styles/Home.module.scss";
import style from "../styles/DarkMode.module.scss";
import { Html } from "next/document";

export const getStaticProps = async () => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  const data = response.data;
  return {
    props: {
      data,
    },
  };
};

const Home: NextPage<{ data: CountryInterface[] }> = ({ data }) => {
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextInterface;
  const [countryList, setCountryList] = useState(data);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "") setCountryList(data);
    else
      setCountryList(
        data.filter((country) => {
          return (
            country.name.common
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            country.name.official
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          );
        })
      );
  };

  const filterHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountryList((prev) =>
      prev.filter((country) => {
        return country.region == event.target.value;
      })
    );
  };

  return (
    <Html lang="en">
      <Head>
        <title>Home - Where in the world?</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main
        className={`${styles.main} ${
          darkMode ? style.dark_bg : style.light_bg
        }`}
      >
        <Header />
        <div className={styles.container}>
          <div className={styles.filter_container}>
            <div
              className={`${styles.search} ${
                darkMode
                  ? `${style.dark_element} ${style.dark_shadow}`
                  : `${style.light_element} ${style.light_shadow}`
              }`}
            >
              <MagnifyingGlassIcon id={styles.magnifying_glass} />
              <input
                type="text"
                placeholder="Search for a country..."
                className={darkMode ? style.dark_element : style.light_element}
                onChange={searchHandler}
              />
            </div>
            <div
              className={`${styles.filter} ${
                darkMode
                  ? `${style.dark_element} ${style.dark_shadow}`
                  : `${style.light_element} ${style.light_shadow}`
              }`}
            >
              <select
                name="filter"
                className={darkMode ? style.dark_element : style.light_element}
                onChange={filterHandler}
              >
                <option value="None" hidden>
                  Filter by Region
                </option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
              <ChevronDownIcon id={styles.down_arrow} />
            </div>
          </div>
          <div className={styles.card_container}>
            {countryList.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        </div>
      </main>
    </Html>
  );
};

export default Home;
