import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-[#252422] text-[#edf2f4] p-5">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
