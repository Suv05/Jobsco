import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const savedJobsSchema = new Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const SavedJobs = models.SavedJobs || model("SavedJobs", savedJobsSchema);
export default SavedJobs;
