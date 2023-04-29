import { useMemo } from "react";
import { GetStaticProps, NextPage } from "next";

import { getAllDatesFrom2000, reformatDate } from "@/utils";

import MainLayout from "@/components/Layout/MainLayout";

import { getBOEByDate } from "@/playwright";

import { BoeDictionary, BoeDictionaryData } from "@/interfaces";
import { GetStaticPaths } from "next";
import { BoeSections } from "@/components";
import { getAllBoeDates } from "@/database/dbBoe";

interface Props {
  date: string;
  dictionaryData: BoeDictionaryData | null;
}

const BoeByDatePage: NextPage<Props> = ({ date, dictionaryData }) => {
  const sections = useMemo(
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
            <BoeSections
              sections={sections}
              dictionaryData={dictionaryData}
              date={date}
            />
          ) : (
            <h1 className="text-red-500 font-bold text-lg mx-auto">
              No hay un BOE publicado a fecha de {date}
            </h1>
          )}
        </>
      </MainLayout>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const dates = await getAllBoeDates();

  const paths = dates.map((date) => ({
    params: {
      date,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { date } = params as { date: string };

  const dictionary: BoeDictionary | null = await getBOEByDate(date);

  console.log(dictionary);

  return {
    props: {
      date: reformatDate(date),
      dictionaryData: dictionary ? dictionary.dictionaryData : null,
    },
  };
};

export default BoeByDatePage;
