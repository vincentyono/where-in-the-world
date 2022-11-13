import { Fragment, useContext, useState } from "react";
import type { ChangeEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/Header";
import { DarkModeContext } from "./_app";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { DarkModeContextInterface } from "./_app";
import axios from "axios";
import CountryInterface from "../interfaces/CountryInterface";
import { NextPage } from "next";
import CountryCard from "../components/CountryCard";

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
    setCountryList(
      data.filter((country) => {
        return country.region == event.target.value;
      })
    );

    console.log(countryList);
  };

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
                onChange={searchHandler}
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
    </Fragment>
  );
};

export default Home;
