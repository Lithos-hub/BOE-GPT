import Head from "next/head";
import { Exo } from "next/font/google";
import { GetStaticProps } from "next";
import { getCurrentBoe } from "@/database";
import { Navbar } from "@/components";
import MainLayout from "@/components/Layout/MainLayout";

const inter = Exo({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={inter.className}>
        <MainLayout
          title="Te resumo el BOE | El BOE de hoy"
          description="Aplicación ver un resumen diario del Boletín Oficial del Estado (BOE) mediante uso de inteligencia artificial"
        >
          <>
            <h1 className="text-2xl text-center">El BOE de hoy</h1>
            <hr className="my-5" />
            <strong className="font-bold text-xl">Resumen: </strong>

            <ul className="text-center">
              <li className="my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                non?
              </li>
              <li className="my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                non?
              </li>
              <li className="my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                non?
              </li>
            </ul>

            <hr className="my-5" />

            <h2>Puntos importantes a destacar: </h2>

            <ul className="text-center">
              <li className="my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                non?
              </li>
              <li className="my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                non?
              </li>
              <li className="my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                non?
              </li>
            </ul>
          </>
        </MainLayout>
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
