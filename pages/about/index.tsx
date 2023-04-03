import MainLayout from "@/components/Layout/MainLayout";
import { IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const ABoutPage = () => {
  return (
    <MainLayout
      title="BOE·GPT | Acerca del proyecto"
      description="Filosofía y naturaleza del proyecto."
    >
      <article>
        <Image
          src="/logo-banner.png"
          width="0"
          height="0"
          sizes="100vw"
          alt="BOE·GPT logo"
          className="h-[100px] w-auto mx-auto"
        />

        <h1 className="text-2xl">Sobre el proyecto</h1>
        <hr className="my-5" />
        <p>
          El objetivo del proyecto es facilitar el acceso a la información
          relativa al Boletín Oficial del Estado de forma resumida y con un
          lenguaje de fácil comprensión.
        </p>
        <br />
        <p>
          Cada día se aprueban una serie de leyes y medidas que nos afectan a
          todos, y consideramos que es nuestra responsabilidad como ciudadanos
          el ser plenamente conscientes de todas estas medidas, su efecto en
          nuestras vidas y en qué medida se produce ese efecto.
        </p>
        <br />
        <p>
          Esta aplicación emplea tecnología de <i>Web Scraping</i> para extraer
          la información de cada boletín para luego ser procesada con
          inteligencia artificial (ChatGPT) y obtener así un resumen además de
          una serie de conclusiones.
        </p>
        <br />
        <p>
          Por supuesto, el proyecto es completamente sin ánimo de lucro, siendo
          el único fin del mismo lo expuesto anteriormente.
        </p>
        <br />
        <p>
          Si eres desarrollador y quieres colaborar en este proyecto, puedes
          acceder al repositorio del mismo a través del siguiente enlace:
        </p>
        <div className="flex justify-center mx-auto mt-5 text-6xl">
          <Link href="https://github.com/Lithos-hub/boe-resumido">
            <IconButton size="large">
              <GitHub fontSize="large" />
            </IconButton>
          </Link>
        </div>
      </article>
    </MainLayout>
  );
};

export default ABoutPage;
