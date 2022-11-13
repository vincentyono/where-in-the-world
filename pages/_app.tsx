import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { createContext, useState, Dispatch, SetStateAction } from "react";

export interface DarkModeContextInterface {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<DarkModeContextInterface | {}>({});

const App = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Component {...pageProps} />;
    </DarkModeContext.Provider>
  );
};

export default App;
