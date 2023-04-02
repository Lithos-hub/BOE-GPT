import Head from "next/head";
import React, { FC } from "react";
import Paper from "@mui/material/Paper";

type Props = {
  children: JSX.Element;
  title: string;
  description: string;
};

const MainLayout: FC<Props> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <section>
        <Paper
          className="mt-5 mx-[15vw] p-10 bg-primary-2/50 rounded-xl"
          elevation={10}
        >
          {children}
        </Paper>
      </section>
    </>
  );
};

export default MainLayout;
