import { Exo } from "next/font/google";
import { GetStaticProps } from "next";
import { getCurrentBoe } from "@/database";
import { Navbar } from "@/components";
import MainLayout from "@/components/Layout/MainLayout";
import { formatDate } from "@/utils";

const inter = Exo({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={inter.className}>
        <MainLayout
          title="BOE·GPT | El BOE de hoy"
          sectionTitle={`El BOE de hoy - ${formatDate(new Date().getTime())}`}
          description="Aplicación ver un resumen diario del Boletín Oficial del Estado (BOE) mediante uso de inteligencia artificial"
        >
          <>
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
  await getCurrentBoe();

  return {
    props: {},
  };
};
