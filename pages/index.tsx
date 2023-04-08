import { useMemo } from "react";
import { GetStaticProps, NextPage } from "next";

import { formatDate, parseDate } from "@/utils";

import MainLayout from "@/components/Layout/MainLayout";
import { SummaryHTML } from "@/components";

import BoeApi from "@/services/BoeAPI";
import {
  BoeDictionary,
  DBResponseError,
  DBResponseSuccess,
  IBoe,
} from "@/interfaces";
import { runCompletion } from "@/openai";
import { getBOEByDate, getCurrentBoe } from "@/playwright";
import { dbBoe } from "@/database";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface Props {
  responseGPT: string | null;
  dictionaryData?: BoeDictionary;
}

const HomePage: NextPage<Props> = ({ responseGPT, dictionaryData }) => {
  const titles = useMemo(
    () => (dictionaryData ? Object.keys(dictionaryData) : []),
    [dictionaryData]
  );

  return (
    <main>
      <MainLayout
        title="BOE·GPT | El BOE de hoy"
        sectionTitle={`El BOE de hoy - ${formatDate(new Date().getTime())}`}
        description="Aplicación ver un resumen diario del Boletín Oficial del Estado (BOE) mediante uso de inteligencia artificial"
      >
        <div className="px-20">
          {responseGPT ? (
            <SummaryHTML html={responseGPT} />
          ) : dictionaryData ? (
            <section className="flex flex-col gap-5">
              {titles.map((title, i) => (
                <Accordion key={i} className={`section-${i} border`}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    {title}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col gap-5">
                      {Object.keys(dictionaryData[title]).map((boe, i) => (
                        <div key={i} className="flex gap-5 items-center">
                          <h1>{boe}</h1>
                          <Button variant="outlined">Ver resumen</Button>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </section>
          ) : (
            <h1 className="text-red-500 font-bold text-xl">
              No se ha publicado un BOE en la fecha de hoy
            </h1>
          )}
        </div>
      </MainLayout>
    </main>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  let data: string | null = null;
  let dictionaryData: BoeDictionary | undefined;

  // Step 1: Get the BOE of the current date from MongoDB
  const currentDate = formatDate(new Date().getTime());

  const boe: IBoe | null = await dbBoe.getBoeByDate(currentDate);

  if (!boe) {
    // dictionaryData = await getCurrentBoe();
    dictionaryData = await getBOEByDate(currentDate);
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
