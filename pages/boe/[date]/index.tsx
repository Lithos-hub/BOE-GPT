import { useMemo } from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { getAllDatesFrom2000 } from "@/utils";

import MainLayout from "@/components/Layout/MainLayout";

import { getBOEByDate } from "@/playwright";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";
import { BoeDictionary, IBoe } from "@/interfaces";
import { GetStaticPaths } from "next";
import { dbBoe } from "@/database";

interface Props {
  date: string;
  responseGPT: string | null;
  dictionaryData?: BoeDictionary;
}

const HomePage: NextPage<Props> = ({ responseGPT, date, dictionaryData }) => {
  const titles = useMemo(
    () => (dictionaryData ? Object.keys(dictionaryData) : []),
    [dictionaryData]
  );

  return (
    <main>
      <MainLayout
        title={`BOE·GPT | ${date}`}
        sectionTitle={`El BOE a fecha de ${date}`}
        description="Aplicación ver un resumen diario del Boletín Oficial del Estado (BOE) mediante uso de inteligencia artificial"
      >
        <>
          {dictionaryData ? (
            <section className="flex flex-col gap-5">
              {titles.map((title, i) => (
                <Accordion key={i} className={`section-${i} border`}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    {title}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col gap-5">
                      {dictionaryData[title].map(({ boe, subtitle }, i) => (
                        <div
                          key={i}
                          className="flex justify-between gap-5 items-center"
                        >
                          <div>
                            <strong> {subtitle} </strong>
                            <h5>{boe}</h5>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/boe/${date}/${boe}`}>
                              <Button variant="outlined">Resumen</Button>
                            </Link>
                            <a
                              href={`https://boe.es/diario_boe/txt.php?id=${boe}`}
                              target="_blank"
                            >
                              <Button variant="outlined" color="warning">
                                BOE original
                              </Button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </section>
          ) : (
            <h1 className="text-red-500 font-bold text-lg mx-auto">
              No se ha publicado un BOE en la fecha de hoy
            </h1>
          )}
        </>
      </MainLayout>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = (ctx) => {
  const datesArray = getAllDatesFrom2000();

  const paths = datesArray.map((date) => ({
    params: {
      date,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let data: string | null = null;
  let dictionary = null;
  const { date } = params as { date: string };
  const boe: IBoe | null = await dbBoe.getBoeByDate(date);

  if (!boe) {
    try {
      dictionary = (await getBOEByDate(date)) as BoeDictionary;
    } catch (error) {
      console.log("ERROR", error);
    }
  } else {
    data = boe.summary;
  }
  return {
    props: {
      date,
      responseGPT: data,
      dictionaryData: dictionary ? dictionary.dictionaryData : null,
    },
  };
};

export default HomePage;
