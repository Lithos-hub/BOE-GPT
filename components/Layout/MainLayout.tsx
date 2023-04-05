import Head from "next/head";
import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import Navbar from "../Navbar/Navbar";

type Props = {
  children: JSX.Element;
  sectionTitle: string;
  title: string;
  description: string;
};

const MainLayout: FC<Props> = ({
  children,
  sectionTitle,
  title,
  description,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="mt-[12vh]">
        <Paper className="mt-5 mx-[10vw] p-5 bg-[#101010] rounded-xl shadow-xl">
          <h1 className="text-2xl text-center text-white uppercase tracking-widest rounded-xl">
            {sectionTitle}
          </h1>

          <div className="bg-gradient-to-tr from-primary-1 to-white h-1 rounded-xl my-5" />

          <section>{children}</section>
        </Paper>
      </main>
    </>
  );
};

export default MainLayout;
