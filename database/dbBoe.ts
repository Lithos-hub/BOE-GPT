import { IBoe } from "@/interfaces";
import { db } from ".";
import { Boe } from "@/models";

export const getBoeByDate = async (date: string): Promise<IBoe | null> => {
  await db.connect();
  const boe = await Boe.findOne({ date }).lean();
  await db.disconnect();

  if (!boe) {
    return null;
  }

  return JSON.parse(JSON.stringify(boe));
};
