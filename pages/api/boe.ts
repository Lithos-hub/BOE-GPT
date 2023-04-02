// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { openai } from "@/openai";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | { success: boolean; data: any };

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { text } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0,
      stop: ["\n"],

      prompt: `Resume el siguiente texto, destacando los puntos más importantes del mismo. Si consideras que hay uno o más puntos que destaquen por encima del resto, envuélvelos entre asteriscos para poder convertir ese fragmento posteriormente en negrita: 
        ${text}
        `,
    });
    res
      .status(200)
      .json({ success: true, data: completion.data.choices[0].text });
  } catch (error) {
    res.status(400).json({ success: false, data: "Failed" });
  }
};
