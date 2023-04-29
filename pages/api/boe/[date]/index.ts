import { IBoe } from "@/interfaces";
import { db } from "@/database";

import type { NextApiRequest, NextApiResponse } from "next";
import { Boe } from "@/models";
import { parseDate } from "@/utils";

type Data =
  | {
      success: boolean;
      message: string;
    }
  | {
      success: boolean;
      data: IBoe[];
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getBoe(req, res);

    default:
      return res.status(400).json({
        success: false,
        message: "Bad request. Endpoint do not exist",
      });
  }
}

const getBoe = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { date = null } = req.query;
  const currentDate = parseDate(new Date().getTime());

  try {
    await db.connect();
    const boe = await Boe.find({ date: date || currentDate }).lean();
    if (!boe.length) {
      console.log("BOE.NOT_EXIST");
      res.status(404).json({
        success: false,
        message: "BOE.NOT_EXIST",
      });
      return;
    }
    res.status(200).json({ success: true, data: boe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: JSON.stringify(error) });
  } finally {
    await db.disconnect();
  }
};
