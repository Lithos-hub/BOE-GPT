import React from "react";
import MainLayout from "@/components/Layout/MainLayout";

const BoeByIdPage = () => {
  return (
    <MainLayout
      title="BOE·GPT | BOE a fecha de {date}"
      description="El BOE a fecha de {date} resumido"
    >
      <div>Boe by Id page</div>
    </MainLayout>
  );
};

export default BoeByIdPage;
