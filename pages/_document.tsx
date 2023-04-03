import { Navbar } from "@/components";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-[#252422] text-[#edf2f4] p-5">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
