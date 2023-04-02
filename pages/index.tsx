import Head from "next/head";
import { Exo } from "next/font/google";
import { GetStaticProps } from "next";
import { getPDF } from "@/playwright";

const inter = Exo({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>BOE resumido</title>
        <meta
          name="description"
          content="Aplicación ver un resumen diario del Boletín Oficial del Estado (BOE) mediante uso de inteligencia artificial"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <h1>BOE resumido</h1>
        <section></section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await getPDF(); // your fetch function here

  return {
    props: {},
  };
};
