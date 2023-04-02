import Head from "next/head";
import { Exo } from "next/font/google";
import { GetStaticProps } from "next";
import { getCurrentBoe } from "@/database";

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
        <h1 className="text-2xl ">BOE resumido</h1>
        <section></section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // await getCurrentBoe();

  return {
    props: {},
  };
};
