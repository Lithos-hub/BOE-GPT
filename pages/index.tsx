import { useMemo } from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { formatDate, parseDate } from "@/utils";

import MainLayout from "@/components/Layout/MainLayout";

import { getBOEByDate } from "@/playwright";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";
import { BoeDictionary } from "@/interfaces";

interface Props {
  responseGPT: string | null;
  dictionaryData: BoeDictionary | null;
}

const HomePage: NextPage<Props> = ({ responseGPT, dictionaryData }) => {
  const titles = useMemo(
    () => (dictionaryData ? Object.keys(dictionaryData) : []),
    [dictionaryData]
  );

  const currentDate = useMemo(() => `${formatDate(new Date().getTime())}`, []);

  return (
    <main>
      <MainLayout
        title="BOE·GPT | El BOE de hoy"
        sectionTitle={`El BOE de hoy - ${currentDate}`}
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
                            <Link href={`/boe/${currentDate}/${boe}`}>
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
            <h1 className="text-red-500 font-bold text-lg text-center">
              No se ha publicado un BOE en la fecha de hoy
            </h1>
          )}
        </>
      </MainLayout>
    </main>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  let data: string | null = null;
  let dictionaryData = null;

  const currentDate = new Date().getTime();
  const parsedDate = parseDate(currentDate);

  // const boe: IBoe | null = await dbBoe.getBoeByDate(currentDate);
  const boe = null;

  if (!boe) {
    dictionaryData = await getBOEByDate(parsedDate);
    console.log(dictionaryData);
  } else {
    data = boe.summary;
  }
  return {
    props: {
      responseGPT: data,
      dictionaryData,
    },
  };
};
