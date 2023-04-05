import { IBoe } from "@/interfaces";
import mongoose, { Schema, model, Model } from "mongoose";

const boeSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

const Boe: Model<IBoe> = mongoose.models.Boe || model("Boe", boeSchema);

export default Boe;
