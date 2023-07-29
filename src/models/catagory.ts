import mongoose, { Schema, model } from "mongoose";

const catagorySchema = new Schema({
  name: {
    type: String,
    required: [true, "please add a catagory name"],
  },
  parent: {
    type: String,
    default: null,
  },
});

const Catagory = model("Catagory", catagorySchema, "catagory");

export default Catagory;
