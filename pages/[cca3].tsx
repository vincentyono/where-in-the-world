import type { NextPage } from "next";
import type CountryInterface from "../interfaces/CountryInterface";

import { Fragment, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import Header from "../components/Header";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { DarkModeContext, DarkModeContextInterface } from "./_app";

import styles from "../styles/CountryDetail.module.scss";
import style from "../styles/DarkMode.module.scss";
import { Html } from "next/document";
import Link from "next/link";

export const getStaticPaths = async () => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  const data: CountryInterface[] = response.data;

  const paths = data.map((country) => {
    return {
      params: {
        cca3: country.cca3.toLowerCase(),
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { cca3: string } }) => {
  const cca3 = context.params.cca3;
  const response = await axios.get(
    `https://restcountries.com/v3.1/alpha/${cca3}`
  );
  const data: CountryInterface = response.data[0];
  const countries = [];
  if (data.borders) {
    for (let country of data.borders) {
      const res = await axios.get(
        `https://restcountries.com/v3.1/alpha/${country}`
      );
      const d = res.data[0];

      countries.push({ name: d.name.common, cca3: d.cca3 });
    }
  }

  return { props: { country: data, borders: countries } };
};

const CountryDetail: NextPage<{
  country: CountryInterface;
  borders: { name: string; cca3: string }[];
}> = ({ country, borders }) => {
  const { darkMode, setDarkMode } = useContext(
    DarkModeContext
  ) as DarkModeContextInterface;

  return (
    <Fragment>
      <Head>
        <title>{country.name.common} - Where in the world?</title>
      </Head>
      <Header />
      <main
        className={`${styles.container} ${
          darkMode ? style.dark_bg : style.light_bg
        }`}
      >
        <div className={styles.back_container}>
          <Link href="/">
            <button
              className={`${styles.back_button} ${
                darkMode
                  ? `${style.dark_element} ${style.dark_shadow}`
                  : `${style.light_element} ${style.light_shadow}`
              }`}
            >
              <ArrowLeftIcon id={styles.back_icon} />
              Back
            </button>
          </Link>
        </div>
        <div className={styles.country_container}>
          <Image
            id={styles.flag}
            className={darkMode ? style.dark_shadow : style.light_shadow}
            src={country.flags.svg}
            alt={`${country.name.official} flag`}
            width={3}
            height={2.5}
            layout="responsive"
          />
          <div className={darkMode ? style.dark_text : style.light_text}>
            <h2>{country.name.common}</h2>
            <div className={styles.country_detail_container}>
              <div>
                <p>
                  <span>Native Name:</span>
                  {` ${
                    country.name.nativeName
                      ? country.name.nativeName[
                          Object.keys(country.name.nativeName)[0]
                        ].official
                      : "-"
                  }`}
                </p>
                <p>
                  <span>Population:</span>
                  {` ${country.population.toLocaleString()}`}
                </p>
                <p>
                  <span>Region:</span>
                  {` ${country.region}`}
                </p>
                <p>
                  <span>Sub Region:</span>
                  {` ${country.subregion ? country.subregion : "-"}`}
                </p>
                <p>
                  <span>Capital:</span>
                  {` ${
                    country.capital
                      ? country.capital.map((capital, index) => {
                          if (index < country.capital.length - 1)
                            return capital + ", ";
                          return capital;
                        })
                      : "-"
                  }`}
                </p>
              </div>
              <div>
                <p>
                  <span>Top Level Domain:</span>
                  {` ${country.tld.map((tld, index) => {
                    if (index < country.tld.length - 1) return tld + ", ";
                    return tld;
                  })}`}
                </p>
                <p>
                  <span>Currencies:</span>
                  {` ${
                    country.currencies
                      ? Object.keys(country.currencies).map(
                          (currency, index) => {
                            if (
                              index <
                              Object.keys(country.currencies).length - 1
                            )
                              return country.currencies[currency].name + ", ";
                            return country.currencies[currency].name;
                          }
                        )
                      : "-"
                  }`}
                </p>
                <p>
                  <span>Languages:</span>
                  {` ${
                    country.languages
                      ? Object.keys(country.languages).map(
                          (language, index) => {
                            if (
                              index <
                              Object.keys(country.languages).length - 1
                            )
                              return country.languages[language] + ", ";
                            return country.languages[language];
                          }
                        )
                      : "-"
                  }`}
                </p>
              </div>
            </div>
            <div className={styles.border_container}>
              <span>Border Countries:</span>{" "}
              <div>
                {borders.length > 0
                  ? borders.map((country, index) => (
                      <Link key={index} href={`/${country.cca3.toLowerCase()}`}>
                        <button
                          className={`${styles.border_button} ${
                            darkMode
                              ? `${style.dark_element} ${style.dark_shadow}`
                              : `${style.light_element} ${style.light_shadow}`
                          }`}
                        >
                          {country.name}
                        </button>
                      </Link>
                    ))
                  : "-"}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default CountryDetail;
