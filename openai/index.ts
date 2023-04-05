import { AxiosError } from "axios";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-Cf5OrSHzwtPORWc8wT4Zo5vG",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const createPrompt = (text: string) => {
  return `Toma este texto:
  ${text}

  ---------------

  Realiza lo siguiente:

Resume el texto que proporcionaré a continuación mediante una lista. Deberás usar los siguientes elementos de forma obligatoria. El texto debe contener etiquetas HTML:

- Envuelve los párrafos entre etiquetas HTML de <p> y </p>
- Si enumeras una serie de cosas o creas una lista, envuélvela con etiquetas <ul> <li> </li> </ul>
- Si consideras que algún punto del texto debería destacar por importancia, envuelve la palabra o frase con la etiqueta <strong> </strong>
- Usa un lenguaje natural, de fácil comprensión para cualquier tipo de persona
- Si lo consideras necesario, crea una lista de puntos positivos y negativos del texto.
- Lo más importante es que enumeres los puntos principales del texto uno por uno
- Crea doble saltos de linea con etiquetas <br />
- Envuelve títulos de secciones como "Aspectos positivos" y "Aspectos negativos" con etiquetas <strong class='text-error'> o <strong class='text-success'>
- Las etiquetas <ul></ul> de los aspectos positivos deberán llevar la clase de CSS "section-success"
- Las etiquetas <ul></ul> de los aspectos negativos deberán llevar la clase de CSS "section-error""
  `;
};

export const runCompletion = async (reqData: Record<string, string>) => {
  try {
    const { prompt_text } = reqData;
    // const { data } = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "user",
    //       content: createPrompt(prompt_text),
    //     },
    //   ],
    // });
    // console.log(data);
    const exapleResponse = {
      id: "chatcmpl-71gNjQqTFmS8SvnTij8zgmm8oh4R6",
      object: "chat.completion",
      created: 1680635599,
      model: "gpt-3.5-turbo-0301",
      usage: {
        prompt_tokens: 1222,
        completion_tokens: 382,
        total_tokens: 1604,
      },
      choices: [
        {
          message: {
            role: "assistant",
            content:
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
              "</ul>",
          },
          finish_reason: "stop",
          index: 0,
        },
      ],
    };
    return exapleResponse.choices[0].message.content;
  } catch (error: unknown) {
    const errorObj = { ...(error as AxiosError) };
    return "Error!";
  }
};
