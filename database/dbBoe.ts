import { IBoe } from "@/interfaces";
import { db } from ".";
import { Boe } from "@/models";

export const getBoeByDate = async (date: string): Promise<IBoe | null> => {
  await db.connect();
  const boe = await Boe.findOne({ date }).lean();
  await db.disconnect();

  return boe;
};

export const getBoeById = async (boeId: string): Promise<IBoe | null> => {
  await db.connect();
  const boeData = await Boe.findOne({ boe: boeId }).lean();
  await db.disconnect();

  if (!boeData) {
    return null;
  }

  return JSON.parse(JSON.stringify(boeData));
};

export const getAllBoeIds = async (): Promise<IBoe[]> => {
  await db.connect();
  const boeIds = await Boe.find().select("boe -_id").lean();
  await db.disconnect();

  return boeIds;
};
