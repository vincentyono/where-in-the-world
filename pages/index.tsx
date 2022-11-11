import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Home - Where in the world?</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <Header />
      </main>
    </Fragment>
  );
};

export default Home;
