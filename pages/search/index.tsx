import MainLayout from "@/components/Layout/MainLayout";
import { getBOEByDate } from "@/database";
import { GetStaticProps } from "next";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";

const SearchPage = () => {
  return (
    <MainLayout
      title="BOE·GPT | Buscador"
      sectionTitle="Buscar y resumir un BOE por fecha"
      description="Página de búsqueda del BOE por fecha."
    >
      <div className="flex justify-center gap-5">
        <DatePicker label="Escribe o busca una fecha" />
        <Button
          variant="contained"
          title="Buscar"
          className="bg-primary-3 text-white"
        >
          Buscar
        </Button>
      </div>
    </MainLayout>
  );
};

export default SearchPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  // await getBOEByDate("2022-12-10");

  return {
    props: {},
  };
};
