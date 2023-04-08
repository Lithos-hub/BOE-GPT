import MainLayout from "@/components/Layout/MainLayout";
import { IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const ABoutPage = () => {
  return (
    <MainLayout
      sectionTitle="Sobre el proyecto"
      title="BOE·GPT | Acerca del proyecto"
      description="Filosofía y naturaleza del proyecto."
    >
      <>
        <Image
          src="/logo-banner.png"
          width="0"
          height="0"
          sizes="100vw"
          alt="BOE·GPT logo"
          className="h-[100px] w-auto mx-auto my-5"
        />
        <article className="w-full lg:w-1/2 mx-auto text-justify font-extralight">
          <p className="text-lg">
            El objetivo del proyecto es facilitar el acceso a la información
            relativa al{" "}
            <strong className="text-primary-3 font-bold">
              Boletín Oficial del Estado de España
            </strong>{" "}
            de forma resumida y con un lenguaje de fácil comprensión. Esta
            aplicación emplea tecnología de <i>Web Scraping</i> para extraer la
            información de cada boletín para luego ser procesada con
            inteligencia artificial (ChatGPT) y{" "}
            <strong className="text-primary-3 font-bold">
              obtener así un resumen además de una serie de conclusiones,
              aspectos positivos y negativos de la redacción del texto o de las
              propias medidas que se exponen en él (a juicio de la propia IA).
            </strong>
          </p>
          <br />
          <p className="text-lg">
            <strong className="text-primary-3 font-bold">
              Es importante destacar que la IA puede cometer errores a la hora
              de resumir la información.
            </strong>{" "}
            Por lo que recomendamos que siempre se consulte la{" "}
            <a href="https://boe.es/" className="text-cyan-500 underline">
              web oficial
            </a>{" "}
            de la Agencia Estatal Boletín Oficial del Estado.
          </p>
          <br />
          <p className="text-lg">
            Cada día se aprueban una serie de leyes y medidas que nos afectan a
            todos, y consideramos que es nuestra responsabilidad como ciudadanos
            el ser plenamente conscientes de todas estas medidas, su efecto en
            nuestras vidas y en qué medida se produce ese efecto.
          </p>
          <br />
          <p className="text-lg">
            Por otro lado, la herramienta solo rastrea la información referente
            al primer apartado{" "}
            <strong className="text-primary-3 font-bold">
              I. Disposiciones generales
            </strong>
            , quedando excluídas el resto de secciones por el momento debido a
            la gran cantidad de información y recursos que se consumiría.
          </p>
          <br />
          <p className="text-lg">
            Por supuesto,{" "}
            <strong className="text-primary-3 font-bold">
              el proyecto es completamente sin ánimo de lucro
            </strong>
            , siendo el único fin del mismo lo expuesto anteriormente.
          </p>
          <br />
          <p className="text-lg">
            Si eres desarrollador y quieres colaborar en este proyecto, te
            dejamos el repo aquí debajo:
          </p>
          <div className="flex justify-center mx-auto text-6xl">
            <Link href="https://github.com/Lithos-hub/boe-resumido">
              <IconButton size="large">
                <GitHub fontSize="large" />
              </IconButton>
            </Link>
          </div>
          <p className="text-lg text-center">Muchas gracias ❤️</p>
        </article>
      </>
    </MainLayout>
  );
};

export default ABoutPage;
