import mongoose, { Schema, model } from "mongoose";

const menuSchema = new Schema({
  email: {
    type: String,
    required: [true, "please add a email"],
  },
  itemName: {
    type: String,
  },
  retailPrice: Number,
  description: String,
  sellingPrice: Number,
  category: String,
  file: String,
});

const Menu = model("Menu", menuSchema, "menu");

export default Menu;
