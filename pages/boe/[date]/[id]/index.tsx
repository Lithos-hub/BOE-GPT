import React, { useMemo } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import MainLayout from "@/components/Layout/MainLayout";
import { SummaryHTML } from "@/components";

import { dbBoe } from "@/database";
import { getTextToSummarize } from "@/playwright";
import { runCompletion } from "@/openai";
import { Boe } from "@/models";
import { BoeAPI } from "@/services";
import { getAllBoeDates, getAllBoeIds } from "@/database/dbBoe";
import { reformatDate } from "@/utils";

interface Props {
  boeData: any;
}

const BoeByIdPage: NextPage<Props> = ({ boeData }) => {
  console.log("Boe data => ", boeData);

  const formattedDate = useMemo(
    () => reformatDate(boeData.date),
    [boeData.date]
  );
  return (
    <MainLayout
      sectionTitle={`BOE a fecha de ${formattedDate}`}
      title={`BOE·GPT | ${formattedDate}`}
      description={`Resumen del BOE publicado en la fecha de ${formattedDate}.`}
    >
      {boeData && <SummaryHTML html={boeData.summary} />}
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const dates = await getAllBoeDates();
  const boeIds = await getAllBoeIds();

  const paths = dates
    .map((date) => {
      return boeIds.map((id) => {
        return { params: { date, id } };
      });
    })
    .flat();

  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id = "", date = "" } = params as { id: string; date: string };

  // 1. Find the summary in MongoDB
  const boeData = await dbBoe.getBoeById(id);

  console.log(
    boeData
      ? "************* BOE FOUND. Showing... *************"
      : "************* BOE NOT FOUND. Generating... *************"
  );

  // 2. If exists, simply return it
  if (boeData) {
    return {
      props: {
        boeData,
      },
      revalidate: 60 * 60, // Each hour
    };
  }

  // 3. If not, webscrap the HTML text
  const textToSummarize = await getTextToSummarize(id);

  // 4. Call ChatGPT
  const gptResult = await runCompletion({ prompt_text: textToSummarize });

  const generatedData = {
    date,
    boeId: id,
    summary: gptResult,
  };

  console.log("GENERATED RESULT: ", generatedData);

  // 5. Save summary in MongoDB
  try {
    await BoeAPI.post("/boe", generatedData);
  } catch (error) {
    console.log(error);
    return {
      props: {
        boeData: {
          ...generatedData,
          summary:
            '<small className="text-red-500">Algo salió mal en la generación automática</small>',
        },
      },
    };
  }

  return {
    props: {
      boeData: generatedData,
    },
    revalidate: 60 * 60, // Each hour,
  };
};

export default BoeByIdPage;
