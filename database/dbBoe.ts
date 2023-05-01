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
  const boeData = await Boe.findOne({ boeId }).lean();
  await db.disconnect();

  return boeData ? JSON.parse(JSON.stringify(boeData)) : null;
};

export const getAllBoeIds = async (): Promise<string[]> => {
  await db.connect();
  const boeIds = await Boe.find().select("boeId -_id").lean();
  console.log("All boe Ids: ", boeIds);
  await db.disconnect();

  const simplifiedIds = boeIds.map(({ boeId }) => boeId);

  return JSON.parse(JSON.stringify(simplifiedIds));
};

export const getAllBoeDates = async (): Promise<string[]> => {
  await db.connect();
  const boeDates = await Boe.find().select("date -_id").lean();
  console.log("All boe dates", boeDates);
  await db.disconnect();

  const simplifiedDates = boeDates.map(({ date }) => date);

  return JSON.parse(JSON.stringify(simplifiedDates));
};
