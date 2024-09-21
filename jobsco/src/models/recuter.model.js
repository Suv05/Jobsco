import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const RecuterSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
    set: (value) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  },
  position: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
    set: (value) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  },
  joinedYear: {
    type: String,
    required: true,
    maxlength: 4,
    trim: true,
  },
  email: {
    type: String,
    minLength: 10,
    required: [true, "Please provide your email"],
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter a valid email addrese",
    ],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    minLength: 10,
  },
  linkedin: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  industry: {
    type: String,
    required: true,
  },
  notifications: {
    type: Boolean,
    default: false,
  },
});

export const Recuter = models.Recuter || model("Recuter", RecuterSchema);
export default Recuter;
