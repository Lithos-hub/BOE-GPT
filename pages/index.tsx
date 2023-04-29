import { useMemo } from "react";
import { GetStaticProps, NextPage } from "next";

import { formatDate, parseDate, reformatDate } from "@/utils";

import MainLayout from "@/components/Layout/MainLayout";

import { getBOEByDate } from "@/playwright";

import { BoeDictionary, BoeDictionaryData } from "@/interfaces";
import { BoeSections } from "@/components";

interface Props {
  date: string;
  dictionaryData: BoeDictionaryData | null;
}

const HomePage: NextPage<Props> = ({ date, dictionaryData }) => {
  const sections = useMemo(
    () => (dictionaryData ? Object.keys(dictionaryData) : []),
    [dictionaryData]
  );

  return (
    <main>
      <MainLayout
        title="BOE·GPT | El BOE de hoy"
        sectionTitle="El BOE de hoy"
        description="Aplicación ver un resumen diario del Boletín Oficial del Estado (BOE) mediante uso de inteligencia artificial"
      >
        <>
          {dictionaryData ? (
            <BoeSections
              sections={sections}
              dictionaryData={dictionaryData}
              date={date}
            />
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
  const currentDate = new Date().getTime();
  const parsedDate = parseDate(currentDate);

  const dictionary = (await getBOEByDate(parsedDate)) as BoeDictionary;

  return {
    props: {
      date: parsedDate,
      dictionaryData: dictionary ? dictionary.dictionaryData : null,
    },
  };
};
