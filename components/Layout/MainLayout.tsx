import Head from "next/head";
import React, { FC } from "react";

type Props = {
  children: JSX.Element;
  title: string;
  description: string;
};

const MainLayout: FC<Props> = ({ children, title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default MainLayout;
