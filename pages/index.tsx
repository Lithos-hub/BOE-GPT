import { GetStaticProps, NextPage } from "next";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import MainLayout from "@/components/Layout/MainLayout";
import { formatDate } from "@/utils";
import { runCompletion } from "@/openai";
import { SummaryHTML } from "@/components";

interface Props {
  responseGPT: string;
}

const joinedData = `
Desde el inicio de la pandemia por COVID-19, se han establecido en España medidas de control sanitario a los pasajeros internacionales en los puntos de entrada en España, que en la actualidad están limitadas a las personas que proceden de países no pertenecientes a la Unión Europea o con la consideración de países asociados Schengen. En lo que afecta a las fronteras terrestres se encuentra articulado mediante la Orden SND/425/2022, de 13 de mayo, por la que se establecen medidas de control sanitario a las personas que llegan a España a través de los puestos fronterizos terrestres de Ceuta y Melilla y en las fronteras aéreas y marítimas, mediante la Resolución de 1 de abril de 2022, de la Dirección General de Salud Pública, relativa a los controles sanitarios a realizar en los puntos de entrada de España, modificada por la Resolución de 1 de junio de 2022.

Una vez superada la fase aguda de la pandemia, se han actualizado las medidas de vigilancia y control a nivel nacional mediante la Estrategia de vigilancia y control frente a COVID-19 tras la fase aguda de la pandemia, justificado, en gran parte, por los altos niveles de inmunización alcanzados en la población española y en los países de nuestro entorno, que han llevado a una importante disminución de los casos graves y de la letalidad frente a SARS-CoV-2.

En este escenario las medidas de limitación de la movilidad internacional deben aplicarse respetando los principios generales del Derecho de la Unión, no debiendo ir más allá de lo estrictamente necesario para salvaguardar la salud pública y deben levantarse cuando la situación epidemiológica, en particular en la hospitalaria, lo permita.

Por esta razón, teniendo en cuenta la evolución de la pandemia a nivel global y la situación epidemiológica en España y con el fin de favorecer la normalización de la movilidad internacional, con el menor impacto posible para la salud pública, se considera conveniente dejar sin efecto las medidas de control sanitario a las personas procedentes de países no pertenecientes a la Unión Europea o con la consideración de países asociados Schengen.

En su virtud, y al amparo de lo contemplado en los artículos segundo y tercero de la Ley Orgánica 3/1986, de 14 de abril, de Medidas Especiales en Materia de Salud Pública y de lo establecido en el artículo 52 de la Ley 33/2011, de 4 de octubre, General de Salud Pública y de acuerdo con la competencia exclusiva en materia de sanidad exterior prevista en el artículo 149.1.16.ª de la Constitución Española, resuelvo:
Primero.

Dejar sin efecto la Orden SND/425/2022, de 13 de mayo, por la que se establecen medidas de control sanitario a las personas que llegan a España a través de los puestos fronterizos terrestres de Ceuta y Melilla.
Segundo.

La presente orden producirá efectos desde las 00:00 horas del 21 de octubre de 2022.
Tercero.

Contra la presente orden, que pone fin a la vía administrativa, podrá interponerse, con carácter potestativo, recurso de reposición ante la persona titular del Ministerio de Sanidad, en el plazo de un mes desde el día siguiente a su publicación de acuerdo con lo previsto en el artículo 123 de la Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas, o bien recurso contencioso-administrativo en el plazo de dos meses a partir del día siguiente al de su publicación ante la Sala de lo Contencioso-Administrativo de la Audiencia Nacional, de conformidad con lo dispuesto en los artículos 11 y 46 de la Ley 29/1998, de 13 de julio, reguladora de la Jurisdicción Contencioso-administrativa, significándose que, en el caso de interponer recurso de reposición, no se podrá interponer recurso contencioso-administrativo hasta que aquél sea resuelto expresamente o se haya producido la desestimación presunta del mismo.

Madrid, 18 de octubre de 2022.–La Ministra de Sanidad, Carolina Darias San Sebastián.`;

const HomePage: NextPage<Props> = ({ responseGPT }) => {
  return (
    <main>
      <MainLayout
        title="BOE·GPT | El BOE de hoy"
        sectionTitle={`El BOE de hoy - ${formatDate(new Date().getTime())}`}
        description="Aplicación ver un resumen diario del Boletín Oficial del Estado (BOE) mediante uso de inteligencia artificial"
      >
        <div className="px-20">
          <SummaryHTML html={responseGPT} />
        </div>
      </MainLayout>
    </main>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data: string = await runCompletion({
    prompt_text: joinedData,
  });

  return {
    props: {
      responseGPT: data,
    },
  };
};
