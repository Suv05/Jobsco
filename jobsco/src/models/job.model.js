import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["fulltime", "parttime", "internship", "contract"],
      required: true,
    },
    salary: {
      type:String,
      required: true,
    },
    experienceLevel: { type: String, required: true },
    skillsRequired: [{ type: String }],
    industry: { type: String },
    educationRequirements: { type: String },
    applicationDeadline: { type: Date },
    companyLogo: { type: String },
    benefits: [{ type: String }],
    contactEmail: { type: String },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = models.Job || model("Job", JobSchema);

export default Job;
