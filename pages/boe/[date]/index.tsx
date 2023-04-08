import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllDatesFrom1960 } from "@/utils";
import { SummaryHTML } from "@/components";

interface Props {
  date: string;
  responseGPT: string;
}

const BoeByIdPage: NextPage<Props> = ({ date, responseGPT }) => {
  return (
    <MainLayout
      sectionTitle={`BOE a fecha de ${date}`}
      title={`BOE·GPT | ${date}`}
      description={`Resumen del BOE publicado en la fecha de ${date}.`}
    >
      <SummaryHTML html={responseGPT} />
    </MainLayout>
  );
};

export default BoeByIdPage;

export const getStaticPaths: GetStaticPaths = (ctx) => {
  const datesArray = getAllDatesFrom1960();

  // datesArray => '1960-09-01', '1960-09-02', '1960-09-03', '1960-09-04', '1960-09-05', '1960-09-06', '1960-09-07', '1960-09-08', '1960-09-09', etc

  const paths = datesArray.map((date) => ({
    params: {
      date,
    },
  }));

  return {
    paths,
    fallback: false,
    // fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const date = params!.date;

  return {
    props: {
      date,
      responseGPT: "<p>Prueba</p>",
    },
    revalidate: 86400,
  };
};
