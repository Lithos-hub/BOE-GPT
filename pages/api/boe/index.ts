import type { NextApiRequest, NextApiResponse } from "next";

import { IBoe } from "@/interfaces";
import { db } from "@/database";
import { Boe } from "@/models";

type Data =
  | {
      message: string;
    }
  | IBoe
  | IBoe[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getBoes(req, res);

    case "POST":
      return postBoe(req.body, res);

    default:
      return res
        .status(400)
        .json({ message: "Bad request. Endpoint do not exist" });
  }
}

const getBoes = async (_: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const boes = await Boe.find().lean();
    res.status(200).json(boes);
  } catch (error) {
    console.log("Error GET /boe");
    res.status(500).json({ message: "Something went wrong in the Database" });
  } finally {
    await db.disconnect();
  }
};

const postBoe = async (
  data: Record<string, unknown>,
  res: NextApiResponse<Data>
) => {
  const { boeId, date, summary } = data;
  console.log("Creating: ", boeId, date, summary);
  const newBoe = new Boe({
    boeId,
    date,
    summary,
  });
  try {
    await db.connect();
    await newBoe.save();
    await db.disconnect();

    res.status(200).json(newBoe);
  } catch (error) {
    await db.disconnect();
    console.log("Error when POST boe");
    return res
      .status(500)
      .json({ message: "Something went wrong in the Database" });
  }
};
