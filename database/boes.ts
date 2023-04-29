import { IBoe } from "@/interfaces";

interface SeedData {
  boes: IBoe[];
}

export const initialData: SeedData = {
  boes: [
    {
      boeId: "BOE-A-2022-17104",
      date: "2022-10-20",
      summary: `
            "<p>Este texto habla sobre las medidas de control sanitario en las fronteras de España debido a la pandemia por COVID-19.</p>\n" +
            "<p>En la fase actual de la pandemia, se han actualizado estas medidas y se han levantado algunas restricciones de movilidad para las personas que vienen de países que no pertenecen a la Unión Europea o a países asociados Schengen, respetando siempre los principios del Derecho de la Unión y la protección de la salud pública.</p>\n" +
            "<p>La orden SND/425/2022, de 13 de mayo, que establecía medidas para las personas que llegan a España por los puestos fronterizos terrestres de Ceuta y Melilla, dejará de tener efecto a partir del 21 de octubre de 2022.</p>\n" +
            "<p>Cualquier persona puede interponer un recurso de reposición contra esta medida, pero que pone fin a la vía administrativa. También se puede interponer un recurso contencioso-administrativo.</p>\n" +
            "<strong class='text-success'>Aspectos positivos:</strong>\n" +
            "<ul class='section-success'>\n" +
            "<li>Se levantan algunas restricciones de movilidad internacional para favorecer la normalización de la situación.</li>\n" +
            "<li>Se respetan los principios del Derecho de la Unión y se protege la salud pública.</li>\n" +
            "</ul>\n" +
            "<strong class='text-error'>Aspectos negativos:</strong>\n" +
            "<ul class='section-error'>\n" +
            "<li>Algunas personas pueden considerar que se están levantando las restricciones demasiado pronto, lo que podría afectar a la situación epidemiológica de España.</li>\n" +
            "</ul>",`,
    },
  ],
};
