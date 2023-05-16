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
  category: {
    type: String,
    index: true,
  },
  code: { type: String, default: uuid() },
  owner: {
    type: String,
    default: "admin",
    required: true,
  },
});

productsSchema.plugin(mongoosePaginate);
productsSchema.pre("create", function (next) {
  if (!this.owner) {
    this.owner = "admin"; // Valor predeterminado para 'owner'
  }
  next();
});

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
