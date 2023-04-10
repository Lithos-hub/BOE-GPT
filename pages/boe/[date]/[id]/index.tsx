import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import MainLayout from "@/components/Layout/MainLayout";
import { SummaryHTML } from "@/components";

import { dbBoe } from "@/database";
import { getTextToSummarize } from "@/playwright";
import { runCompletion } from "@/openai";
import { Boe } from "@/models";
import { BoeAPI } from "@/services";

interface Props {
  date: string;
  boeData: any;
}

const BoeByIdPage: NextPage<Props> = ({ boeData, date }) => {
  console.log("boeData => ", boeData);
  return (
    <MainLayout
      sectionTitle={`BOE a fecha de ${date}`}
      title={`BOE·GPT | ${date}`}
      description={`Resumen del BOE publicado en la fecha de ${date}.`}
    >
      <SummaryHTML html={boeData} />
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // const boeIds = (await dbBoe.getAllBoeIds()) || [
  //   { boeId: "BOE-A-2023-8454", date: "2023-04-04" },
  // ];
  const boeIds = [{ boeId: "BOE-A-2023-8454", date: "2023-04-04" }];

  return {
    paths: boeIds.map(({ boeId, date }) => ({
      params: {
        date,
        id: boeId,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id = "", date = "" } = params as { id: string; date: string };

  // 1. Find the summary in MongoDB
  const boeData = await dbBoe.getBoeById(id);

  // 2. If exists, simply return it
  if (boeData) {
    return {
      props: {
        boeData,
      },
      revalidate: 86400,
    };
  }

  // 3. If not, webscrap the HTML text
  const textToSummarize = await getTextToSummarize(id);

  // 4. Call ChatGPT
  const gptResult = await runCompletion({ prompt_text: textToSummarize });

  // 5. Save summary in MongoDB
  await BoeAPI.post("/boe", {
    date,
    boeId: id,
    summary: gptResult,
  });

  return {
    props: {
      boeData: gptResult,
    },
    revalidate: 86400,
  };
};

export default BoeByIdPage;
