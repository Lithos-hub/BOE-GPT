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
      return getBoes(req, res);

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
