import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const primiumUserSchema = new Schema({
  plan: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const PrimiumUser =
  models.PrimiumUser || model("PrimiumUser", primiumUserSchema);

export default PrimiumUser;
