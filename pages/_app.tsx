import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";

import "@/styles/globals.css";
import { lightTheme } from "@/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
