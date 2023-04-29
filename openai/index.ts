import { AxiosError } from "axios";
import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  organization: "org-Cf5OrSHzwtPORWc8wT4Zo5vG",
  apiKey,
});

const openai = new OpenAIApi(configuration);

const createPrompt = (text: string) => {
  return `Toma este texto:
  
  ${text}

  ---------------

  Realiza lo siguiente:

Resume el texto anterior en formato de lista. Deberás usar los siguientes elementos de forma obligatoria. El texto debe contener etiquetas HTML:

- Envuelve los párrafos entre etiquetas HTML de <p> y </p>
- Si enumeras una serie de cosas o creas una lista, envuélvela con etiquetas <ul> <li> </li> </ul>
- Si consideras que algún punto del texto debería destacar por importancia, envuelve la palabra o frase con la etiqueta <strong> </strong>
- Usa un lenguaje natural, de fácil comprensión para cualquier tipo de persona
- Si lo consideras necesario, crea una lista de puntos positivos y negativos del texto.
- Lo más importante es que enumeres los puntos principales del texto uno por uno
- Crea doble saltos de linea con etiquetas <br />
- Envuelve títulos de secciones como "Aspectos positivos" y "Aspectos negativos" con etiquetas <strong class='text-success'> y <strong class='text-error'>
- Las etiquetas <ul></ul> de los aspectos positivos deberán llevar la clase de CSS "section-success"
- Las etiquetas <ul></ul> de los aspectos negativos deberán llevar la clase de CSS "section-error""
  `;
};

export const runCompletion = async (reqData: Record<string, string>) => {
  try {
    const { prompt_text } = reqData;

    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: createPrompt(prompt_text),
        },
      ],
    });
    return data.choices[0].message!.content;
  } catch (error: unknown) {
    console.log(error);
  }
};
