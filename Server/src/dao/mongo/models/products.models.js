import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { v4 as uuid } from "uuid";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    requires: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: String,
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: Boolean,
    default: true,
    index: true,
  },
  category: {
    type: String,
    index: true,
  },
  code: { type: String, default: uuid() },
});

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
