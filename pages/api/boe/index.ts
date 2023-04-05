import { IBoe } from "@/interfaces";
import { db } from "@/database";

import type { NextApiRequest, NextApiResponse } from "next";
import { Boe } from "@/models";
import { parseDate } from "@/utils";

type Data =
  | {
      message: string;
    }
  | IBoe[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getAllBoes(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Bad request. Endpoint do not exist" });
  }
}

const getAllBoes = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const boes = await Boe.find().lean();
    res.status(200).json(boes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: JSON.stringify(error) });
  } finally {
    await db.disconnect();
  }
};
