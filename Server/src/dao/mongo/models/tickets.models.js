import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const ticketsCollecionts = "tickets";

const ticketsSchema = new Schema({
  code: { type: String, default: uuid() },
  purchase_dateTime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: String,
});

const tickectsModels = mongoose.model(ticketsCollecionts, ticketsSchema);

export default tickectsModels;
