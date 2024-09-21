import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const CandidateSchema = new Schema({
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
  universityName: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  degree: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
    set: (value) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  },
  graduationYear: {
    type: Number,
    required: true,
    maxlength: 4,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    minLength: 10,
    required: [true, "Please provide your email"],
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter a valid email address",
    ],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 10,
  },
  resumeLink: {
    type: String,
  },
  major: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
    set: (value) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  },
  skills: {
    type: [String],
    required: true,
  },
  experience: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  jobPreference: {
    type: String,
    enum: ["fulltime", "parttime", "internship", "contract"],
    required: true,
  },
  notifications: {
    type: Boolean,
    default: false,
  },
});

export const Candidate =
  models.Candidate || model("Candidate", CandidateSchema);
export default Candidate;
