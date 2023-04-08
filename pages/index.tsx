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
          {dictionaryData ? (
            <section className="flex flex-col gap-5">
              {titles.map((title, i) => (
                <Accordion key={i} className={`section-${i} border`}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    {title}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col gap-5">
                      {dictionaryData[title].map(
                        ({ boe, subtitle, date }, i) => (
                          <div key={i} className="flex gap-5 items-center">
                            <strong> {subtitle} </strong>
                            <h5>{boe}</h5>
                            <Link href={`/boe/${date}/${boe}`}>
                              <Button variant="outlined">Ver resumen</Button>
                            </Link>
                          </div>
                        )
                      )}
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
  let dictionaryData;

  // Step 1: Get the BOE of the current date from MongoDB
  const currentDate = parseDate(new Date().getTime());

  // const boe: IBoe | null = await dbBoe.getBoeByDate(currentDate);
  const boe = null;

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
