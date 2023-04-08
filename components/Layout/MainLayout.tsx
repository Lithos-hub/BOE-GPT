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
        <div className="mx-[10vw] flex items-center justify-center">
          <div className="h-auto w-full rounded-xl bg-gradient-to-br from-primary-1 via-primary-1 to-cyan-500 p-[2px]">
            <div className="flex h-full w-full items-center justify-center bg-gray-800 back rounded-xl">
              <Paper className="w-full h-full p-5 bg-[#101010] rounded-xl shadow-xl before:a">
                <h1 className="text-2xl text-center uppercase tracking-widest rounded-xl text-primary-3">
                  {sectionTitle}
                </h1>

                <div className="bg-gradient-to-tr from-primary-1 to-white h-1 rounded-xl my-5" />

                <section>{children}</section>
              </Paper>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
