import { db } from "@/database";
import { initialData } from "@/database/boes";

import { Boe } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Access denied" });
  }

  await db.connect();

  await Boe.deleteMany();
  await Boe.insertMany(initialData.boes);

  await db.disconnect();

  res.status(200).json({ message: "Process successfully completed" });
}
