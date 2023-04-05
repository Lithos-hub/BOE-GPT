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
      return getBoe(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Bad request. Endpoint do not exist" });
  }
}

const getBoe = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { date = null } = req.query;

  console.log(date);

  const currentDate = parseDate(new Date().getTime());

  try {
    await db.connect();
    const boe = await Boe.find({ date: date || currentDate }).lean();
    if (!boe) {
      console.log("BOE.NOT_EXIST");
      res.status(404).json({
        message: "BOE.NOT_EXIST",
      });
      return;
    }
    res.status(200).json(boe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: JSON.stringify(error) });
  } finally {
    await db.disconnect();
  }
};
