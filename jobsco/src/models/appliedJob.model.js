import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const appliedJobSchema = new Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    // means the user (candidate) who applied for the job
    userId: {
      type: String,
      required: true,
    },
    recurtorId: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "screening", "interview", "offer", "rejected"],
      default: "applied", // default status when a job application is created
    },
  },
  { timestamps: true }
);

const AppliedJob = models.AppliedJob || model("AppliedJob", appliedJobSchema);
export default AppliedJob;
